package resolvers

import (
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/shared/pubsub"

	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// CreatePlanCollaborator implements resolver logic to create a plan collaborator
func CreatePlanCollaborator(logger *zap.Logger, input *model.PlanCollaboratorCreateInput, principal string, store *storage.Store, pubsub *pubsub.PubSub) (*models.PlanCollaborator, error) {
	collaborator := &models.PlanCollaborator{
		ModelPlanID: input.ModelPlanID,
		FullName:    input.FullName,
		TeamRole:    input.TeamRole,
		EUAUserID:   input.EuaUserID,
		CreatedBy:   principal,
	}

	retCollaborator, err := store.PlanCollaboratorCreate(logger, collaborator)
	if err != nil {
		return retCollaborator, err
	}

	return retCollaborator, err
}

// UpdatePlanCollaborator implements resolver logic to update a plan collaborator
func UpdatePlanCollaborator(logger *zap.Logger, id uuid.UUID, newRole models.TeamRole, principal string, store *storage.Store, pubsub *pubsub.PubSub) (*models.PlanCollaborator, error) {
	// Get existing collaborator
	existingCollaborator, err := store.PlanCollaboratorFetchByID(id)
	if err != nil {
		return nil, err
	}

	if existingCollaborator == nil {
		return nil, fmt.Errorf("attempted to update but cannot find plan collaborator [%v]", principal)
	}

	existingCollaborator.ModifiedBy = &principal
	existingCollaborator.TeamRole = newRole

	return store.PlanCollaboratorUpdate(logger, existingCollaborator)
}

// DeletePlanCollaborator implements resolver logic to delete a plan collaborator
func DeletePlanCollaborator(logger *zap.Logger, id uuid.UUID, principal string, store *storage.Store, pubsub *pubsub.PubSub) (*models.PlanCollaborator, error) {
	retCollaborator, err := store.PlanCollaboratorDelete(logger, id)

	return retCollaborator, err
}

// FetchCollaboratorsByModelPlanID implements resolver logic to fetch a list of plan collaborators by a model plan ID
func FetchCollaboratorsByModelPlanID(logger *zap.Logger, _ *string, modelPlanID uuid.UUID, store *storage.Store) ([]*models.PlanCollaborator, error) {
	// TODO Do something with principal??

	collaborators, err := store.PlanCollaboratorsByModelPlanID(logger, modelPlanID)
	return collaborators, err
}

// FetchCollaboratorByID implements resolver logic to fetch a plan collaborator by ID
func FetchCollaboratorByID(logger *zap.Logger, id uuid.UUID, store *storage.Store) (*models.PlanCollaborator, error) {
	collaborator, err := store.PlanCollaboratorFetchByID(id)
	return collaborator, err
}
