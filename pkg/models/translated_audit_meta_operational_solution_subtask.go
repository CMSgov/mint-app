package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
)

// TranslatedAuditMetaOperationalSolutionSubtask represents the data about an operational need to render an operational need human readable.
type TranslatedAuditMetaOperationalSolutionSubtask struct {
	TranslatedAuditMetaBaseStruct
	NeedName            string  `json:"needName"`
	NeedIsOther         bool    `json:"needIsOther"`
	SolutionName        string  `json:"solutionName"`
	SolutionOtherHeader *string `json:"solutionOtherHeader"`
	NumberOfSubtasks    int     `json:"numberOfSubtasks"`
	SolutionIsOther     bool    `json:"solutionIsOther"`
	SubtaskName         *string `json:"subtaskName"`
}

// NewTranslatedAuditMetaOperationalSolutionSubtask creates a New TranslatedAuditMetaOperationalSolutionSubtask
func NewTranslatedAuditMetaOperationalSolutionSubtask(version int, solutionName string, solutionOtherHeader *string, solIsOther bool, numSubtasks int, needName string, needIsOther bool, subtaskName *string) TranslatedAuditMetaOperationalSolutionSubtask {

	return TranslatedAuditMetaOperationalSolutionSubtask{
		TranslatedAuditMetaBaseStruct: NewTranslatedAuditMetaBaseStruct(TNOperationalSolutionSubtask, version),
		SolutionName:                  solutionName,
		SolutionOtherHeader:           solutionOtherHeader,
		SolutionIsOther:               solIsOther,
		NumberOfSubtasks:              numSubtasks,
		NeedName:                      needName,
		NeedIsOther:                   needIsOther,
		SubtaskName:                   subtaskName,
	}
}

// isActivityMetaData implements the IActivityMetaGeneric
func (hmb TranslatedAuditMetaOperationalSolutionSubtask) isAuditMetaData() {}

// Value allows us to satisfy the valuer interface so we can write to the database
func (hmb TranslatedAuditMetaOperationalSolutionSubtask) Value() (driver.Value, error) {
	j, err := json.Marshal(hmb)
	return j, err
}

// Scan implements the scanner interface so we can translate the JSONb from the db to an object in GO
func (hmb *TranslatedAuditMetaOperationalSolutionSubtask) Scan(src interface{}) error {
	if src == nil {
		return nil
	}
	source, ok := src.([]byte)
	if !ok {
		return errors.New("type assertion .([]byte) failed")
	}
	err := json.Unmarshal(source, hmb)
	if err != nil {
		return err
	}

	return nil
}
