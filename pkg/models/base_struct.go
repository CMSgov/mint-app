package models

import (
	"time"

	"github.com/google/uuid"
)

// IBaseStruct is an interface that all models must implement
type IBaseStruct interface {
	GetBaseStruct() *BaseStruct
	GetID() uuid.UUID
	GetCreatedBy() string
	GetModifiedBy() *string
}

// BaseStruct represents the shared data in common betwen all models
type BaseStruct struct {
	ID          uuid.UUID  `json:"id" db:"id"`
	CreatedBy   string     `json:"createdBy" db:"created_by"`
	CreatedDts  time.Time  `json:"createdDts" db:"created_dts"`
	ModifiedBy  *string    `json:"modifiedBy" db:"modified_by"`
	ModifiedDts *time.Time `json:"modifiedDts" db:"modified_dts"`
}

// GetBaseStruct returns the Base Struct
func (b *BaseStruct) GetBaseStruct() *BaseStruct {
	return b
}

// GetModelTypeName returns a string name that represents the PlanBasics struct
func (b BaseStruct) GetModelTypeName() string {
	//TODO HAVe THIS USE REFLECTION OR DEPRECATE, not really needed.
	return "Plan_Basics"
}

// GetID returns the ID property for a PlanBasics struct
func (b BaseStruct) GetID() uuid.UUID {
	return b.ID
}

// GetModifiedBy returns the ModifiedBy property for a PlanBasics struct
func (b BaseStruct) GetModifiedBy() *string {
	return b.ModifiedBy
}

// GetCreatedBy implements the CreatedBy property
func (b BaseStruct) GetCreatedBy() string {
	return b.CreatedBy
}
