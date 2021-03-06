package models

import (
	"time"

	"github.com/google/uuid"
)

// PlanMilestones represents the "plan milestones" section of a plan
type PlanMilestones struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ModelPlanID uuid.UUID `json:"modelPlanID" db:"model_plan_id"`

	CompleteICIP    *time.Time `json:"completeICIP" db:"complete_icip" statusWeight:"1"`
	ClearanceStarts *time.Time `json:"clearanceStarts" db:"clearance_starts" statusWeight:"1"`
	ClearanceEnds   *time.Time `json:"clearanceEnds" db:"clearance_ends" statusWeight:"1"`

	Announced *time.Time `json:"announced" db:"announced" statusWeight:"1"`

	ApplicationsStart *time.Time `json:"applicationsStart" db:"applications_starts" statusWeight:"1"`
	ApplicationsEnd   *time.Time `json:"applicationsEnd" db:"applications_ends" statusWeight:"1"`

	PerformancePeriodStarts *time.Time `json:"performancePeriodStarts" db:"performance_period_starts" statusWeight:"1"`
	PerformancePeriodEnds   *time.Time `json:"performancePeriodEnds" db:"performance_period_ends" statusWeight:"1"`
	WrapUpEnds              *time.Time `json:"wrapUpEnds" db:"wrap_up_ends" statusWeight:"1"`
	HighLevelNote           *string    `json:"highLevelNote" db:"high_level_note"`

	PhasedIn     *bool   `json:"phasedIn" db:"phased_in" statusWeight:"1"` //default to false
	PhasedInNote *string `json:"phasedInNote" db:"phased_in_note"`

	CreatedBy   string     `json:"createdBy" db:"created_by"`
	CreatedDts  time.Time  `json:"createdDts" db:"created_dts"`
	ModifiedBy  *string    `json:"modifiedBy" db:"modified_by"`
	ModifiedDts *time.Time `json:"modifiedDts" db:"modified_dts"`

	Status TaskStatus `json:"status" db:"status"`
}

// CalcStatus calculates the status of the Plan Milestones and sets the Status field
func (pm *PlanMilestones) CalcStatus() error {
	status, err := GenericallyCalculateStatus(*pm)
	if err != nil {
		return err
	}

	pm.Status = status
	return nil
}

// GetModelTypeName returns a string name that represents the PlanMilestones struct
func (pm PlanMilestones) GetModelTypeName() string {
	return "Plan_Milestones"
}

// GetID returns the GetID property for a PlanMilestones struct
func (pm PlanMilestones) GetID() uuid.UUID {
	return pm.ID
}

// GetPlanID returns the ModelPlanID property for a PlanMilestones struct
func (pm PlanMilestones) GetPlanID() uuid.UUID {
	return pm.ModelPlanID
}

// GetModifiedBy returns the ModifiedBy property for a PlanMilestones struct
func (pm PlanMilestones) GetModifiedBy() *string {
	return pm.ModifiedBy
}

// GetCreatedBy returns the CreatedBy property for a PlanMilestones struct
func (pm PlanMilestones) GetCreatedBy() string {
	return pm.CreatedBy
}
