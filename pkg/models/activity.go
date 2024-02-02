package models

import (
	"github.com/google/uuid"
)

// ActivityType is an enum that represents the possible activities that happen in the MINT application
type ActivityType string

// These constants represent the different values of ActivityType
const (
	ActivityDigest             ActivityType = "DAILY_DIGEST_COMPLETE"
	ActivityNewPlanDiscussion  ActivityType = "NEW_PLAN_DISCUSSION"
	ActivityNewDiscussionReply ActivityType = "NEW_DISCUSSION_REPLY"
)

// Activity represents a discrete event that has happened in the application that might be notifiable.
type Activity struct {
	baseStruct
	ActorID      uuid.UUID    `json:"actorID" db:"actor_id"`
	EntitityID   uuid.UUID    `json:"entitityID" db:"entitity_id"`
	ActivityType ActivityType `json:"activityType" db:"activity_type"`
}

// NewActivity returns a New Activity
func NewActivity(actorID uuid.UUID, entitityID uuid.UUID, activityType ActivityType) *Activity {
	return &Activity{
		baseStruct:   NewBaseStruct(actorID), //TODO: EASI-3294 do we want to consider the actor is always the creator the activity?
		ActorID:      actorID,
		EntitityID:   entitityID,
		ActivityType: activityType,
	}
}
