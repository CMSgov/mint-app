package resolvers

import (
	"context"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
	"github.com/cmsgov/mint-app/pkg/storage/loaders"
)

// PlanPaymentsCreate handles requests to create a Plan Payment
func PlanPaymentsCreate(
	logger *zap.Logger,
	store *storage.Store,
	payments *models.PlanPayments,
) (*models.PlanPayments, error) {

	return store.PlanPaymentsCreate(logger, payments)
}

// PlanPaymentsRead handles requests to find a Plan Payment by ID
func PlanPaymentsRead(
	logger *zap.Logger,
	store *storage.Store,
	id uuid.UUID,
) (*models.PlanPayments, error) {

	return store.PlanPaymentsRead(logger, id)
}

// PlanPaymentsReadByModelPlan handles requests to find a Plan Payment by model plan association
func PlanPaymentsReadByModelPlan(
	logger *zap.Logger,
	store *storage.Store,
	id uuid.UUID,
) (*models.PlanPayments, error) {

	return store.PlanPaymentsReadByModelPlan(logger, id)
}

// PlanPaymentsGetByModelPlanIDLOADER implements resolver logic to get Plan Payments by a model plan ID using a data loader
func PlanPaymentsGetByModelPlanIDLOADER(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanPayments, error) {
	allLoaders := loaders.Loaders(ctx)
	payLoader := allLoaders.PaymentLoader
	key := loaders.NewKeyArgs()
	key.Args["model_plan_id"] = modelPlanID

	thunk := payLoader.Loader.Load(ctx, key)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*models.PlanPayments), nil
}

// PlanPaymentsUpdate handles requests to update a Plan Payment
func PlanPaymentsUpdate(
	logger *zap.Logger,
	store *storage.Store,
	id uuid.UUID,
	changes map[string]interface{},
	principal authentication.Principal,
) (*models.PlanPayments, error) {

	payments, err := store.PlanPaymentsRead(logger, id)
	if err != nil {
		return nil, err
	}

	err = BaseTaskListSectionPreUpdate(logger, payments, changes, principal, store)
	if err != nil {
		return nil, err
	}
	return store.PlanPaymentsUpdate(logger, payments)
}
