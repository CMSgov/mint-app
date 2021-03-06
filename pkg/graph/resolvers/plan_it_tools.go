package resolvers

import (
	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
)

//PlanITToolsUpdate updates a plan ITTools buisness object
func PlanITToolsUpdate(logger *zap.Logger, id uuid.UUID, changes map[string]interface{}, principal string, store *storage.Store) (*models.PlanITTools, error) {
	//Get existing plan ITTools
	existingITTools, err := store.PlanITToolsGetByID(logger, id)
	if err != nil {
		return nil, err
	}
	err = ApplyChanges(changes, existingITTools)
	if err != nil {
		return nil, err
	}
	existingITTools.ModifiedBy = &principal
	err = existingITTools.CalcStatus()
	if err != nil {
		return nil, err
	}

	retITTools, err := store.PlanITToolsUpdate(logger, existingITTools)
	return retITTools, err

}

// PlanITToolsGetByModelPlanID returns a plan ITTools buisness object associated with a model plan
func PlanITToolsGetByModelPlanID(logger *zap.Logger, modelPlanID uuid.UUID, store *storage.Store) (*models.PlanITTools, error) {
	it, err := store.PlanITToolsGetByModelPlanID(logger, modelPlanID)
	if err != nil {
		return nil, err
	}
	return it, err

}
