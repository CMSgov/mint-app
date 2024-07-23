package mappings

import (
	_ "embed"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/cmsgov/mint-app/pkg/models"
)

func TestOperationalNeedTranslation(t *testing.T) {
	translation, err := OperationalNeedTranslation()

	assert.NoError(t, err)
	assert.NotNil(t, translation)

	tMap, err := translation.ToMap()
	assert.NoError(t, err)
	assert.NotNil(t, tMap)

}

func TestOperationalNeedTranslationVerifyFieldsArePopulated(t *testing.T) {
	translation, err := OperationalNeedTranslation()
	assert.NoError(t, err)
	assert.NotNil(t, translation)

	assertTranslationFields(t, translation)

}

func TestOperationalNeedTranslationCoverage(t *testing.T) {
	translation, err := OperationalNeedTranslation()

	assert.NoError(t, err)
	assert.NotNil(t, translation)

	tMap, err := translation.ToMap()
	assert.NoError(t, err)
	assert.NotNil(t, tMap)
	excludedFields := append(taskListStructExcludeFields, "NeedType")

	assertTranslationStructCoverage(t, tMap, models.OperationalNeed{}, excludedFields)
}
