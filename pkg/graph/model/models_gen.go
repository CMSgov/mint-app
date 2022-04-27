// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/google/uuid"
)

// The current user of the application
type CurrentUser struct {
	LaunchDarkly *LaunchDarklySettings `json:"launchDarkly"`
}

// DiscussionReplyInput represents input for a discussion reply
type DiscussionReplyInput struct {
	ID           *uuid.UUID `json:"id"`
	DiscussionID uuid.UUID  `json:"discussionID"`
	Content      string     `json:"content"`
	Resolution   *bool      `json:"resolution"`
	CreatedBy    *string    `json:"createdBy"`
	CreatedDts   *time.Time `json:"createdDts"`
	ModifiedBy   *string    `json:"modifiedBy"`
	ModifiedDts  *time.Time `json:"modifiedDts"`
}

// The current user's Launch Darkly key
type LaunchDarklySettings struct {
	UserKey    string `json:"userKey"`
	SignedHash string `json:"signedHash"`
}

// ModelPlanInput represent the data point for plans about a model. It is the central data type in the appliation
type ModelPlanInput struct {
	ID            *uuid.UUID            `json:"id"`
	ModelName     *string               `json:"modelName"`
	ModelCategory *models.ModelCategory `json:"modelCategory"`
	CmsCenter     *models.CMSCenter     `json:"cmsCenter"`
	CmmiGroups    []CMMIGroup           `json:"cmmiGroups"`
	CreatedBy     *string               `json:"createdBy"`
	CreatedDts    *time.Time            `json:"createdDts"`
	ModifiedBy    *string               `json:"modifiedBy"`
	ModifiedDts   *time.Time            `json:"modifiedDts"`
}

// Represents plan basics
type PlanBasicsInput struct {
	ID             *uuid.UUID         `json:"id"`
	ModelPlanID    *uuid.UUID         `json:"modelPlanID"`
	ModelType      *models.ModelType  `json:"modelType"`
	Problem        *string            `json:"problem"`
	Goal           *string            `json:"goal"`
	TestInventions *string            `json:"testInventions"`
	Note           *string            `json:"note"`
	CreatedBy      *string            `json:"createdBy"`
	CreatedDts     *time.Time         `json:"createdDts"`
	ModifiedBy     *string            `json:"modifiedBy"`
	ModifiedDts    *time.Time         `json:"modifiedDts"`
	Status         *models.TaskStatus `json:"status"`
}

// PlanCollaboratorInput represents the data required to create, modify, or delete a collaborator on a plan
type PlanCollaboratorInput struct {
	ID          *uuid.UUID       `json:"id"`
	ModelPlanID uuid.UUID        `json:"modelPlanID"`
	EuaUserID   string           `json:"euaUserID"`
	FullName    string           `json:"fullName"`
	CmsCenter   models.CMSCenter `json:"cmsCenter"`
	TeamRole    models.TeamRole  `json:"teamRole"`
	CreatedBy   *string          `json:"createdBy"`
	CreatedDts  *time.Time       `json:"createdDts"`
	ModifiedBy  *string          `json:"modifiedBy"`
	ModifiedDts *time.Time       `json:"modifiedDts"`
}

// PlanDiscussionInput represents input for plan discussion
type PlanDiscussionInput struct {
	ID          *uuid.UUID               `json:"id"`
	ModelPlanID uuid.UUID                `json:"modelPlanID"`
	Content     string                   `json:"content"`
	Status      *models.DiscussionStatus `json:"status"`
	CreatedBy   *string                  `json:"createdBy"`
	CreatedDts  *time.Time               `json:"createdDts"`
	ModifiedBy  *string                  `json:"modifiedBy"`
	ModifiedDts *time.Time               `json:"modifiedDts"`
}

// Represents plan milestones input
type PlanMilestonesInput struct {
	ID                      *uuid.UUID `json:"id"`
	ModelPlanID             *uuid.UUID `json:"modelPlanID"`
	EnterCMSClearance       *time.Time `json:"enterCMSClearance"`
	EnterHMSOMBClearance    *time.Time `json:"enterHMSOMBClearance"`
	Cleared                 *time.Time `json:"cleared"`
	Announced               *time.Time `json:"announced"`
	ApplicationsDue         *time.Time `json:"applicationsDue"`
	ParticipantsAnnounced   *time.Time `json:"participantsAnnounced"`
	PerformancePeriodStarts *time.Time `json:"performancePeriodStarts"`
	PerformancePeriodEnds   *time.Time `json:"performancePeriodEnds"`
	CreatedBy               *string    `json:"createdBy"`
	CreatedDts              *time.Time `json:"createdDts"`
	ModifiedBy              *string    `json:"modifiedBy"`
	ModifiedDts             *time.Time `json:"modifiedDts"`
}

type CMMIGroup string

const (
	CMMIGroupPatientCareModelsGroup                       CMMIGroup = "PATIENT_CARE_MODELS_GROUP"
	CMMIGroupPolicyAndProgramsGroup                       CMMIGroup = "POLICY_AND_PROGRAMS_GROUP"
	CMMIGroupPreventiveAndPopulationHealthCareModelsGroup CMMIGroup = "PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP"
	CMMIGroupSeamlessCareModelsGroup                      CMMIGroup = "SEAMLESS_CARE_MODELS_GROUP"
	CMMIGroupStateInnovationsGroup                        CMMIGroup = "STATE_INNOVATIONS_GROUP"
)

var AllCMMIGroup = []CMMIGroup{
	CMMIGroupPatientCareModelsGroup,
	CMMIGroupPolicyAndProgramsGroup,
	CMMIGroupPreventiveAndPopulationHealthCareModelsGroup,
	CMMIGroupSeamlessCareModelsGroup,
	CMMIGroupStateInnovationsGroup,
}

func (e CMMIGroup) IsValid() bool {
	switch e {
	case CMMIGroupPatientCareModelsGroup, CMMIGroupPolicyAndProgramsGroup, CMMIGroupPreventiveAndPopulationHealthCareModelsGroup, CMMIGroupSeamlessCareModelsGroup, CMMIGroupStateInnovationsGroup:
		return true
	}
	return false
}

func (e CMMIGroup) String() string {
	return string(e)
}

func (e *CMMIGroup) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CMMIGroup(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CMMIGroup", str)
	}
	return nil
}

func (e CMMIGroup) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// A user role associated with a job code
type Role string

const (
	// A basic MINT user
	RoleMintBaseUser Role = "MINT_BASE_USER"
	// A MINT admin user
	RoleMintAdminUser Role = "MINT_ADMIN_USER"
)

var AllRole = []Role{
	RoleMintBaseUser,
	RoleMintAdminUser,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleMintBaseUser, RoleMintAdminUser:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
