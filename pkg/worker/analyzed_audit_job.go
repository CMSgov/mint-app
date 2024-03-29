package worker

import (
	"context"
	"time"

	faktory "github.com/contribsys/faktory/client"
	faktory_worker "github.com/contribsys/faktory_worker_go"
	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/graph/resolvers"
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
	_, err = resolvers.AnalyzeModelPlanForAnalyzedAudit(ctx, w.Store, w.Logger, dayToAnalyze, modelPlanID)

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
