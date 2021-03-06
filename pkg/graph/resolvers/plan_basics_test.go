package resolvers

import (
	"github.com/cmsgov/mint-app/pkg/models"
)

func (suite *ResolverSuite) TestPlanBasicsGetByModelPlanID() {
	plan := suite.createModelPlan("Plan For Basics") // should create the basics as part of the resolver

	basics, err := PlanBasicsGetByModelPlanID(suite.testConfigs.Logger, &suite.testConfigs.UserInfo.EuaUserID, plan.ID, suite.testConfigs.Store)

	suite.NoError(err)
	suite.EqualValues(plan.ID, basics.ModelPlanID)
	suite.EqualValues(models.TaskReady, basics.Status)
	suite.EqualValues(suite.testConfigs.UserInfo.EuaUserID, basics.CreatedBy)

	// Many of the fields are nil upon creation
	suite.Nil(basics.ModelType)
	suite.Nil(basics.Problem)
	suite.Nil(basics.Goal)
	suite.Nil(basics.TestInterventions)
	suite.Nil(basics.Note)
}

func (suite *ResolverSuite) TestUpdatePlanBasics() {
	plan := suite.createModelPlan("Plan For Basics") // should create the milestones as part of the resolver

	basics, err := PlanBasicsGetByModelPlanID(suite.testConfigs.Logger, &suite.testConfigs.UserInfo.EuaUserID, plan.ID, suite.testConfigs.Store)
	suite.NoError(err)

	changes := map[string]interface{}{
		"modelType": models.MTVoluntary,
		"goal":      "Some goal",
	}
	updater := "UPDT"

	updatedBasics, err := UpdatePlanBasics(suite.testConfigs.Logger, basics.ID, changes, updater, suite.testConfigs.Store)

	suite.NoError(err)
	suite.EqualValues(updater, *updatedBasics.ModifiedBy)
	suite.EqualValues(models.TaskInProgress, updatedBasics.Status)
	suite.EqualValues(models.MTVoluntary, *updatedBasics.ModelType)
	suite.Nil(updatedBasics.Problem)
	suite.EqualValues("Some goal", *updatedBasics.Goal)
	suite.Nil(updatedBasics.TestInterventions)
	suite.Nil(updatedBasics.Note)
}
