package worker

import (
	"context"
	"time"

	faktory "github.com/contribsys/faktory/client"
	faktory_worker "github.com/contribsys/faktory_worker_go"
	"github.com/google/uuid"
	"github.com/samber/lo"

	"github.com/cmsgov/mint-app/pkg/graph/resolvers"
	"github.com/cmsgov/mint-app/pkg/models"
)

func (suite *WorkerSuite) TestAnalyzedAuditJob() {
	worker := &Worker{
		Store:  suite.testConfigs.Store,
		Logger: suite.testConfigs.Logger,
	}
	// Create plan
	plan := suite.createModelPlan("Test Plan")

	// Update Plan
	changes := map[string]interface{}{
		"modelName": "New Name",
		"status":    models.ModelStatusOmbAsrfClearance,
		"archived":  true,
	}
	newPlan, err := resolvers.ModelPlanUpdate(suite.testConfigs.Logger, plan.ID, changes, suite.testConfigs.Principal, suite.testConfigs.Store)
	suite.NoError(err)

	// Add Documents
	suite.createPlanDocument(plan)

	// Add CrTdls
	suite.createPlanCrTdl(plan, "123-456", time.Now().UTC(), "Title", "Note")

	// Add collaborator. Only model leads should be added
	modelLead := suite.createPlanCollaborator(plan, "MINT", "New Model Lead", "MODEL_LEAD", "test@email.com")
	modelLeadAccount, err := suite.testConfigs.Store.UserAccountGetByID(modelLead.UserID)

	suite.NoError(err)
	collaborator := suite.createPlanCollaborator(plan, "COLB", "New Colaborator", "MODEL_TEAM", "test@email.com")
	collaboratorAccount, err := suite.testConfigs.Store.UserAccountGetByID(collaborator.UserID)

	suite.NoError(err)

	// Add Discussion
	suite.createPlanDiscussion(plan, "Test Comment")

	// Add sections
	// plan_basic
	basics, _ := resolvers.PlanBasicsGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)
	// plan_general_characteristic
	genChar, _ := resolvers.PlanGeneralCharacteristicsGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)
	// plan_participants_and_provider
	participant, _ := resolvers.PlanParticipantsAndProvidersGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)
	// plan_beneficiaries
	beneficiary, _ := resolvers.PlanBeneficiariesGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)
	// plan_ops_eval_and_learning
	ops, _ := resolvers.PlanOpsEvalAndLearningGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)
	// plan_payments
	payment, _ := resolvers.PlanPaymentsGetByModelPlanIDLOADER(suite.testConfigs.Context, plan.ID)

	// Update sections for ReadyForClearance
	clearanceChanges := map[string]interface{}{
		"status": "READY_FOR_CLEARANCE",
	}
	_, basicsErr := resolvers.UpdatePlanBasics(worker.Logger, basics.ID, clearanceChanges, suite.testConfigs.Principal, worker.Store)
	suite.NoError(basicsErr)
	_, charErr := resolvers.UpdatePlanGeneralCharacteristics(worker.Logger, genChar.ID, clearanceChanges, suite.testConfigs.Principal, worker.Store)
	suite.NoError(charErr)
	_, partErr := resolvers.PlanParticipantsAndProvidersUpdate(worker.Logger, participant.ID, clearanceChanges, suite.testConfigs.Principal, worker.Store)
	suite.NoError(partErr)

	// Update sections for ReadyForReview
	reviewChanges := map[string]interface{}{
		"status": "READY_FOR_REVIEW",
	}
	_, benErr := resolvers.PlanBeneficiariesUpdate(worker.Logger, beneficiary.ID, reviewChanges, suite.testConfigs.Principal, worker.Store)
	suite.NoError(benErr)
	_, opsErr := resolvers.PlanOpsEvalAndLearningUpdate(worker.Logger, ops.ID, reviewChanges, suite.testConfigs.Principal, worker.Store)
	suite.NoError(opsErr)
	_, paymentErr := resolvers.PlanPaymentsUpdate(worker.Logger, worker.Store, payment.ID, reviewChanges, suite.testConfigs.Principal)
	suite.NoError(paymentErr)

	err = worker.AnalyzedAuditJob(context.Background(), time.Now().UTC().Format("2006-01-02"), plan.ID.String())
	suite.NoError(err)

	// Get Stored audit
	analyzedAudit, err := worker.Store.AnalyzedAuditGetByModelPlanIDAndDate(worker.Logger, plan.ID, time.Now().UTC())
	suite.NoError(err)

	suite.NotNil(analyzedAudit)

	suite.EqualValues(newPlan.ModelName, analyzedAudit.ModelName)

	// ModelPlan Changes
	suite.EqualValues(plan.ModelName, analyzedAudit.Changes.ModelPlan.OldName)
	suite.EqualValues([]string{string(newPlan.Status)}, analyzedAudit.Changes.ModelPlan.StatusChanges)

	// Document Changes
	suite.EqualValues(analyzedAudit.Changes.Documents.Count, 1)

	// CrTdl Activity
	suite.True(analyzedAudit.Changes.CrTdls.Activity)

	// Plan Collaborators. Only model leads should be added. Will be 2, one for the added account, one for the principal
	suite.Len(analyzedAudit.Changes.ModelLeads.Added, 2)
	leadIDs := []uuid.UUID{}
	for _, lead := range analyzedAudit.Changes.ModelLeads.Added {
		leadIDs = append(leadIDs, lead.ID)
	}
	suite.Contains(leadIDs, modelLeadAccount.ID)
	suite.NotContains(leadIDs, collaboratorAccount.ID)

	// Discussions Activity
	suite.True(analyzedAudit.Changes.PlanDiscussions.Activity)

	// Section Changes
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_basics"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_general_characteristics"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_participants_and_providers"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_beneficiaries"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_ops_eval_and_learning"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.Updated, "plan_payments"))

	// ReadyForClearance Sections
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForClearance, "plan_basics"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForClearance, "plan_general_characteristics"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForClearance, "plan_participants_and_providers"))

	// ReadyForReview Sections
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForReview, "plan_beneficiaries"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForReview, "plan_ops_eval_and_learning"))
	suite.True(lo.Contains(analyzedAudit.Changes.PlanSections.ReadyForReview, "plan_payments"))

	// Dont create if there are no changes
	mp := models.NewModelPlan(suite.testConfigs.Principal.UserAccount.ID, "NO CHANGES")

	noChangeMp, err := suite.testConfigs.Store.ModelPlanCreate(suite.testConfigs.Logger, mp)
	suite.NoError(err)
	suite.NotNil(noChangeMp)

	err = worker.AnalyzedAuditJob(context.Background(), time.Now().UTC().Format("2006-01-02"), noChangeMp.ID.String())
	suite.NoError(err)

	_, err = worker.Store.AnalyzedAuditGetByModelPlanIDAndDate(worker.Logger, noChangeMp.ID, time.Now().UTC())
	suite.Error(err)
}

// Faktory integration tests
func (suite *WorkerSuite) TestAnalyzedAuditBatchJobIntegration() {
	worker := &Worker{
		Store:  suite.testConfigs.Store,
		Logger: suite.testConfigs.Logger,
	}

	date := time.Now().UTC().Format("2006-01-02")
	// Create Plans
	mp1 := suite.createModelPlan("Test Plan")
	mp2 := suite.createModelPlan("Test Plan 2")
	modelPlanIds := []string{mp1.ID.String(), mp2.ID.String()}

	pool, err := faktory.NewPool(10)
	suite.NoError(err)
	perf := faktory_worker.NewTestExecutor(pool)

	// Test when AnalyzedAuditBatchJob runs it enqueues
	// the correct number of AnalyzedAuditJobs (1 job per plan (2))
	cronJob := faktory.NewJob("AnalyzedAuditBatchJob", date)
	cronJob.Queue = criticalQueue

	err = perf.Execute(cronJob, worker.AnalyzedAuditBatchJob)
	suite.NoError(err)

	err = pool.With(func(cl *faktory.Client) error {
		queues, err2 := cl.QueueSizes()
		suite.NoError(err2)
		suite.True(queues[criticalQueue] == 2)

		// Check jobs arguments equal are corrrect modelPlanId and date
		job1, err2 := cl.Fetch(criticalQueue)

		// Get Batch ID
		batchID := job1.Custom["bid"].(string)

		suite.NoError(err2)
		suite.Equal(criticalQueue, job1.Queue)
		suite.Equal(date, job1.Args[0].(string))
		suite.True(lo.Contains(modelPlanIds, job1.Args[1].(string)))

		job2, err2 := cl.Fetch(criticalQueue)
		suite.NoError(err2)
		suite.Equal(criticalQueue, job2.Queue)
		suite.Equal(date, job2.Args[0].(string))
		suite.True(lo.Contains(modelPlanIds, job2.Args[1].(string)))

		// Check Batch Job
		batchStatusPending, err2 := cl.BatchStatus(batchID)
		suite.NoError(err2)
		// pending
		suite.Equal("", batchStatusPending.CompleteState)
		// complete jobs
		err = cl.Ack(job1.Jid)
		suite.NoError(err2)
		err = cl.Ack(job2.Jid)
		suite.NoError(err2)

		// Check callback
		batchStatusComplete, err2 := cl.BatchStatus(batchID)
		suite.NoError(err2)
		suite.Equal("2", batchStatusComplete.CompleteState)

		callbackJob, err2 := cl.Fetch(criticalQueue)
		suite.NoError(err2)
		suite.Equal("AnalyzedAuditBatchJobSuccess", callbackJob.Type)

		// AnalyzedAuditBatchJobSuccess should enquueue DigestEmailBatchJob
		pool, err2 := faktory.NewPool(5)
		suite.NoError(err2)
		perf := faktory_worker.NewTestExecutor(pool)
		err = perf.Execute(callbackJob, worker.AnalyzedAuditBatchJobSuccess)
		suite.NoError(err2)
		err = cl.Ack(callbackJob.Jid)
		suite.NoError(err2)

		emailBatchJob, err2 := cl.Fetch(criticalQueue)
		suite.NoError(err2)
		suite.Equal("DigestEmailBatchJob", emailBatchJob.Type)

		return err2
	})

	suite.NoError(err)
}

func (suite *WorkerSuite) TestAnalyzedAuditJobIntegration() {
	worker := &Worker{
		Store:  suite.testConfigs.Store,
		Logger: suite.testConfigs.Logger,
	}

	date := time.Now().UTC().Format("2006-01-02")
	// Create Plan
	mp1 := suite.createModelPlan("Test Plan")

	pool, err := faktory.NewPool(5)

	// Test when AnalyzedAuditJob runs it enqueues
	// the with the correct args
	job := faktory.NewJob("AnalyzedAuditJob", date, mp1.ID)
	job.Queue = criticalQueue

	err = pool.With(func(cl *faktory.Client) error {
		err2 := cl.Push(job)
		suite.NoError(err2)

		queues, err2 := cl.QueueSizes()
		suite.NoError(err2)
		suite.True(queues[criticalQueue] == 1)

		// Check jobs arguments equal are corrrect modelPlanId and date
		job1, err2 := cl.Fetch(criticalQueue)

		suite.NoError(err2)
		suite.Equal(criticalQueue, job1.Queue)
		suite.Equal(date, job1.Args[0].(string))
		suite.Equal(mp1.ID.String(), job1.Args[1].(string))

		// Test job run
		pool, err2 := faktory.NewPool(5)
		suite.NoError(err2)
		perf := faktory_worker.NewTestExecutor(pool)

		err = perf.Execute(job1, worker.AnalyzedAuditJob)
		suite.NoError(err2)

		return err2
	})
	suite.NoError(err)

	analyzedAudit, err := suite.testConfigs.Store.AnalyzedAuditGetByModelPlanIDAndDate(suite.testConfigs.Logger, mp1.ID, time.Now().UTC())
	suite.NoError(err)

	suite.NotEmpty(analyzedAudit)
}
