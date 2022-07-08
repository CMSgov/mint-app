package models

import (
	"github.com/google/uuid"
)

//PlanDiscussion represents a discussion that a user has about a model plan
type PlanDiscussion struct {
	BaseStruct
	ModelPlanID uuid.UUID        `json:"modelPlanID" db:"model_plan_id"`
	Content     string           `json:"content" db:"content"`
	Status      DiscussionStatus `json:"status" db:"status"`
}

//DiscussionReply represents a comment that was made on the PlanDiscussion
type DiscussionReply struct {
	BaseStruct
	DiscussionID uuid.UUID `json:"discussionID" db:"discussion_id"`
	Content      string    `json:"content" db:"content"`
	Resolution   bool      `json:"resolution" db:"resolution"` //default to false
}

// GetModelTypeName returns a string name that represents the PlanDiscussion struct
func (p PlanDiscussion) GetModelTypeName() string {
	return "Plan_Discussion"
}

// GetID returns the ID property for a PlanDiscussion struct
func (p PlanDiscussion) GetID() uuid.UUID {
	return p.ID
}

// GetPlanID returns the ModelPlanID property for a PlanDiscussion struct
func (p PlanDiscussion) GetPlanID() uuid.UUID {
	return p.ModelPlanID
}

// GetModifiedBy returns the ModifiedBy property for a PlanDiscussion struct
func (p PlanDiscussion) GetModifiedBy() *string {
	return p.ModifiedBy
}

// GetCreatedBy implements the CreatedBy property
func (p PlanDiscussion) GetCreatedBy() string {
	return p.CreatedBy
}

// GetModelTypeName returns a string name that represents the DiscussionReply struct
func (r DiscussionReply) GetModelTypeName() string {
	return "Discussion_Reply"
}

// GetID returns the ID property for a DiscussionReply struct
func (r DiscussionReply) GetID() uuid.UUID {
	return r.ID
}

// GetPlanID returns the ModelPlanID property for a DiscussionReply struct
func (r DiscussionReply) GetPlanID() uuid.UUID {
	//TODO, this object doesn't implement modelPlanID, maybe we shouldn't implment this interface..
	return uuid.UUID{}
}

// GetModifiedBy returns the ModifiedBy property for a DiscussionReply struct
func (r DiscussionReply) GetModifiedBy() *string {
	return r.ModifiedBy
}

// GetCreatedBy implements the CreatedBy property
func (r DiscussionReply) GetCreatedBy() string {
	return r.CreatedBy
}
