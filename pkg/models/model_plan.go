package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type ModelPlan struct {
	ID            uuid.UUID      `json:"id" db:"id"`
	ModelName     *string        `json:"modelName" db:"model_name"`
	ModelCategory *ModelCategory `json:"modelCategory" db:"model_category"`
	CMSCenter     *CMSCenter     `json:"cmsCenter" db:"cms_center"`
	CMMIGroup     pq.StringArray `json:"cmmiGroup" db:"cmmi_group"`
	CreatedBy     *string        `json:"createdBy" db:"created_by"`
	CreatedDts    *time.Time     `json:"createdDts" db:"created_dts"`
	ModifiedBy    *string        `json:"modifiedBy" db:"modified_by"`
	ModifiedDts   *time.Time     `json:"modifiedDts" db:"modified_dts"`
}

func (m ModelPlan) GetModelTypeName() string {
	return "Model_Plan"
}

func (m ModelPlan) GetPlanID() uuid.UUID {
	return m.ID
}

func (m ModelPlan) GetModifiedBy() *string {
	return m.ModifiedBy
}
