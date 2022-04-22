package models

import (
	"time"

	"github.com/google/uuid"
)

// PlanMilestones represents the "plan milestones" section of a plan
type PlanMilestones struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ModelPlanID uuid.UUID `json:"modelPlanID" db:"model_plan_id"`

	EnterCMSClearance    *time.Time `json:"enterCMSClearance" db:"enter_cms_clearance"`
	EnterHMSOMBClearance *time.Time `json:"enterHHSOMBClearance" db:"enter_hhs_omb_clearance"`

	Cleared   *time.Time `json:"cleared" db:"cleared"`
	Announced *time.Time `json:"announced" db:"announced"`

	ApplicationsDue       *time.Time `json:"applicationsDue" db:"applications_due"`
	ParticipantsAnnounced *time.Time `json:"participantsAnnounced" db:"participants_announced"`

	PerformancePeriodStarts *time.Time `json:"performancePeriodStarts" db:"performance_period_starts"`
	PerformancePeriodEnds   *time.Time `json:"performancePeriodEnds" db:"performance_period_ends"`

	CreatedBy   *string    `json:"createdBy" db:"created_by"`
	CreatedDts  *time.Time `json:"createdDts" db:"created_dts"`
	ModifiedBy  *string    `json:"modifiedBy" db:"modified_by"`
	ModifiedDts *time.Time `json:"modifiedDts" db:"modified_dts"`
}

// GetModelTypeName returns a string name that represents the PlanMilestones struct
func (p PlanMilestones) GetModelTypeName() string {
	return "Plan_Milestones"
}

// GetID returns the GetID property for a PlanMilestones struct
func (p PlanMilestones) GetID() uuid.UUID {
	return p.ID
}

// GetPlanID returns the ModelPlanID property for a PlanMilestones struct
func (p PlanMilestones) GetPlanID() uuid.UUID {
	return p.ModelPlanID
}

// GetModifiedBy returns the ModifiedBy property for a PlanMilestones struct
func (p PlanMilestones) GetModifiedBy() *string {
	return p.ModifiedBy
}
