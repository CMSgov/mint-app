package models

import (
	"time"
)

// CrTdl represents CRs and TDLs related to a model plan
type CrTdl struct {
	BaseStruct
	ModelPlanRelation
	IDNumber         string     `json:"idNumber" db:"id_number"`
	DateInitiated    *time.Time `json:"dateInitiated" db:"date_initiated"`
	Title            string     `json:"title" db:"title"`
	OptionalComments string     `json:"optionalComments" db:"optional_comments"`
}
