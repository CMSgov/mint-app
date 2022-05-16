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

// DiscussionReplyCreateInput represents the necessary fields to create a discussion reply
type DiscussionReplyCreateInput struct {
	DiscussionID uuid.UUID `json:"discussionID"`
	Content      string    `json:"content"`
	Resolution   bool      `json:"resolution"`
}

// Input associated with a document to be uploaded
type GeneratePresignedUploadURLInput struct {
	FileName string `json:"fileName"`
	MimeType string `json:"mimeType"`
	Size     int    `json:"size"`
}

// URL generated for a document to be uploaded
type GeneratePresignedUploadURLPayload struct {
	URL *string `json:"url"`
}

// The current user's Launch Darkly key
type LaunchDarklySettings struct {
	UserKey    string `json:"userKey"`
	SignedHash string `json:"signedHash"`
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

// PlanCollaboratorCreateInput represents the data required to create a collaborator on a plan
type PlanCollaboratorCreateInput struct {
	ModelPlanID uuid.UUID       `json:"modelPlanID"`
	EuaUserID   string          `json:"euaUserID"`
	FullName    string          `json:"fullName"`
	TeamRole    models.TeamRole `json:"teamRole"`
}

// PlanDiscussionCreateInput represents the necessary fields to create a plan discussion
type PlanDiscussionCreateInput struct {
	ModelPlanID uuid.UUID `json:"modelPlanID"`
	Content     string    `json:"content"`
}

// PlanDocumentInput represents the data required to create, modify, or delete a document on a plan
type PlanDocumentInput struct {
	ID                 *uuid.UUID              `json:"id"`
	ModelPlanID        uuid.UUID               `json:"modelPlanID"`
	DocumentParameters *PlanDocumentParameters `json:"documentParameters"`
	URL                *string                 `json:"url"`
}

// PlanDocumentCreateParameters represents the specific data required to create or modify a document on a plan
type PlanDocumentParameters struct {
	FileName             *string              `json:"fileName"`
	FileSize             int                  `json:"fileSize"`
	FileType             *string              `json:"fileType"`
	DocumentType         *models.DocumentType `json:"documentType"`
	OtherTypeDescription *string              `json:"otherTypeDescription"`
	OptionalNotes        *string              `json:"optionalNotes"`
}

// PlanDocumentPayload represents the response to a document request
type PlanDocumentPayload struct {
	Document     *models.PlanDocument `json:"document"`
	PresignedURL *string              `json:"presignedURL"`
}

// Represents plan milestones input
type PlanMilestonesInput struct {
	ID                      *uuid.UUID         `json:"id"`
	ModelPlanID             *uuid.UUID         `json:"modelPlanID"`
	CompleteIcip            *time.Time         `json:"completeICIP"`
	ClearanceStarts         *time.Time         `json:"clearanceStarts"`
	ClearanceEnds           *time.Time         `json:"clearanceEnds"`
	Announced               *time.Time         `json:"announced"`
	ApplicationsStart       *time.Time         `json:"applicationsStart"`
	ApplicationsEnd         *time.Time         `json:"applicationsEnd"`
	PerformancePeriodStarts *time.Time         `json:"performancePeriodStarts"`
	PerformancePeriodEnds   *time.Time         `json:"performancePeriodEnds"`
	WrapUpEnds              *time.Time         `json:"wrapUpEnds"`
	HighLevelNote           *string            `json:"highLevelNote"`
	PhasedIn                *bool              `json:"phasedIn"`
	PhasedInNote            *string            `json:"phasedInNote"`
	CreatedBy               *string            `json:"createdBy"`
	CreatedDts              *time.Time         `json:"createdDts"`
	ModifiedBy              *string            `json:"modifiedBy"`
	ModifiedDts             *time.Time         `json:"modifiedDts"`
	Status                  *models.TaskStatus `json:"status"`
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
