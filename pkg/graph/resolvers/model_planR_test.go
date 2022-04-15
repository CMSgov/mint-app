package resolvers

import (
	"testing"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestModelPlanCreate(t *testing.T) {
	tc := GetDefaultTestConfigs()
	plan := models.ModelPlan{}

	result, err := ModelPlanCreate(tc.Logger, &plan, tc.Store)
	assert.NoError(t, err)
	assert.NotNil(t, result.ID)
}
func TestModelPlanUpdate(t *testing.T) {
	tc := GetDefaultTestConfigs()
	modelName := models.StringPointer("My Test model")

	plan := models.ModelPlan{} //TODO, make this test more meaningful, do we need to do DB seed?
	plan.ID = uuid.MustParse("18624c5b-4c00-49a7-960f-ac6d8b2c58df")
	plan.ModifiedBy = tc.Principal
	plan.CreatedBy = tc.Principal
	plan.ModelName = modelName

	result, err := ModelPlanUpdate(tc.Logger, &plan, tc.Store)

	assert.NoError(t, err)
	assert.NotNil(t, result.ID)
	assert.ElementsMatch(t, modelName, plan.ModelName)
}
func TestModelPlanGetByID(t *testing.T) {
	tc := GetDefaultTestConfigs()

	uuid := uuid.MustParse("18624c5b-4c00-49a7-960f-ac6d8b2c58df")
	//TODO only valid with seeded DB
	result, err := ModelPlanGetByID(tc.Logger, *tc.Principal, uuid, tc.Store)

	assert.NoError(t, err)
	assert.NotNil(t, result.ID)
}
func TestModelPlanCollectionByUser(t *testing.T) {
	tc := GetDefaultTestConfigs()

	//TODO verify

	result, err := ModelPlanCollectionByUser(tc.Logger, *tc.Principal, tc.Store)

	assert.NoError(t, err)
	assert.NotNil(t, result)
}
