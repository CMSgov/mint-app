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
func (pbt *PlanGeneralCharacteristicsTranslation) TableName() string {
	return "plan_general_characteristics"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pbt *PlanGeneralCharacteristicsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pbt)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pbt *PlanOpsEvalAndLearningTranslation) TableName() string {
	return "plan_ops_eval_and_learning"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pbt *PlanOpsEvalAndLearningTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pbt)
}

// TableName returns the table name for this translation, satisfying the Translation interface
func (pbt *PlanPaymentsTranslation) TableName() string {
	return "plan_payments"
}

// ToMap translates this translation to a map, satisfying the Translation interface
func (pbt *PlanPaymentsTranslation) ToMap() (map[string]models.ITranslationField, error) {
	return models.StructToTranslationMap(*pbt)
}
