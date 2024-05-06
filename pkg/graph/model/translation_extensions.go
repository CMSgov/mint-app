// Package model houses all autogenerated models from GQL gen
package model

import "github.com/cmsgov/mint-app/pkg/models"

// TableName returns the table name for this translation, satisfying the Translation interface
func (pbt *PlanBasicsTranslation) TableName() string {
	return "plan_basics"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pbt *PlanBasicsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pbt)
}

// Changes: (Structure) Consider moving these all to their own file

// TableName returns the table name for this translation, satisfying the Translation interface
func (pbt *PlanBeneficiariesTranslation) TableName() string {
	return "plan_beneficiaries"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pbt *PlanBeneficiariesTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pbt)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pct *PlanCollaboratorTranslation) TableName() string {
	return "plan_collaborator"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pct *PlanCollaboratorTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pct)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pGct *PlanGeneralCharacteristicsTranslation) TableName() string {
	return "plan_general_characteristics"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pGct *PlanGeneralCharacteristicsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pGct)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pOet *PlanOpsEvalAndLearningTranslation) TableName() string {
	return "plan_ops_eval_and_learning"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pOet *PlanOpsEvalAndLearningTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pOet)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (ppt *PlanPaymentsTranslation) TableName() string {
	return "plan_payments"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (ppt *PlanPaymentsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*ppt)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (tpp *PlanParticipantsAndProvidersTranslation) TableName() string {
	return "plan_participants_and_providers"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (tpp *PlanParticipantsAndProvidersTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*tpp)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (tpp *ModelPlanTranslation) TableName() string {
	return "model_plan"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (tpp *ModelPlanTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*tpp)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pdt *PlanDiscussionsTranslation) TableName() string {
	return "plan_discussion"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pdt *PlanDiscussionsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pdt)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (drt *DiscussionReplyTranslation) TableName() string {
	return "discussion_reply"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (drt *DiscussionReplyTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*drt)

}
