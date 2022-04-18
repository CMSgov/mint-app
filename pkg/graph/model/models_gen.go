// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/google/uuid"
)

// The payload returned on requesting plan basics creation
type CreatePlanBasicsPayload struct {
	ID         uuid.UUID    `json:"id"`
	UserErrors []*UserError `json:"userErrors"`
}

// Requests the creation of plan basics
type CreatePlanBasicsRequestInput struct {
	ModelPlanID uuid.UUID `json:"modelPlanID"`
}

// The payload returned on requesting plan milestones creation
type CreatePlanMilestonesPayload struct {
	ID         uuid.UUID    `json:"id"`
	UserErrors []*UserError `json:"userErrors"`
}

// Requests the creation of plan milestones
type CreatePlanMilestonesRequest struct {
	ModelPlanID uuid.UUID `json:"modelPlanID"`
}

// The current user of the application
type CurrentUser struct {
	LaunchDarkly *LaunchDarklySettings `json:"launchDarkly"`
}

// The current user's Launch Darkly key
type LaunchDarklySettings struct {
	UserKey    string `json:"userKey"`
	SignedHash string `json:"signedHash"`
}

// ModelPlanInput represent the data point for plans about a model. It is the central data type in the appliation
type ModelPlanInput struct {
	ID                      *uuid.UUID `json:"id"`
	Requester               *string    `json:"requester"`
	RequesterComponent      *string    `json:"requesterComponent"`
	MainPointOfContact      *string    `json:"mainPointOfContact"`
	PointOfContactComponent *string    `json:"pointOfContactComponent"`
	CreatedBy               *string    `json:"createdBy"`
	CreatedDts              *time.Time `json:"createdDts"`
	ModifiedBy              *string    `json:"modifiedBy"`
	ModifiedDts             *time.Time `json:"modifiedDts"`
}

// UserError represents application-level errors that are the result of
// either user or application developer error.
type UserError struct {
	Message string   `json:"message"`
	Path    []string `json:"path"`
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
