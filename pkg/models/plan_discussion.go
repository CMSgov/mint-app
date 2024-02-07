package models

import (
	"github.com/google/uuid"
)

// PlanDiscussion represents a discussion that a user has about a model plan
type PlanDiscussion struct {
	baseStruct
	modelPlanRelation
	Content             TaggedHTML          `json:"content" db:"content"`
	UserRole            *DiscussionUserRole `json:"userRole" db:"user_role"`
	UserRoleDescription *string             `json:"userRoleDescription" db:"user_role_description"`
	IsAssessment        bool                `json:"isAssessment" db:"is_assessment"`
}

func (d PlanDiscussion) isUserNotificationContent() {}

// NewPlanDiscussion returns a New PlanDiscussion with a status of UNANSWERED
func NewPlanDiscussion(
	principal uuid.UUID,
	isAssessment bool,
	modelPlanID uuid.UUID,
	content TaggedHTML,
	userRole *DiscussionUserRole,
	userRoleDescription *string,
) *PlanDiscussion {
	return &PlanDiscussion{
		Content:             content,
		UserRole:            userRole,
		UserRoleDescription: userRoleDescription,
		IsAssessment:        isAssessment,
		modelPlanRelation:   NewModelPlanRelation(modelPlanID),
		baseStruct:          NewBaseStruct(principal),
	}
}

// DiscussionReply represents a comment that was made on the PlanDiscussion
type DiscussionReply struct {
	baseStruct
	discussionRelation
	Content             TaggedHTML          `json:"content" db:"content"`
	UserRole            *DiscussionUserRole `json:"userRole" db:"user_role"`
	UserRoleDescription *string             `json:"userRoleDescription" db:"user_role_description"`
	IsAssessment        bool                `json:"isAssessment" db:"is_assessment"`
}

func (dr DiscussionReply) isUserNotificationContent() {}

// NewDiscussionReply returns a new Discussion Reply
func NewDiscussionReply(
	principal uuid.UUID,
	isAssessment bool,
	discussionID uuid.UUID,
	content TaggedHTML,
	userRole *DiscussionUserRole,
	userRoleDescription *string,
) *DiscussionReply {
	return &DiscussionReply{
		Content:             content,
		UserRole:            userRole,
		UserRoleDescription: userRoleDescription,
		IsAssessment:        isAssessment,
		discussionRelation:  NewDiscussionRelation(discussionID),
		baseStruct:          NewBaseStruct(principal),
	}
}

// DiscussionUserRole is an enum that represents the role of a user in a Discussion
type DiscussionUserRole string

// These constants represent the possible values of a DiscussionUserRole
const (
	DiscussionRoleCmsSystemServiceTeam             DiscussionUserRole = "CMS_SYSTEM_SERVICE_TEAM"
	DiscussionRoleItArchitect                      DiscussionUserRole = "IT_ARCHITECT"
	DiscussionRoleLeadership                       DiscussionUserRole = "LEADERSHIP"
	DiscussionRoleMedicareAdministrativeContractor DiscussionUserRole = "MEDICARE_ADMINISTRATIVE_CONTRACTOR"
	DiscussionRoleMintTeam                         DiscussionUserRole = "MINT_TEAM"
	DiscussionRoleModelItLead                      DiscussionUserRole = "MODEL_IT_LEAD"
	DiscussionRoleModelTeam                        DiscussionUserRole = "MODEL_TEAM"
	DiscussionRoleSharedSystemMaintainer           DiscussionUserRole = "SHARED_SYSTEM_MAINTAINER"
	DiscussionRoleNoneOfTheAbove                   DiscussionUserRole = "NONE_OF_THE_ABOVE"
)

// DiscussionRoleSelection represents a user's selection of a DiscussionUserRole and optionally a description of their role
type DiscussionRoleSelection struct {
	UserRole            DiscussionUserRole `json:"userRole" db:"user_role"`
	UserRoleDescription *string            `json:"userRoleDescription" db:"user_role_description"`
}

// Humanize converts the enumeration of the Discussion User Role and the description for NONE OF THE ABOVE
// And converts it to human readable text.
func (r DiscussionUserRole) Humanize(userRoleDescription string) string {
	switch r {
	case DiscussionRoleCmsSystemServiceTeam:
		return "CMS System/Service Team"
	case DiscussionRoleItArchitect:
		return "IT Architect"
	case DiscussionRoleLeadership:
		return "Leadership"
	case DiscussionRoleMedicareAdministrativeContractor:
		return "Medicare Administrative Contractor"
	case DiscussionRoleMintTeam:
		return "MINT Team"
	case DiscussionRoleModelItLead:
		return "Model IT Lead"
	case DiscussionRoleModelTeam:
		return "Model Team"
	case DiscussionRoleSharedSystemMaintainer:
		return "Shared System Maintainer"
	case DiscussionRoleNoneOfTheAbove:
		return userRoleDescription
	default:
		return string(r)
	}

}
