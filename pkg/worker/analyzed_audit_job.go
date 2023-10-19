package worker

import (
	"context"
	"log"
	"time"

	faktory "github.com/contribsys/faktory/client"
	faktory_worker "github.com/contribsys/faktory_worker_go"
	"github.com/google/uuid"
	"github.com/samber/lo"

	"github.com/cmsgov/mint-app/pkg/constants"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
)

/*
######################
# AnalyzedAudit Jobs #
######################
*/

// AnalyzedAuditJob analyzes the given model and model relations on the specified date
// args[0] date, args[1] modelPlanID
func (w *Worker) AnalyzedAuditJob(ctx context.Context, args ...interface{}) error {
	dayToAnalyze, err := time.Parse("2006-01-02", args[0].(string))
	if err != nil {
		return err
	}
	modelPlanID, err := uuid.Parse(args[1].(string))
	if err != nil {
		return err
	}

	mp, err := w.Store.ModelPlanGetByID(w.Logger, modelPlanID)
	if err != nil {
		return err
	}

	audits, err := w.Store.AuditChangeCollectionByPrimaryKeyOrForeignKeyAndDate(w.Logger, mp.ID, mp.ID, dayToAnalyze, models.SortDesc)
	if err != nil {
		return err
	}

	analyzedAuditChange, err := generateChanges(audits, w.Store)
	if err != nil {
		return err
	}

	// Don't create if there are no changes
	if analyzedAuditChange.IsEmpty() {
		return nil
	}

	analyzedAudit, err := models.NewAnalyzedAudit(constants.GetSystemAccountUUID(), mp.ID, mp.ModelName, dayToAnalyze, *analyzedAuditChange)
	if err != nil {
		return err
	}

	_, err = w.Store.AnalyzedAuditCreate(w.Logger, analyzedAudit)

	if err != nil {
		return err
	}
	return nil
}

// AnalyzedAuditBatchJob batches all the daily AnalyzedAuditJobs. When all are complete it will fire a callback
// args[0] date
func (w *Worker) AnalyzedAuditBatchJob(ctx context.Context, args ...interface{}) error {
	dayToAnalyze := args[0]
	modelPlans, err := w.Store.ModelPlanCollection(w.Logger, false)
	if err != nil {
		return err
	}
	helper := faktory_worker.HelperFor(ctx)

	// Create batch of AnalyzedAuditJob jobs
	return helper.With(func(cl *faktory.Client) error {
		batch := faktory.NewBatch(cl)
		batch.Description = "Analyze models audits by date"
		batch.Success = faktory.NewJob("AnalyzedAuditBatchJobSuccess", dayToAnalyze)
		batch.Success.Queue = criticalQueue

		return batch.Jobs(func() error {
			for _, mp := range modelPlans {
				job := faktory.NewJob("AnalyzedAuditJob", dayToAnalyze, mp.ID)
				job.Queue = criticalQueue
				err = batch.Push(job)
				if err != nil {
					return err
				}
			}
			return nil
		})
	})
}

// AnalyzedAuditBatchJobSuccess is the callback function for AnalyzedAuditBatchJob
// args[0] date
func (w *Worker) AnalyzedAuditBatchJobSuccess(ctx context.Context, args ...interface{}) error {
	dateAnalyzed := args[0]
	help := faktory_worker.HelperFor(ctx)

	// Kick off DigestEmailBatchJob
	return help.With(func(cl *faktory.Client) error {
		job := faktory.NewJob("DigestEmailBatchJob", dateAnalyzed)
		job.Queue = criticalQueue
		return cl.Push(job)
	})
}

/*
##############################
# AnalyzedAudit Jobs Helpers #
##############################
*/

// generateChanges gets all the audit changes for the specified tables
func generateChanges(audits []*models.AuditChange, store *storage.Store) (*models.AnalyzedAuditChange, error) {

	modelPlanAudits, err := analyzeModelPlanAudits(audits)
	if err != nil {
		return nil, err
	}

	documentsAudits, err := analyzeDocumentsAudits(audits)
	if err != nil {
		return nil, err
	}

	crTdlAudits, err := analyzeCrTdlAudits(audits)
	if err != nil {
		return nil, err
	}

	modelLeadAudits, err := analyzeModelLeads(audits, store)
	if err != nil {
		return nil, err
	}

	discussionAudits, err := analyzeDiscussionAudits(audits)
	if err != nil {
		return nil, err
	}

	sectionsAudits, err := analyzeSectionsAudits(audits)
	if err != nil {
		return nil, err
	}

	analyzedModelPlan := models.AnalyzedAuditChange{
		ModelPlan:       modelPlanAudits,
		Documents:       documentsAudits,
		CrTdls:          crTdlAudits,
		PlanSections:    sectionsAudits,
		ModelLeads:      modelLeadAudits,
		PlanDiscussions: discussionAudits,
	}

	return &analyzedModelPlan, nil
}

// analyzeModelPlanAudits analyzes all the model plan name changes and status changes
func analyzeModelPlanAudits(audits []*models.AuditChange) (*models.AnalyzedModelPlan, error) {

	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "model_plan"
	})

	nameChangeAudits := lo.Filter(filteredAudits, func(m *models.AuditChange, index int) bool {
		keys := lo.Keys(m.Fields)
		return lo.Contains(keys, "model_name")
	})

	var oldNameAuditField string

	if len(nameChangeAudits) > 0 && nameChangeAudits[0].Fields["model_name"].Old != nil {
		oldNameAuditField = nameChangeAudits[0].Fields["model_name"].Old.(string)
	}

	statuses := []string{
		string(models.ModelStatusPlanComplete),
		string(models.ModelStatusIcipComplete),
		string(models.ModelStatusInternalCmmiClearance),
		string(models.ModelStatusCmsClearance),
		string(models.ModelStatusHhsClearance),
		string(models.ModelStatusOmbAsrfClearance),
		string(models.ModelStatusCleared),
		string(models.ModelStatusAnnounced),
	}

	statusChangeAudits := lo.FilterMap(filteredAudits, func(m *models.AuditChange, index int) (string, bool) {
		keys := lo.Keys(m.Fields)
		if lo.Contains(keys, "status") {
			status := m.Fields["status"].New.(string)
			if lo.Contains(statuses, status) {
				return status, true
			}
		}
		return "", false
	})

	analyzedModelPlan := models.AnalyzedModelPlan{
		OldName:       oldNameAuditField,
		StatusChanges: statusChangeAudits,
	}

	if analyzedModelPlan.IsEmpty() {
		return nil, nil
	}

	return &analyzedModelPlan, nil
}

// analyzeCrTdlAudits analyzes if there were any CrTdl changes
func analyzeCrTdlAudits(audits []*models.AuditChange) (*models.AnalyzedCrTdls, error) {
	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "plan_cr_tdl"
	})

	if len(filteredAudits) > 0 {
		return &models.AnalyzedCrTdls{
			Activity: true,
		}, nil
	}
	return nil, nil
}

// analyzeModelLeads analyzes new collaborators to a model plan
func analyzeModelLeads(audits []*models.AuditChange, store *storage.Store) (*models.AnalyzedModelLeads, error) {
	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "plan_collaborator"
	})
	var parseError error

	addedCollaborators := lo.FilterMap(filteredAudits, func(m *models.AuditChange, index int) (models.AnalyzedModelLeadInfo, bool) {
		keys := lo.Keys(m.Fields)

		log.Printf("Debug: Processing audit entry number %d with keys: %v", index, keys)

		teamRoles, ok := m.Fields["team_roles"].New.([]string)
		if !ok {
			log.Printf("Warning: team_roles is not of type []string in audit entry number %d. It is of type %T", index, m.Fields["team_roles"].New)
			return models.AnalyzedModelLeadInfo{}, false
		}

		if lo.Contains(keys, "user_id") && lo.Contains(keys, "team_roles") && lo.Contains(teamRoles, "MODEL_LEAD") {
			idString := m.Fields["user_id"].New.(string)
			var id uuid.UUID
			id, parseError = uuid.Parse(idString)
			if parseError != nil {
				log.Printf("Error: Failed to parse UUID in audit entry number %d with error: %v", index, parseError)
				return models.AnalyzedModelLeadInfo{}, false
			}

			account, _ := store.UserAccountGetByID(id) //TODO should we handle the error? I think null is ok if can't get the account

			return models.AnalyzedModelLeadInfo{
				ID:         id,
				CommonName: account.CommonName,
			}, true
		}
		return models.AnalyzedModelLeadInfo{}, false
	})
	if parseError != nil {
		return nil, parseError
	}

	if len(addedCollaborators) > 0 {
		return &models.AnalyzedModelLeads{
			Added: addedCollaborators,
		}, nil
	}

	return nil, nil
}

// analyzeDiscussionAudits analyzes if there was discussion activity on a model plan
func analyzeDiscussionAudits(audits []*models.AuditChange) (*models.AnalyzedPlanDiscussions, error) {
	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "plan_discussion"
	})

	if len(filteredAudits) > 0 {
		return &models.AnalyzedPlanDiscussions{
			Activity: true,
		}, nil
	}
	return nil, nil

}

// analyzeDocumentsAudits analyzes how many documents had activity
func analyzeDocumentsAudits(audits []*models.AuditChange) (*models.AnalyzedDocuments, error) {
	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return m.TableName == "plan_document"
	})

	if len(filteredAudits) > 0 {
		return &models.AnalyzedDocuments{
			Count: len(filteredAudits),
		}, nil
	}

	return nil, nil
}

// analyzeSectionsAudits analyzes which sections had updates and status changes to READY_FOR_REVIEW or READY_FOR_CLEARANCE
func analyzeSectionsAudits(audits []*models.AuditChange) (*models.AnalyzedPlanSections, error) {
	sections := []string{
		"plan_basics",
		"plan_general_characteristics",
		"plan_participants_and_providers",
		"plan_beneficiaries",
		"plan_ops_eval_and_learning",
		"plan_payments",
	}
	filteredAudits := lo.Filter(audits, func(m *models.AuditChange, index int) bool {
		return lo.Contains(sections, m.TableName)
	})

	updatedSections := lo.Uniq(lo.Map(filteredAudits, func(m *models.AuditChange, index int) string {
		return m.TableName
	}))

	readyForReview := lo.Uniq(lo.FilterMap(filteredAudits, func(m *models.AuditChange, index int) (string, bool) {
		keys := lo.Keys(m.Fields)
		if lo.Contains(keys, "status") {
			if m.Fields["status"].New.(string) == "READY_FOR_REVIEW" {
				return m.TableName, true
			}
		}
		return "", false
	}))

	readyForClearance := lo.Uniq(lo.FilterMap(filteredAudits, func(m *models.AuditChange, index int) (string, bool) {
		keys := lo.Keys(m.Fields)
		if lo.Contains(keys, "status") {
			if m.Fields["status"].New.(string) == "READY_FOR_CLEARANCE" {
				return m.TableName, true
			}
		}
		return "", false
	}))

	analyzedPlanSections := models.AnalyzedPlanSections{
		Updated:           updatedSections,
		ReadyForReview:    readyForReview,
		ReadyForClearance: readyForClearance,
	}

	if analyzedPlanSections.IsEmpty() {
		return nil, nil
	}

	return &analyzedPlanSections, nil
}
