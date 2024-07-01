// Package humanizedaudit translates audit delta slices to human readable changes
package translatedaudit

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/mappings"
	"github.com/cmsgov/mint-app/pkg/constants"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// TranslateAudit translates a single audit to a translated audit and stores it in the translated audit table in the database.
func TranslateAudit(
	ctx context.Context,
	store *storage.Store,
	logger *zap.Logger,
	auditID int) (*models.TranslatedAuditWithTranslatedFields, error) {
	auditWithModelPlan, err := storage.AuditChangeWithModelPlanGetByID(store, logger, auditID)
	if err != nil {
		return nil, err
	}
	if auditWithModelPlan.TableName == models.TNUserNotificationPreferences {
		// Changes: (Translations) Expand this logic, we don't want to make the job retry if it is a table we don't care about translating ( like this one which doesn't have a model plan)
		// Changes: (Translations) Pull in main and update to also not translate any new tables that isn't associated to a model plan. Make sure to add this in documentation
		return nil, nil
	}

	// Changes: (Job) Should we just fetch the model name when we get the ID as well? it's just this use case...
	plan, err := store.ModelPlanGetByID(store, logger, auditWithModelPlan.ModelPlanID)
	if err != nil {
		return nil, err
	}

	translatedAuditWithFields, err := genericAuditTranslation(ctx, store, plan, &auditWithModelPlan.AuditChange)
	if err != nil {
		return nil, fmt.Errorf("issue translating audit. %w", err)
	}

	retTranslatedChanges, err := saveTranslatedAuditAndFields(store, translatedAuditWithFields)
	if err != nil {
		return nil, fmt.Errorf("issue saving translated audit. %w", err)
	}

	// retTranslatedChanges, err := storage.TranslatedAuditChangeCreateCollection(store, translatedChanges)

	return retTranslatedChanges, err
	//Changes: (Job) Implement this to translate a single audit, we also need to figure out what model plan this is based on the audit id

	/*
		1. Get Audit (with ModelPlanID?)
		2. Run the Translation Job
		3. Save
		4. Should we delete the processing job here? Or elsewhere? Should the id actually be the id of the processing entry? That way we can save it and update here?

	*/
}

func genericAuditTranslation(ctx context.Context, store *storage.Store, plan *models.ModelPlan, audit *models.AuditChange) (*models.TranslatedAuditWithTranslatedFields, error) {
	//Changes: (Translations) Note, it might be more appropriate to fetch the model plan each time. Note, this is not as efficient as grouping first,
	// but it works with having the job translate one audit at a time
	trans, err := mappings.GetTranslation(audit.TableName)
	if err != nil {
		return nil, fmt.Errorf("unable to get translation for %s , err : %w", audit.TableName, err)
	}
	translationMap, err := trans.ToMap() // Changes: (Translations)  Maybe make this return the map from the library?
	if err != nil {
		return nil, fmt.Errorf("unable to convert translation for %s to a map, err : %w", trans.TableName(), err)
	}

	operation, isValidOperation := GetDatabaseOperation(audit.Action)
	if !isValidOperation {

		return nil, fmt.Errorf("issue converting operation to valid DB operation for audit  (%d) for plan %s, while attempting humanization. Provided value was %s ", audit.ID, plan.ModelName, audit.Action)
	}
	translatedAudit := models.TranslatedAuditWithTranslatedFields{
		TranslatedFields: []*models.TranslatedAuditField{},
	}

	change := models.NewTranslatedAuditChange( //  Changes: (Translations)  extract this logic to another function
		constants.GetSystemAccountUUID(),
		audit.ModifiedBy,
		plan.ID,
		audit.ModifiedDts,
		audit.TableID,
		audit.ID,
		audit.PrimaryKey,
		operation,
	)
	change.TableName = audit.TableName
	translatedAudit.TranslatedAudit = change

	for fieldName, field := range audit.Fields {
		//  Changes: (Translations) consider removing plan from the function
		transField, wasTranslated, tErr := translateField(ctx, store, fieldName, field, audit, operation, plan, translationMap)

		if tErr != nil {
			return nil, fmt.Errorf("issue translating field (%s) for plan %s . Err: %w ", fieldName, plan.ModelName, err)
		}
		if !wasTranslated {
			//If this doesn't have a translation, don't append this to the translated field list (and don't save it)
			continue
		}
		translatedAudit.TranslatedFields = append(translatedAudit.TranslatedFields, transField)

	}

	_, err = SetTranslatedAuditTableSpecificMetaData(ctx, store, &translatedAudit, audit, operation)
	if err != nil {
		return nil, fmt.Errorf("unable to translate table specific audit data. err %w", err)
	}

	return &translatedAudit, nil
}

// translateField translates a given audit field. It returns the translated audit field, as well as a bool to signify if it was translated or not
func translateField(
	ctx context.Context,
	store *storage.Store,
	fieldName string,
	field models.AuditField,
	audit *models.AuditChange,
	operation models.DatabaseOperation,
	modelPlan *models.ModelPlan,
	translationMap map[string]models.ITranslationField) (*models.TranslatedAuditField, bool, error) {

	// Set default values in case of missing translation
	// Changes: (Translations) We should handle a nil / empty case what should we do in that case?

	old := field.Old
	new := field.New
	translatedOld := old
	translatedNew := new
	changeType := getChangeType(old, new)
	if changeType == models.AFCUnchanged {
		// Changes: (Translations) revisit this paradigm.
		// If a field is actually unchanged (null to empty array or v versa), don't write an entry.
		return nil, false, nil
	}

	var conditionals *pq.StringArray //TODO: can we make the function that checks return this instead of instantiating here?

	// Changes: (Translations) We need to distinguish if the answer is for an other / note field. The label in that case is really the parent's label or the specific text for that type.

	// Changes: (Translations) Handle if the change made a question not necessary // Changes: (Structure) How should we structure this? Field MetaData? Or base level implementation information?

	translationInterface := translationMap[fieldName]
	if translationInterface == nil {
		// Only save and translate fields that have a translation, if it doesn't exist, skip
		return nil, false, nil
	}

	translatedLabel := translationInterface.GetLabel()
	referencesLabel := translationInterface.GetReferencesLabel(translationMap)
	//Changes: (Translations) update this to handle if notes, or preferences.

	formType := translationInterface.GetFormType()
	dataType := translationInterface.GetDataType()

	questionType := translationInterface.GetQuestionType()

	if dataType == models.TDTBoolean { // clean t or f to true or false
		old = sanitizeAuditBoolValue(old)
		new = sanitizeAuditBoolValue(new)

	}

	//Changes: (Translations) refactor this
	oldStr, oldIsString := old.(string)
	if oldIsString {
		oldSlice, oldIsSlice := isArray(oldStr)
		if oldIsSlice {
			old = oldSlice
		} else {
			old = oldStr
		}
	}
	newStr, newIsString := new.(string)
	if newIsString {
		newSlice, newIsSlice := isArray(newStr)
		if newIsSlice {
			new = newSlice
		} else {
			new = newStr
		}
	}

	options, hasOptions := translationInterface.GetOptions()
	tableReference, hasTableReference := translationInterface.GetTableReference()
	//Changes: (fk) look to update the unit tests, we don't want a foreign key relation to be overridden with options.
	// ALSO! consider if there are any places with an array of foreign keys, I think we don't have that anymore
	if hasOptions {
		translatedOld = translateValue(old, options)
		translatedNew = translateValue(new, options)
	} else if hasTableReference {
		translatedOldFK, err := translateForeignKey(ctx, store, old, tableReference)
		if err != nil {
			return nil, false, err
		}
		translatedOld = translatedOldFK
		translatedNewFK, err := translateForeignKey(ctx, store, new, tableReference)
		if err != nil {
			return nil, false, err
		}
		translatedNew = translatedNewFK

	} else {
		translatedOld = old
		translatedNew = new
	}

	children, hasChildren := translationInterface.GetChildren()
	if hasChildren {
		conditionals = checkChildConditionals(old, new, children)
	}

	translatedField := models.NewTranslatedAuditField(constants.GetSystemAccountUUID(),
		fieldName,
		translatedLabel,
		translationInterface.GetFieldOrder(),
		old,
		translatedOld,
		new,
		translatedNew,
		dataType,
		formType,
	)
	translatedField.ChangeType = changeType
	translatedField.NotApplicableQuestions = conditionals
	translatedField.QuestionType = questionType
	translatedField.ReferenceLabel = referencesLabel

	return &translatedField, true, nil

}

// getChangeType interprets the change that happened on a field to characterize it as an AuditFieldChangeType
func getChangeType(old interface{}, new interface{}) models.AuditFieldChangeType {
	if new == nil || new == "{}" {
		if old == nil || old == "{}" {
			//This is left because is is possible from the interface types, though in practice this shouldn't occur unless data is being submitted incorrectly
			return models.AFCUnchanged
		}
		return models.AFCRemoved
	}
	if old == nil || old == "{}" {
		return models.AFCAnswered
	}
	return models.AFCUpdated
}

func translateStrSlice(strSlice []string, options map[string]interface{}) pq.StringArray {
	// Changes: (Translations) Determine if we can serialize a generic interface? it makes a weird artifact in the GQL
	// Changes: (Translations) Determine why team_roles for plan collaborator serializes with extra escaped characters
	//   "{\"Mandatory national\",\"Other\"}",
	transArray := pq.StringArray{}
	for _, str := range strSlice {
		translated := translateValueSingle(str, options)
		transArray = append(transArray, translated)
	}

	return transArray
	// Changes: (Translations) revisit this, even using generic array results in escape characters in GQL...
	// genArray := pq.GenericArray{transArray}

}

// translateValue takes a given value and maps it to a human readable value.
// It checks in the value is an array, and if so it translates each value to a human readable form
func translateValue(value interface{}, options map[string]interface{}) interface{} {

	if value == nil {
		return nil
	}

	str, isString := value.(string)

	strSlice, isSlice := value.(pq.StringArray)

	if isSlice {
		transArray := translateStrSlice(strSlice, options)
		return transArray
	}

	if isString {
		// Changes: (Translations) Revisit this issue here, we need the value to be stringified properly. Or provide a column type that is string or string array

		return translateValueSingle(str, options)
	}
	// Changes: (Translations)  Should we handle the case where we can't translate it more?
	// Should we also try to use fmt to make the value a string, for example an enum is not able to be translated this way, as it isn't castable to string.
	return value

}

// translateValueSingle translates a single audit value to a human readable string value
func translateValueSingle(value string, options map[string]interface{}) string {
	translated, ok := options[value]
	if ok {
		return fmt.Sprint(translated) // Translations are always string representations
	}
	return value

}

// isArray checks if a String begins with { and ends with }. If so, it is an array
func isArray(str string) (pq.StringArray, bool) {
	// Define a regular expression to match the array format
	arrayRegex := regexp.MustCompile(`^\{.*\}$`)

	// Check if the string matches the array format
	isArray := arrayRegex.MatchString(str)
	if !isArray {
		return nil, false
	}

	return extractArrayValues(str), true

}

// extractArrayValues extracts array values from a string representation
// Changes: (Translations)  Verify the extraction, perhaps we can combine with earlier function?
func extractArrayValues(str string) pq.StringArray {
	// Define a regular expression to match the array format
	arrayRegex := regexp.MustCompile(`\{(.+?)\}`)

	// Find submatches (values within curly braces)
	matches := arrayRegex.FindStringSubmatch(str)
	if len(matches) < 2 {
		// No matches found or no values inside curly braces
		return nil
	}

	// Split the matched values by comma to get individual values
	values := strings.Split(matches[1], ",")
	for i, value := range values {
		// Trim whitespace from each value
		values[i] = strings.TrimSpace(value)
	}

	return values
}

// saveTranslatedAuditAndFields is a helper method to save a change with it's related fields at the same time
func saveTranslatedAuditAndFields(tp sqlutils.TransactionPreparer, translatedAudit *models.TranslatedAuditWithTranslatedFields) (*models.TranslatedAuditWithTranslatedFields, error) {
	retTranslated, err := sqlutils.WithTransaction[models.TranslatedAuditWithTranslatedFields](tp, func(tx *sqlx.Tx) (*models.TranslatedAuditWithTranslatedFields, error) {

		change, err := storage.TranslatedAuditCreate(tx, &translatedAudit.TranslatedAudit)
		if err != nil {
			return nil, err
		}
		if change == nil {
			return nil, fmt.Errorf("translated change not created as expected.Err: %w", err)
		}
		retTranslated := models.TranslatedAuditWithTranslatedFields{
			TranslatedAudit: *change,
		}

		for _, translatedAuditField := range translatedAudit.TranslatedFields {
			// Note, this could be moved to the store methods inner loop. This is left here to keep the logic atomic.
			translatedAuditField.TranslatedAuditID = retTranslated.ID
		}

		retTranslatedFields, err := storage.TranslatedAuditFieldCreateCollection(tx, translatedAudit.TranslatedFields)
		if err != nil {
			return nil, fmt.Errorf("translated change fields not created as expected. Err: %w", err)
		}

		retTranslated.TranslatedFields = retTranslatedFields
		return &retTranslated, nil

	})
	if err != nil {
		return nil, err
	}
	return retTranslated, nil
}

// sanitizeAuditBoolValue sanitizes raw audit data and does some preliminary translation data, ex translating a t or f character to true or false
func sanitizeAuditBoolValue(value interface{}) interface{} {
	if value == "t" {
		return "true"
	}
	if value == "f" {
		return "false"
	}
	return value

}
