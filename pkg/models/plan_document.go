package models

import (
	"time"

	"github.com/google/uuid"
)

// PlanDocument represents a document attached to the plan
type PlanDocument struct {
	baseStruct
	modelPlanRelation

	FileType string `json:"fileType" db:"file_type"`
	Bucket   string `json:"bucket" db:"bucket"`
	FileKey  string `json:"fileKey" db:"file_key"`

	VirusScanned bool `json:"virusScanned" db:"virus_scanned"`
	VirusClean   bool `json:"virusClean" db:"virus_clean"`

	FileName             string       `json:"fileName" db:"file_name"`
	FileSize             int          `json:"fileSize" db:"file_size"`
	DocumentType         DocumentType `json:"documentType" db:"document_type"`
	OtherTypeDescription *string      `json:"otherType" db:"other_type"`
	OptionalNotes        *string      `json:"optionalNotes" db:"optional_notes"`

	DeletedAt *time.Time `json:"deletedAt" db:"deleted_at"`
}

//NewPlanDocument returns a new Plan Document
func NewPlanDocument(createdBy string, modelPlanID uuid.UUID) *PlanDocument {
	return &PlanDocument{
		modelPlanRelation:    NewModelPlanRelation(modelPlanID),
		baseStruct:           NewBaseStruct(createdBy),
		VirusScanned:         false,
		VirusClean:           false,
		FileSize:             0,
		OtherTypeDescription: nil,
		OptionalNotes:        nil,
		DeletedAt:            nil,
	}
}
