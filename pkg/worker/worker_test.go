package worker

import (
	"bytes"
	"context"
	"testing"
	"time"

	"github.com/99designs/gqlgen/graphql"
	faktory "github.com/contribsys/faktory/client"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"

	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/graph/resolvers"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/userhelpers"
)

// WorkerSuite is the testify suite for the worker package
type WorkerSuite struct {
	suite.Suite
	testConfigs *TestConfigs
}

func (suite *WorkerSuite) stubFetchUserInfo(ctx context.Context, username string) (*models.UserInfo, error) {
	return &models.UserInfo{
		Username:    username,
		FirstName:   username,
		LastName:    "Doe",
		DisplayName: username + " Doe",
		Email:       username + ".doe@local.fake",
	}, nil
}

// SetupTest clears the database between each test
func (suite *WorkerSuite) SetupTest() {
	err := suite.testConfigs.Store.TruncateAllTablesDANGEROUS(suite.testConfigs.Logger)
	assert.NoError(suite.T(), err)

	//GET USER ACCOUNT EACH TIME!
	princ := getTestPrincipal(suite.testConfigs.Store, suite.testConfigs.UserInfo.Username)
	suite.testConfigs.Principal = princ

	// Flush faktory after each test
	client, err := faktory.Open()
	assert.NoError(suite.T(), err)
	err = client.Flush()
	assert.NoError(suite.T(), err)
}

func (suite *WorkerSuite) createModelPlan(planName string) *models.ModelPlan {
	mp, err := resolvers.ModelPlanCreate(context.Background(), suite.testConfigs.Logger, planName, suite.testConfigs.Store, suite.testConfigs.Principal, userhelpers.GetUserInfoAccountInfoWrapperFunc(suite.stubFetchUserInfo))
	suite.NoError(err)
	return mp
}

func (suite *WorkerSuite) createPlanDiscussion(mp *models.ModelPlan, content string) *models.PlanDiscussion {
	input := &model.PlanDiscussionCreateInput{
		ModelPlanID: mp.ID,
		Content:     content,
	}
	pd, err := resolvers.CreatePlanDiscussion(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)
	return pd
}

func (suite *WorkerSuite) createPlanCollaborator(mp *models.ModelPlan, userName string, fullName string, teamRole models.TeamRole, emailAddress string) *models.PlanCollaborator {
	collaboratorInput := &model.PlanCollaboratorCreateInput{
		ModelPlanID: mp.ID,
		UserName:    userName,
		TeamRole:    teamRole,
	}

	collaborator, _, err := resolvers.CreatePlanCollaborator(
		context.Background(),
		suite.testConfigs.Logger,
		nil,
		nil,
		collaboratorInput,
		suite.testConfigs.Principal,
		suite.testConfigs.Store,
		false,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(suite.stubFetchUserInfo),
	)
	suite.NoError(err)
	return collaborator
}

func (suite *WorkerSuite) createPlanCrTdl(mp *models.ModelPlan, idNumber string, dateInitated time.Time, title string, note string) *models.PlanCrTdl {
	input := &model.PlanCrTdlCreateInput{
		ModelPlanID:   mp.ID,
		IDNumber:      idNumber,
		DateInitiated: dateInitated,
		Title:         title,
		Note:          &note,
	}
	crTdl, err := resolvers.PlanCrTdlCreate(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)
	return crTdl
}

func (suite *WorkerSuite) createPlanDocument(mp *models.ModelPlan) *models.PlanDocument {
	reader := bytes.NewReader([]byte("Some test file contents"))

	input := &model.PlanDocumentInput{
		ModelPlanID: mp.ID,
		FileData: graphql.Upload{
			File:        reader,
			Filename:    "sample.docx",
			Size:        reader.Size(),
			ContentType: "application/msword",
		},
		DocumentType: models.DocumentTypeConceptPaper,
	}
	document, err := resolvers.PlanDocumentCreate(suite.testConfigs.Logger, input, suite.testConfigs.Principal, suite.testConfigs.Store, suite.testConfigs.S3Client)
	suite.NoError(err)

	return document
}

func (suite *WorkerSuite) createAnalyzedAuditChange(modelNameChange string,
	modelStatusChanges []string,
	documentCount int,
	crTdlActivity bool,
	updatedSections []string,
	reviewSections []string,
	clearanceSections []string,
	addedLeads []models.AnalyzedModelLeadInfo, discussionActivity bool) *models.AnalyzedAuditChange {

	auditChange := models.AnalyzedAuditChange{
		ModelPlan: &models.AnalyzedModelPlan{
			OldName:       modelNameChange,
			StatusChanges: modelStatusChanges,
		},
		Documents: &models.AnalyzedDocuments{
			Count: documentCount,
		},
		CrTdls: &models.AnalyzedCrTdls{
			Activity: crTdlActivity,
		},
		PlanSections: &models.AnalyzedPlanSections{
			Updated:           updatedSections,
			ReadyForReview:    reviewSections,
			ReadyForClearance: clearanceSections,
		},
		ModelLeads: &models.AnalyzedModelLeads{
			Added: addedLeads,
		},
		PlanDiscussions: &models.AnalyzedPlanDiscussions{
			Activity: discussionActivity,
		},
	}

	return &auditChange
}

func (suite *WorkerSuite) createAnalyzedAudit(mp *models.ModelPlan, date time.Time, changes models.AnalyzedAuditChange) *models.AnalyzedAudit {
	principal := getTestPrincipal(suite.testConfigs.Store, "TEST")
	newAnalyzedAudit, err := models.NewAnalyzedAudit(principal.UserAccount.ID, mp.ID, mp.ModelName, date, changes)
	suite.NoError(err)

	analyzedAudit, err := suite.testConfigs.Store.AnalyzedAuditCreate(suite.testConfigs.Logger, newAnalyzedAudit)
	suite.NoError(err)

	return analyzedAudit
}

// TestWorkerSuite runs the worker test suite
func TestWorkerSuite(t *testing.T) {
	rs := new(WorkerSuite)
	rs.testConfigs = GetDefaultTestConfigs()
	t.Setenv("FAKTORY_URL", "tcp://localhost:7419")
	suite.Run(t, rs)
}
