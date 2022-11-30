package resolvers

import (
	"time"

	"github.com/cmsgov/mint-app/pkg/models"
)

func (suite *ResolverSuite) TestPlanBasicsGetByModelPlanID() {
	plan := suite.createModelPlan("Plan For Basics") // should create the basics as part of the resolver

	basics, err := PlanBasicsGetByModelPlanID(suite.testConfigs.Logger, plan.ID, suite.testConfigs.Store)

	suite.NoError(err)
	suite.EqualValues(plan.ID, basics.ModelPlanID)
	suite.EqualValues(models.TaskReady, basics.Status)
	suite.EqualValues(suite.testConfigs.UserInfo.EuaUserID, basics.CreatedBy)

	// Many of the fields are nil upon creation
	suite.Nil(basics.ModelType)
	suite.Nil(basics.Problem)
	suite.Nil(basics.Goal)
	suite.Nil(basics.ModelCategory)
	suite.Nil(basics.CMSCenters)
	suite.Nil(basics.CMSOther)
	suite.Nil(basics.CMMIGroups)
	suite.Nil(basics.TestInterventions)
	suite.Nil(basics.Note)
	suite.Nil(basics.CompleteICIP)
	suite.Nil(basics.ClearanceStarts)
	suite.Nil(basics.ClearanceEnds)
	suite.Nil(basics.Announced)
	suite.Nil(basics.ApplicationsStart)
	suite.Nil(basics.ApplicationsEnd)
	suite.Nil(basics.PerformancePeriodStarts)
	suite.Nil(basics.PerformancePeriodEnds)
	suite.Nil(basics.WrapUpEnds)
	suite.Nil(basics.HighLevelNote)
	suite.Nil(basics.PhasedIn)
	suite.Nil(basics.PhasedInNote)
}

func (suite *ResolverSuite) TestUpdatePlanBasics() {
	plan := suite.createModelPlan("Plan For Basics") // should create the milestones as part of the resolver

	basics, err := PlanBasicsGetByModelPlanID(suite.testConfigs.Logger, plan.ID, suite.testConfigs.Store)
	suite.NoError(err)

	changes := map[string]interface{}{
		"modelType":     models.MTVoluntary,
		"goal":          "Some goal",
		"cmsCenters":    []string{"CMMI", "OTHER"},
		"cmsOther":      "SOME OTHER CMS CENTER",
		"cmmiGroups":    []string{"PATIENT_CARE_MODELS_GROUP", "SEAMLESS_CARE_MODELS_GROUP"},
		"completeICIP":  "2020-05-13T20:47:50.12Z",
		"phasedIn":      true,
		"highLevelNote": "Some high level note",
	}

	updatedBasics, err := UpdatePlanBasics(suite.testConfigs.Logger, basics.ID, changes, suite.testConfigs.Principal, suite.testConfigs.Store)

	suite.NoError(err)
	suite.EqualValues(suite.testConfigs.Principal.Username, *updatedBasics.ModifiedBy)
	suite.EqualValues(models.TaskInProgress, updatedBasics.Status)
	suite.EqualValues(models.MTVoluntary, *updatedBasics.ModelType)
	suite.Nil(updatedBasics.Problem)
	suite.EqualValues("Some goal", *updatedBasics.Goal)
	suite.EqualValues(changes["cmsCenters"], updatedBasics.CMSCenters)
	suite.EqualValues(changes["cmsOther"], *updatedBasics.CMSOther)
	suite.EqualValues(changes["cmmiGroups"], updatedBasics.CMMIGroups)
	suite.WithinDuration(time.Date(2020, 5, 13, 20, 47, 50, 120000000, time.UTC), *updatedBasics.CompleteICIP, 0)
	suite.EqualValues(changes["highLevelNote"], *updatedBasics.HighLevelNote)
	suite.EqualValues(changes["phasedIn"], *updatedBasics.PhasedIn)
	suite.Nil(updatedBasics.TestInterventions)
	suite.Nil(updatedBasics.Note)
}
