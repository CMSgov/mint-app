package resolvers

import (
	"context"
	"testing"
	"time"

	"github.com/cmsgov/mint-app/pkg/email"
	"github.com/cmsgov/mint-app/pkg/userhelpers"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"

	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/oddmail"
)

// ResolverSuite is the testify suite for the resolver package
type ResolverSuite struct {
	suite.Suite
	testConfigs *TestConfigs
}

// SetupTest clears the database between each test
func (suite *ResolverSuite) SetupTest() {
	err := suite.testConfigs.Store.TruncateAllTablesDANGEROUS(suite.testConfigs.Logger)

	//GET USER ACCOUNT EACH TIME!
	princ := getTestPrincipal(suite.testConfigs.Store, suite.testConfigs.UserInfo.EuaUserID)
	suite.testConfigs.Principal = princ
	assert.NoError(suite.T(), err)
}

func (suite *ResolverSuite) stubFetchUserInfo(ctx context.Context, username string) (*models.UserInfo, error) {
	return &models.UserInfo{
		EuaUserID:  username,
		FirstName:  username,
		LastName:   "Doe",
		CommonName: username + " Doe",
		Email:      models.NewEmailAddress(username + ".doe@local.fake"),
	}, nil
}

func (suite *ResolverSuite) createModelPlan(planName string) *models.ModelPlan {
	mp, err := ModelPlanCreate(
		context.Background(),
		suite.testConfigs.Logger,
		nil,
		nil,
		email.AddressBook{},
		planName,
		suite.testConfigs.Store,
		suite.testConfigs.Principal,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(suite.stubFetchUserInfo),
	)
	suite.NoError(err)
	return mp
}

func (suite *ResolverSuite) createPlanDiscussion(mp *models.ModelPlan, content string) *models.PlanDiscussion {
	input := &model.PlanDiscussionCreateInput{
		ModelPlanID: mp.ID,
		Content:     content,
	}
	pd, err := CreatePlanDiscussion(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)
	return pd
}

func (suite *ResolverSuite) createDiscussionReply(pd *models.PlanDiscussion, content string, resolution bool) *models.DiscussionReply {
	input := &model.DiscussionReplyCreateInput{
		DiscussionID: pd.ID,
		Content:      content,
		Resolution:   resolution,
	}
	dr, err := CreateDiscussionReply(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)
	return dr
}

func (suite *ResolverSuite) createPlanCollaborator(mp *models.ModelPlan, userName string, teamRole models.TeamRole) *models.PlanCollaborator {
	collaboratorInput := &model.PlanCollaboratorCreateInput{
		ModelPlanID: mp.ID,
		UserName:    userName,
		TeamRole:    teamRole,
	}

	mockController := gomock.NewController(suite.T())
	mockEmailService := oddmail.NewMockEmailService(mockController)
	mockEmailTemplateService := email.NewMockTemplateService(mockController)

	addressBook := email.AddressBook{
		DefaultSender: "unit-test-execution@mint.cms.gov",
	}

	emailServiceConfig := &oddmail.GoSimpleMailServiceConfig{
		ClientAddress: "http://localhost:3005",
	}

	mockEmailService.
		EXPECT().
		GetConfig().
		Return(emailServiceConfig).
		AnyTimes()

	testTemplate, expectedSubject, expectedBody := createAddedAsCollaboratorTemplateCacheHelper(mp.ModelName, mp)
	mockEmailTemplateService.
		EXPECT().
		GetEmailTemplate(gomock.Eq(email.AddedAsCollaboratorTemplateName)).
		Return(testTemplate, nil).
		AnyTimes()

	mockEmailService.
		EXPECT().
		Send(
			gomock.Any(),
			gomock.Eq([]string{collaboratorInput.UserName + ".doe@local.fake"}), //this comes from the stub user info function
			gomock.Any(),
			gomock.Eq(expectedSubject),
			gomock.Any(),
			gomock.Eq(expectedBody),
		).
		AnyTimes()

	collaborator, _, err := CreatePlanCollaborator(
		context.Background(),
		suite.testConfigs.Logger,
		mockEmailService,
		mockEmailTemplateService,
		addressBook,
		collaboratorInput,
		suite.testConfigs.Principal,
		suite.testConfigs.Store,
		false,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(suite.stubFetchUserInfo),
	)
	suite.NoError(err)
	return collaborator
}

func (suite *ResolverSuite) createPlanCrTdl(mp *models.ModelPlan, idNumber string, dateInitated time.Time, title string, note string) *models.PlanCrTdl {
	input := &model.PlanCrTdlCreateInput{
		ModelPlanID:   mp.ID,
		IDNumber:      idNumber,
		DateInitiated: dateInitated,
		Title:         title,
		Note:          &note,
	}
	crTdl, err := PlanCrTdlCreate(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)
	return crTdl
}

func (suite *ResolverSuite) createOperationalSolution() *models.OperationalSolution {
	planName := "Plan For Milestones"
	plan := suite.createModelPlan(planName)
	needType := models.OpNKManageCd

	need, err := suite.testConfigs.Store.OperationalNeedGetByModelPlanIDAndType(suite.testConfigs.Logger, plan.ID, needType)
	suite.NoError(err)
	operationalSolution, _ := OperationalSolutionInsertOrUpdateCustom(
		suite.testConfigs.Logger,
		need.ID,
		"AnotherSolution",
		nil,
		suite.testConfigs.Principal,
		suite.testConfigs.Store,
	)

	return operationalSolution
}

func (suite *ResolverSuite) createOperationalSolutionSubtask() *models.OperationalSolutionSubtask {
	operationalSolution := suite.createOperationalSolution()

	return suite.createOperationalSolutionSubtaskWithSolution(operationalSolution)
}

func (suite *ResolverSuite) createOperationalSolutionSubtaskWithSolution(
	operationalSolution *models.OperationalSolution) *models.OperationalSolutionSubtask {
	inputs := []*model.CreateOperationalSolutionSubtaskInput{{
		Name:   "Test Operational Solution Input",
		Status: models.OperationalSolutionSubtaskStatusTodo,
	}}

	return suite.createOperationalSolutionSubtasksWithSolution(operationalSolution, inputs)[0]
}

func (suite *ResolverSuite) createMultipleOperationSolutionSubtasks() []*models.OperationalSolutionSubtask {
	operationalSolution := suite.createOperationalSolution()

	createOperationalSolutionInput := []*model.CreateOperationalSolutionSubtaskInput{
		{
			Name:   "Subtask A",
			Status: models.OperationalSolutionSubtaskStatusTodo,
		},
		{
			Name:   "Subtask B",
			Status: models.OperationalSolutionSubtaskStatusInProgress,
		},
	}

	subtasks := suite.createOperationalSolutionSubtasksWithSolution(
		operationalSolution,
		createOperationalSolutionInput,
	)
	return subtasks
}

func (suite *ResolverSuite) createOperationalSolutionSubtasksWithSolution(
	operationalSolution *models.OperationalSolution,
	inputs []*model.CreateOperationalSolutionSubtaskInput) []*models.OperationalSolutionSubtask {
	subtasks, err := OperationalSolutionSubtasksCreate(
		suite.testConfigs.Logger,
		suite.testConfigs.Store,
		inputs,
		operationalSolution.ID,
		suite.testConfigs.Principal)
	suite.NoError(err)
	suite.NotNil(subtasks)
	suite.Len(subtasks, len(inputs))
	return subtasks
}

func (suite *ResolverSuite) convertOperationalSubtasksToUpdateInputs(
	subtasks []*models.OperationalSolutionSubtask) []*model.UpdateOperationalSolutionSubtaskInput {
	var updateInputs []*model.UpdateOperationalSolutionSubtaskInput
	for _, subtask := range subtasks {
		updateInputs = append(
			updateInputs,
			&model.UpdateOperationalSolutionSubtaskInput{
				ID: subtask.ID,
				Changes: map[string]interface{}{
					"name":   subtask.Name,
					"status": subtask.Status,
				},
			},
		)
	}
	return updateInputs
}

// TestResolverSuite runs the resolver test suite
func TestResolverSuite(t *testing.T) {
	rs := new(ResolverSuite)
	rs.testConfigs = GetDefaultTestConfigs()
	suite.Run(t, rs)
}

// func (suite *ResolverSuite) HandleStats(suiteName string, stats *suite.SuiteInformation) {
// 	// suite.T().Log("Writing Statistics")
// 	// suite.T().Log(stats)
// }
