package resolvers

import (
	"fmt"
	"time"

	"github.com/mitchellh/mapstructure"

	"github.com/cmsgov/mint-app/pkg/models"
)

type dateChange struct {
	IsRange       bool
	Old           *time.Time
	New           *time.Time
	OldRangeStart *time.Time
	OldRangeEnd   *time.Time
	NewRangeStart *time.Time
	NewRangeEnd   *time.Time
}

type dateFieldData struct {
	IsRange           bool
	IsRangeStart      bool
	OtherRangeKey     string
	CommonKey         string // Used to tether data between two ends of a date range, nil or empty for single dates
	HumanReadableName string
}

// DateProcessor is a struct that processes date changes
type DateProcessor struct {
	changes      map[string]interface{}
	existing     map[string]interface{}
	FieldDataMap map[string]dateFieldData
}

// NewDateProcessor is a constructor for DateProcessor
func NewDateProcessor(changes map[string]interface{}, existing *models.PlanBasics) (*DateProcessor, error) {
	var existingMap map[string]interface{}
	decoderConfig := &mapstructure.DecoderConfig{
		Result:           &existingMap,
		TagName:          "json",
		WeaklyTypedInput: true,
	}

	decoder, err := mapstructure.NewDecoder(decoderConfig)
	if err != nil {
		return nil, err
	}

	err = decoder.Decode(existing)
	if err != nil {
		fmt.Printf("Decode error: %v\n", err)
		return nil, err
	}

	fmt.Printf("Existing map: %+v\n", existingMap)

	return &DateProcessor{changes: changes, existing: existingMap}, nil
}

func assignDateFieldIfValueNil(dateField **time.Time, existingValue *time.Time) {
	if *dateField == nil {
		*dateField = existingValue
	}
}

// ExtractChangedDates extracts the changed dates from the DateProcessor
func (dp *DateProcessor) ExtractChangedDates() (map[string]dateChange, error) {
	dataFieldMap := getFieldDataMap()

	dateChanges := make(map[string]dateChange)

	for fieldKey, fieldData := range dataFieldMap {

		isFieldChanged, oldValue, newValue := dp.checkDateFieldChanged(fieldKey)
		if isFieldChanged {
			if fieldData.IsRange { // check if the field is a range
				dateChangeValue := dateChange{
					IsRange: true,
					Old:     oldValue,
					New:     newValue,
				}

				existingData, existingDataFound := dp.existing[fieldData.OtherRangeKey]

				if fieldData.IsRangeStart {
					dateChangeValue.OldRangeStart = oldValue
					dateChangeValue.NewRangeStart = newValue

					if existingDataFound {
						assignDateFieldIfValueNil(&dateChangeValue.OldRangeEnd, existingData.(*time.Time))
						assignDateFieldIfValueNil(&dateChangeValue.NewRangeEnd, existingData.(*time.Time))
					}
				} else {
					dateChangeValue.OldRangeEnd = oldValue
					dateChangeValue.NewRangeEnd = newValue

					if existingDataFound {
						assignDateFieldIfValueNil(&dateChangeValue.OldRangeStart, existingData.(*time.Time))
						assignDateFieldIfValueNil(&dateChangeValue.NewRangeStart, existingData.(*time.Time))
					}
				}

				if fieldData.CommonKey == "" {
					return nil, fmt.Errorf("CommonKey cannot be empty for range fields")
				}

				dateChanges[fieldKey] = dateChangeValue
			} else {
				dateChanges[fieldKey] = dateChange{
					IsRange: false,
					Old:     oldValue,
					New:     newValue,
				}
			}
		}
	}

	return dateChanges, nil
}

// checkDateFieldChanged checks if a date field has changed between the existing and new values
// Returns:
//	1) Boolean: true if the field has changed
//  2) *time.Time: Old value of the field converted to a pointer to a time.Time
//  3) *time.Time: New value of the field converted to a pointer to a time.Time
func (dp *DateProcessor) checkDateFieldChanged(field string) (
	bool,
	*time.Time,
	*time.Time,
) {
	newVal, newExists := dp.changes[field]
	oldVal, oldExists := dp.existing[field]

	if newExists && oldExists {
		var newTimeVal time.Time
		var err error

		newTimeVal, err = time.Parse(time.RFC3339, newVal.(string))
		if err != nil {
			return false, nil, nil
		}

		oldTimeVal, ok := oldVal.(*time.Time)
		if !ok {
			return false, nil, nil
		}

		if oldTimeVal == nil || oldTimeVal.IsZero() || !newTimeVal.Equal(*oldTimeVal) {
			return true, oldTimeVal, &newTimeVal
		}
	} else if newExists {
		newTimeVal, err := time.Parse(time.RFC3339, newVal.(string))
		if err != nil {
			return false, nil, nil
		}
		return true, nil, &newTimeVal
	}

	return false, nil, nil
}

func getFieldDataMap() map[string]dateFieldData {
	fieldData := map[string]dateFieldData{
		"completeICIP": {
			HumanReadableName: "Complete ICIP",
			IsRange:           false,
		},
		"clearanceStarts": {
			HumanReadableName: "Clearance",
			IsRange:           true,
			IsRangeStart:      true,
			OtherRangeKey:     "clearanceEnds",
		},
		"clearanceEnds": {
			HumanReadableName: "Clearance",
			IsRange:           true,
			IsRangeStart:      false,
			OtherRangeKey:     "clearanceStarts",
		},
		"announced": {
			HumanReadableName: "Announce model",
			IsRange:           false,
		},
		"applicationsStart": {
			HumanReadableName: "Application period",
			IsRange:           true,
			IsRangeStart:      true,
			OtherRangeKey:     "applicationsEnd",
		},
		"applicationsEnd": {
			HumanReadableName: "Application period",
			IsRange:           true,
			IsRangeStart:      false,
			OtherRangeKey:     "applicationsStart",
		},
		"performancePeriodStarts": {
			HumanReadableName: "Performance period",
			IsRange:           true,
			IsRangeStart:      true,
			OtherRangeKey:     "performancePeriodEnds",
		},
		"performancePeriodEnds": {
			HumanReadableName: "Performance period",
			IsRange:           true,
			IsRangeStart:      false,
			OtherRangeKey:     "performancePeriodStarts",
		},
		"wrapUpEnds": {
			HumanReadableName: "Model wrap-up end date",
			IsRange:           false,
		},
	}
	return fieldData
}
