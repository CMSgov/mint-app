package worker

import (
	"context"
	"fmt"
	"strconv"

	faktory_worker "github.com/contribsys/faktory_worker_go"

	"github.com/google/uuid"

	"github.com/cms-enterprise/mint-app/pkg/logfields"
	"github.com/cms-enterprise/mint-app/pkg/translatedaudit"
)

// TranslateAuditJob is the job to translate an individual audit into an analyzed audit, and note that the translation is done in the processing table
// args[0] the id of the audit change (int, but float in faktory)
// args[0] the id of the queue (UUID)
func (w *Worker) TranslateAuditJob(ctx context.Context, args ...interface{}) (returnedError error) {
	/*
		// Future Enhancement: the job is wrapped in panic protection when it is registered, BUT it won't update the queue on a panic. If desired we can also defer the panic here, and try to enable the recover on the parent function to update the queue item
		// defer apperrors.RecoverPanicAsErrorFunction(&returnedError)
	*/

	// Note, this will panic if the context doesn't have a faktory job context it will panic.
	helper := faktory_worker.HelperFor(ctx)
	logger := loggerWithFaktoryFieldsWithoutBatchID(w.Logger, helper)

	logger.Info("translating job reached")
	if len(args) < 2 {
		return fmt.Errorf("no arguments were provided for this translateAuditJob")
	}

	arg1String := fmt.Sprint(args[0])
	auditID, err := strconv.Atoi(arg1String)
	if err != nil {
		return fmt.Errorf("unable to convert argument  ( %v )to an int as expected for auditID for the translate audit job. Err %w", args[0], err)
	}

	arg2String := fmt.Sprint(args[1])
	queueID, err := uuid.Parse(arg2String)
	if err != nil {
		return fmt.Errorf("unable to convert argument  ( %v )to an uuid as expected for translated_audit_queue_id for the translate audit job. Err %w", args[1], err)
	}

	logger = logger.With(logfields.AuditChangeID(auditID), logfields.TranslatedAuditQueueID(queueID))

	_, translationErr := translatedaudit.TranslateAuditJobByID(ctx, w.Store, logger, auditID, queueID)
	if translationErr != nil {
		return translationErr
	}

	return returnedError
}
