// Package humanizedaudit translates audit delta slices to human readable changes
package translatedaudit

import (
	"context"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"github.com/samber/lo"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/mappings"
	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/constants"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// TranslateAuditsForModelPlan gets all changes for a model plan and related sections in a time period,
// It groups the changes by actor, and a debounced time period. It will then save this record to the database
func TranslateAuditsForModelPlan(
	ctx context.Context,
	store *storage.Store,
	logger *zap.Logger,
	timeStart time.Time,
	timeEnd time.Time,
	modelPlanID uuid.UUID) ([]*models.TranslatedAuditWithTranslatedFields, error) {

	plan, err := store.ModelPlanGetByID(store, logger, modelPlanID)
	if err != nil {
		return nil, err
	}

	audits, err := storage.AuditChangeCollectionGetByModelPlanIDandTimeRange(store, logger, plan.ID, timeStart, timeEnd)
	if err != nil {
		return nil, err
	}
	translatedChanges, err := translateChangeSet(ctx, store, plan, audits)
	if err != nil {
		return nil, fmt.Errorf("issue analyzing model plan change set for time start %s to time end %s. Error : %w", timeStart, timeEnd, err)
	}

	retTranslatedChanges, err := saveTranslatedAuditAndFields(store, translatedChanges)
	if err != nil {
		return nil, fmt.Errorf("issue saving model plan change set for time start %s to time end %s. Error : %w", timeStart, timeEnd, err)
	}

	// retTranslatedChanges, err := storage.TranslatedAuditChangeCreateCollection(store, translatedChanges)

	return retTranslatedChanges, err

}

// translateChangeSet trans
func translateChangeSet(
	ctx context.Context,
	store *storage.Store,
	plan *models.ModelPlan,
	audits []*models.AuditChange,
) ([]*models.TranslatedAuditWithTranslatedFields, error) {

	// planChanges, err := humanizeModelPlanAudits(ctx, store, plan, audits)
	// if err != nil {
	// 	return nil, err
	// }

	// partsProvidersChanges := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
	// 	return m.TableName == "plan_participants_and_providers"
	// })

	// partsAndProviderChanges, err := genericAuditTranslation(ctx, store, plan, partsProvidersChanges)
	// if err != nil {
	// 	return nil, err
	// }
	basicsAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "plan_basics"
	})

	basicsChanges, err := genericAuditTranslation(ctx, store, plan, basicsAudits)
	if err != nil {
		return nil, err
	}

	// combinedChanges := append(planChanges, partsAndProviderChanges...)
	// combinedChanges := partsAndProviderChanges
	combinedChanges := basicsChanges

	return combinedChanges, nil

}

// genericAuditTranslation provides an entry point to translate every audit change generically
func genericAuditTranslation(ctx context.Context, store *storage.Store, plan *models.ModelPlan, audits []*models.AuditChange) ([]*models.TranslatedAuditWithTranslatedFields, error) {

	if len(audits) == 0 {
		return nil, nil
	}
	// model PL
	changes := []*models.TranslatedAuditWithTranslatedFields{}
	// Changes: (Serialization) Think about grouping all the changes first so we don't actually have to parse this each time.
	audit := audits[0]
	trans, err := mappings.GetTranslation(audit.TableName)
	if err != nil {
		return nil, fmt.Errorf("unable to get translation for %s , err : %w", audit.TableName, err)
	}
	translationMap, err := trans.ToMap() // Changes: (Translations)  Maybe make this return the map from the library?
	if err != nil {
		return nil, fmt.Errorf("unable to convert translation for %s to a map, err : %w", trans.TableName(), err)
	}
	for _, audit := range audits {

		actorAccount, err := audit.ModifiedByUserAccount(ctx)
		if err != nil {
			fmt.Printf("issue getting actor for audit  (%d) for plan %s, while attempting humanization ", audit.ID, plan.ModelName)
			continue
		}
		operation, isValidOperation := GetDatabaseOperation(audit.Action)
		if !isValidOperation {
			fmt.Printf("issue converting operation to valid DB operation for audit  (%d) for plan %s, while attempting humanization. Provided value was %s ", audit.ID, plan.ModelName, audit.Action)
		}
		translatedAudit := models.TranslatedAuditWithTranslatedFields{
			TranslatedFields: []*models.TranslatedAuditField{},
		}
		change := models.NewTranslatedAuditChange( //  Changes: (Translations)  extract this logic to another function
			constants.GetSystemAccountUUID(),
			audit.ModifiedBy,
			actorAccount.CommonName,
			plan.ID,
			plan.ModelName,
			audit.ModifiedDts,
			audit.TableName,
			audit.TableID,
			audit.ID,
			audit.PrimaryKey,
			operation,
		)
		translatedAudit.TranslatedAudit = change

		for fieldName, field := range audit.Fields {

			transField, err := translateField(fieldName, field, audit, actorAccount, operation, plan, translationMap)
			if err != nil {
				fmt.Printf("issue translating field (%s) for plan %s ", fieldName, plan.ModelName)
				continue
			}
			translatedAudit.TranslatedFields = append(translatedAudit.TranslatedFields, transField)

		}
		changes = append(changes, &translatedAudit) // append the whole audit

	}

	return changes, nil
}

func translateField(fieldName string, field models.AuditField, audit *models.AuditChange, actorAccount *authentication.UserAccount, operation models.DatabaseOperation, modelPlan *models.ModelPlan, translationMap map[string]models.ITranslationField) (*models.TranslatedAuditField, error) {

	// Set default values in case of missing translation
	// Changes: (Translations) We should handle a nil / empty case what should we do in that case?
	translatedLabel := fieldName
	translatedOld := field.Old
	translatedNew := field.New
	changeType := getChangeType(field.Old, field.New)

	translationInterface := translationMap[fieldName]
	if translationInterface != nil {

		translatedLabel = translationInterface.GetLabel()
		options, hasOptions := translationInterface.GetOptions()
		if hasOptions {
			translatedOld = translateValue(field.Old, options)
			translatedNew = translateValue(field.New, options)
		} else {
			translatedOld = field.Old
			translatedNew = field.New
		}
	}
	translatedField := models.NewTranslatedAuditField(constants.GetSystemAccountUUID(),
		fieldName,
		translatedLabel,
		field.Old,
		translatedOld,
		field.New,
		translatedNew,
	)
	translatedField.ChangeType = changeType

	// change.MetaDataRaw = nil //Changes: (Meta) This should be specific to the type of change...

	return &translatedField, nil

}

// getChangeType interprets the change that happened on a field to characterize it as an AuditFieldChangeType
func getChangeType(old interface{}, new interface{}) models.AuditFieldChangeType {
	//Changes: (Meta) Revisit this, make sure we handle all cases. Can this every be called for a field that has no answer? What about on insert? Or do we only have answer on insert if non-null?
	// return models.AFCAnswered

	if new == nil || new == "{}" {
		if old == nil || old == "{}" {
			//Changes: (Meta) Revisit this, is this possible?
			return ""
		}
		return models.AFCRemoved
	}
	if old == nil || old == "{}" {
		return models.AFCAnswered
	}
	return models.AFCUpdated
}

// translateValue takes a given value and maps it to a human readable value.
// It checks in the value is an array, and if so it translates each value to a human readable form
func translateValue(value interface{}, options map[string]interface{}) interface{} {

	// Changes: (Translations) Check if value is nil, don't need to translate that.
	// Changes: (Translations) work on bool representation, they should come through here as a string, but show up as t, f. We will want to set they values
	// strSlice, isSlice := value.([]string)
	str, isString := value.(string)
	if !isString {
		return value
	}

	strSlice, isSlice := isArray(str)

	if isSlice {
		// transArray := []string{}
		// Changes: (Translations) Determine if we can serialize a generic interface? it makes a weird artifact in the GQL
		//   "{\"Mandatory national\",\"Other\"}",
		transArray := pq.StringArray{}
		// transArray := []interface{}{}
		for _, str := range strSlice {
			translated := translateValueSingle(str, options)
			transArray = append(transArray, translated)
		}
		// Changes: (Translations) revisit this, even using generic array results in escape characters in GQL...
		// genArray := pq.GenericArray{transArray}
		return transArray
	}
	// str, isString := value.(string)
	if isString {
		return translateValueSingle(str, options)
	}
	// Changes: (Translations)  Should we handle the case where we can't translate it more?
	return value

}

// translateValueSingle translates a single audit value to a human readable string value
func translateValueSingle(value string, options map[string]interface{}) string {
	translated, ok := options[value]
	if ok {
		return fmt.Sprint(translated) // Translations are always string representations
	}
	// Changes: (Translations)  If the map doesn't have a value, return the raw value instead.
	return value

}

// isArray checks if a String begins with { and ends with }. If so, it is an array
func isArray(str string) ([]string, bool) {
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
func extractArrayValues(str string) []string {
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
func saveTranslatedAuditAndFields(tp sqlutils.TransactionPreparer, translatedAudits []*models.TranslatedAuditWithTranslatedFields) ([]*models.TranslatedAuditWithTranslatedFields, error) {

	retTranslatedAuditsWithFields := []*models.TranslatedAuditWithTranslatedFields{}

	// Changes: (Serialization) Figure out how we want to error. Should each change and field be it's own transaction? That way if it fails, we still save other  changes? That's probably best
	for _, translatedAudit := range translatedAudits {

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
				// Changes: (Serialization) Combine this with the storage message loop
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
			// Changes: (Serialization)  Figure out, if one audit fails translation, should the whole job fail? Or should we just fail
		}

		retTranslatedAuditsWithFields = append(retTranslatedAuditsWithFields, retTranslated)

	}
	return retTranslatedAuditsWithFields, nil
}
