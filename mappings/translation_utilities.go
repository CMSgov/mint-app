package mappings

import (
	"fmt"

	"github.com/cmsgov/mint-app/pkg/models"
)

// Changes: (Translations) Could all translation live in a exported map? At least the name and the json string? We could reduce the number of functions
// however, having them separate enable much more granular testing.

// GetTranslation allows programmatic access to return a translation for a given table name
func GetTranslation(tableName string) (Translation, error) {

	switch tableName {
	case "model_plan":
		return ModelPlanTranslation()
	case "plan_participants_and_providers":
		return PlanParticipantsAndProvidersTranslation()
	case "plan_basics":
		return PlanBasicsTranslation()
	case "plan_payments":
		return PlanPaymentsTranslation()
	case "plan_ops_eval_and_learning":
		return PlanOpsEvalAndLearningTranslation()
	case "plan_general_characteristics":
		return PlanGeneralCharacteristicsTranslation()
	case "plan_collaborator":
		return PlanCollaboratorTranslation()
	case "plan_beneficiaries":
		return PlanBeneficiariesTranslation()
	case "plan_document":
		return PlanDocumentTranslation()
	case "operational_need":
		return OperationalNeedTranslation()
	case "operational_solution":
		return OperationalSolutionTranslation()
	case "operational_solution_subtask":
		return OperationalSolutionSubtaskTranslation()
	case "plan_discussion":
		return PlanDiscussionTranslation()
	case "discussion_reply":
		return DiscussionReplyTranslation()
	case "plan_cr":
		return PlanCRTranslation()
	case "plan_tdl":
		return PlanTDLTranslation()
	case "existing_model_link":
		return ExistingModelLinkTranslation()
	case "plan_document_solution_link":
		return PlanDocumentSolutionLinkTranslation()
	default:
		// ut := UnknownTranslation{
		// 	tableName: tableName,
		// }
		// return &ut, nil

		// Changes: (Translations) Decide how we want to handle when no translation is found, idempotent? Or just don't translate?
		return nil, fmt.Errorf("no translation for table: %s ", tableName)

	}

}

// UnknownTranslation is the default translation returned when there isn't a translation. This effectively just lets the raw data be returned in liu of a translation
type UnknownTranslation struct {
	tableName string
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (ut *UnknownTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return map[string]models.ITranslationField{}, nil
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (ut *UnknownTranslation) TableName() string {
	return ut.tableName
}
