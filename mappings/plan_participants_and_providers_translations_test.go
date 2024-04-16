package mappings

import (
	_ "embed"
	"fmt"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/cmsgov/mint-app/pkg/models"
)

func TestParticipantsAndProvidersTranslation(t *testing.T) {
	translation, err := ParticipantsAndProvidersTranslation()

	assert.NoError(t, err)
	assert.NotNil(t, translation)

}

func TestParticipantsAndProvidersTranslationVerifyFieldsArePopulated(t *testing.T) {
	translation, err := ParticipantsAndProvidersTranslation()
	assert.NoError(t, err)
	assert.NotNil(t, translation)

	tMap, err := translation.ToMap()
	assert.NoError(t, err)
	assert.NotNil(t, tMap)

	assert.NoError(t, err)
	assert.NotNil(t, translation)

	// Get the type & value of the object
	v := reflect.ValueOf(*translation)
	typ := v.Type()

	// // Structs are the only type this function can work with
	// if typ.Kind() != reflect.Struct {
	// 	return nil, fmt.Errorf("%s is not a struct", t)
	// }
	// retVal := map[string]interface{}{}

	// Iterate over all available fields
	for i := 0; i < typ.NumField(); i++ {
		// Get the field
		field := typ.Field(i)
		value := v.Field(i)
		assertTranslationFieldData(t, field, value)
	}

}

func assertTranslationFieldData(t *testing.T, field reflect.StructField, value reflect.Value) {
	//Changes (Translations) Revisit this, assert non nil values of all fields based on the data type (we are asserting that something that is meant to have options, does have options defined)

	kind := value.Kind()
	if kind == reflect.Ptr {

		fmt.Print("found a pointer")
	}
	switch kind {
	case reflect.String:
		fmt.Print("found a string")

	case reflect.Struct:
		// fmt.Printf("found struct for field %s \r\n", field.Name)
		// fmt.Printf("%s \r\n", field.Type)
		assertTranslationStructField(t, field, value)

	}

}

// assertTranslationStructField asserts that there required translation details are populated based on the type of struct for each field.
func assertTranslationStructField(t *testing.T, field reflect.StructField, value reflect.Value) {
	fieldType := field.Type
	fmt.Printf("%s", fieldType.Name())

	switch fieldType.Name() {
	case "TranslationField":
		assertTranslationField(t, field, value)

	case "TranslationFieldWithOptions":
		assertTranslationFieldWithOptions(t, field, value)

	case "TranslationFieldWithParent":

	case "TranslationFieldWithOptionsAndChildren":

	case "TranslationFieldWithOptionsAndParent":

	case "TranslationFieldWithParentAndChildren":

	default:

	}

}

func assertTranslationField(t *testing.T, field reflect.StructField, value reflect.Value) {
	tField, ok := value.Interface().(models.TranslationField)
	assert.True(t, ok, "the value is not of type %T, it is type %T", tField, value)

	assertTFieldBase(t, field, tField.TranslationFieldBase)
	// for

}

func assertTranslationFieldWithOptions(t *testing.T, field reflect.StructField, value reflect.Value) {
	tField, ok := value.Interface().(models.TranslationFieldWithOptions)
	assert.True(t, ok, "the value is not of type %T, it is type %T", tField, value)

	assertTFieldBase(t, field, tField.TranslationFieldBase)

	assertTFieldOptions(t, field, tField)

}

// assertTFieldBase asserts that all fields of a translation are filled out appropriately when they are expected
func assertTFieldBase(t *testing.T, field reflect.StructField, base models.TranslationFieldBase) {

	// assert.NotNil(t, base)
	assert.NotZero(t, base, "issue for field %s", field.Name)

	assert.NotZero(t, base.GqlField)
	assert.NotZero(t, base.GoField)
	assert.NotZero(t, base.DbField)
	assert.NotZero(t, base.Label)

	// Changes: (Translations), assert
	// assert.NotZero(t, base.ReadOnlyLabel)
	// assert.NotZero(t, base.SubLabel)
	// assert.NotZero(t, base.MultiSelectLabel)
	assertStringPointerNilOrNotEmpty(t, base.ReadOnlyLabel, field)
	assertStringPointerNilOrNotEmpty(t, base.SubLabel, field)
	assertStringPointerNilOrNotEmpty(t, base.MultiSelectLabel, field)

	// assert.NotZero(t, base.IsArray)

	assert.NotZero(t, base.DataType)
	assert.NotZero(t, base.FormType, "issue for field %s. Value: %s", field.Name)

	// Changes: (Translations) how should we assert bools here? False is the NotZero state... so  we might not be able to assert anything about bools that aren't pointers
	// assert.NotZero(t, base.IsNote)
	// assert.NotZero(t, base.IsOtherType)

	assertStringPointerNilOrNotEmpty(t, base.OtherParentField, field)
	// assert.NotZero(t, base.OtherParentField, "issue for field %s", field.Name)
	// assert.NotZero(t, base.ParentReferencesLabel, "issue for field %s", field.Name)
	assertStringPointerNilOrNotEmpty(t, base.ParentReferencesLabel, field)

}

// assertTFieldOptions asserts that a translation has options when it is supposed to
func assertTFieldOptions(t *testing.T, field reflect.StructField, translation models.ITranslationField) {
	options, hasOptions := translation.GetOptions()
	assert.True(t, hasOptions)

	assert.NotZero(t, options, "field %s. Doesn't have options", field.Name)

	count := len(options)
	assert.GreaterOrEqual(t, count, 1, "field %s. Doesn't have options. There are %i options.", field.Name, count)

}

func assertStringPointerNilOrNotEmpty(t *testing.T, value *string, field reflect.StructField) {
	if value == nil {
		return
	}

	assert.NotEqualValues(t, "", *value, "field %s is an empty string, a value was expected", field.Name)

}
