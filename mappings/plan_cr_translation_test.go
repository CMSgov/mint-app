package mappings

import (
	_ "embed"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/cmsgov/mint-app/pkg/models"
)

func TestPlanCRTranslation(t *testing.T) {
	translation, err := PlanCRTranslation()

	assert.NoError(t, err)
	assert.NotNil(t, translation)

	tMap, err := translation.ToMap()
	assert.NoError(t, err)
	assert.NotNil(t, tMap)

}

func TestPlanCRTranslationVerifyFieldsArePopulated(t *testing.T) {
	translation, err := PlanCRTranslation()
	assert.NoError(t, err)
	assert.NotNil(t, translation)

	assertTranslationFields(t, translation)

}

func TestPlanCRTranslationCoverage(t *testing.T) {
	assertTranslationStructCoverageGeneric(t, PlanCRTranslation, models.PlanCR{}, taskListStructExcludeFields)
}
