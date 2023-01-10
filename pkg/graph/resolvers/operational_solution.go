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

// OperationaSolutionsAndPossibleGetByOPNeedID returns operational Solutions and possible Operational Solutions based on a specific operational Need
func OperationaSolutionsAndPossibleGetByOPNeedID(logger *zap.Logger, operationalNeedID uuid.UUID, includeNotNeeded bool, store *storage.Store) ([]*models.OperationalSolution, error) {

	sols, err := store.OperationalSolutionAndPossibleCollectionGetByOperationalNeedID(logger, operationalNeedID, includeNotNeeded)

	return sols, err
}

// OperationaSolutionsAndPossibleGetByOPNeedIDLOADER returns operational Solutions and possible Operational Solutions based on a specific operational Need ID using a Data Loader
func OperationaSolutionsAndPossibleGetByOPNeedIDLOADER(ctx context.Context, operationalNeedID uuid.UUID, includeNotNeeded bool, store *storage.Store) ([]*models.OperationalSolution, error) {
	allLoaders := loaders.Loaders(ctx)
	opSolutionLoader := allLoaders.OperationSolutionLoader

	key := loaders.NewCompoundKey()

	key.Args["include_not_needed"] = includeNotNeeded
	key.Args["operational_need_id"] = operationalNeedID

	thunk := opSolutionLoader.Loader.Load(ctx, key)
	result, err := thunk()

	if err != nil {
		return nil, err
	}
	ret := result.([]*models.OperationalSolution)

	if ret == nil {
		return []*models.OperationalSolution{}, nil //THERE was no result, instantiate empty model
	}
	if len(ret) == 1 {
		if ret[0] == nil {
			return []*models.OperationalSolution{}, nil //THERE was no result, instantiate empty model
		}
	}

	return ret, nil
}

// OperationalSolutionInsertOrUpdate either inserts or updates an operational Solution depending on if it exists or notalready
func OperationalSolutionInsertOrUpdate(logger *zap.Logger, operationNeedID uuid.UUID, solutionType models.OperationalSolutionKey, changes map[string]interface{}, principal authentication.Principal, store *storage.Store) (*models.OperationalSolution, error) {

	existing, err := store.OperationalSolutionGetByOperationNeedIDAndType(logger, operationNeedID, solutionType)
	if err != nil {
		return nil, err
	}
	if existing == nil {
		existing = models.NewOperationalSolution(principal.ID(), operationNeedID)
	}

	err = BaseStructPreUpdate(logger, existing, changes, principal, store, true, false) ///TODO!!! update so we can check if the user has access or not!
	if err != nil {
		return nil, err
	}

	return store.OperationalSolutionInsertOrUpdate(logger, existing, solutionType)

}

// OperationalSolutionInsertOrUpdateCustom either inserts or updates an operational Solution depending on if it exists or notalready
func OperationalSolutionInsertOrUpdateCustom(logger *zap.Logger, operationNeedID uuid.UUID, customSolutionType string, changes map[string]interface{}, principal authentication.Principal, store *storage.Store) (*models.OperationalSolution, error) {

	existing, err := store.OperationalSolutionGetByOperationNeedIDAndOtherType(logger, operationNeedID, customSolutionType)
	if err != nil {
		return nil, err
	}
	if existing == nil {
		existing = models.NewOperationalSolution(principal.ID(), operationNeedID)
	}

	err = BaseStructPreUpdate(logger, existing, changes, principal, store, true, false) ///TODO!!! update so we can check if the user has access or not!
	if err != nil {
		return nil, err
	}

	return store.OperationalSolutionInsertOrUpdateOther(logger, existing, customSolutionType)

}

// OperationalSolutionCustomUpdateByID updates an operational Solution by it's ID
func OperationalSolutionCustomUpdateByID(logger *zap.Logger, id uuid.UUID, customSolutionType *string, changes map[string]interface{}, principal authentication.Principal, store *storage.Store) (*models.OperationalSolution, error) {

	existing, err := store.OperationalSolutionGetByID(logger, id)
	if err != nil {
		return nil, err
	}

	err = BaseStructPreUpdate(logger, existing, changes, principal, store, true, false) ///TODO!!! update so we can check if the user has access or not!
	if err != nil {
		return nil, err
	}
	existing.NameOther = customSolutionType //update the custom solutiopn type

	return store.OperationalSolutionUpdateByID(logger, existing)

}

// OperationalSolutionGetByID returns an operational Solution by it's ID
func OperationalSolutionGetByID(logger *zap.Logger, id uuid.UUID, store *storage.Store) (*models.OperationalSolution, error) {
	return store.OperationalSolutionGetByID(logger, id)
}
