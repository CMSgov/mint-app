package models

import "github.com/lib/pq"

// StringPointer returns a pointer to a string input
func StringPointer(st string) *string {
	return &st
}

// BoolPointer returns a pointer to a bool input
func BoolPointer(value bool) *bool {
	return &value
}

// IntPointer returns a pointer to a bool input
func IntPointer(val int) *int {
	return &val
}

// ValueOrEmpty returns a string if the input is not nil, otherwise returns an empty string
func ValueOrEmpty(st *string) string {
	if st != nil {
		return *st
	}
	return ""
}

//ConvertEnums converts a pq.StringArray to specific, castable type
func ConvertEnums[EnumType ~string](pqGroups pq.StringArray) []EnumType {
	enumValues := []EnumType{}
	for _, item := range pqGroups {
		enumValues = append(enumValues, EnumType(item))
	}
	return enumValues
}
