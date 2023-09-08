package storage

import (
	_ "embed"
	"fmt"

	"github.com/cmsgov/mint-app/pkg/shared/utilitySQL"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/utilityUUID"
)

//go:embed SQL/plan_collaborator/create.sql
var planCollaboratorCreateSQL string

//go:embed SQL/plan_collaborator/update.sql
var planCollaboratorUpdateSQL string

//go:embed SQL/plan_collaborator/delete.sql
var planCollaboratorDeleteSQL string

//go:embed SQL/plan_collaborator/fetch_by_id.sql
var planCollaboratorFetchByIDSQL string

//go:embed SQL/plan_collaborator/get_by_model_plan_id_LOADER.sql
var planCollaboratorGetByModelPlanIDLoaderSQL string

// PlanCollaboratorGetByModelPlanIDLOADER returns the plan GeneralCharacteristics for a slice of model plan ids
func (s *Store) PlanCollaboratorGetByModelPlanIDLOADER(
	logger *zap.Logger,
	paramTableJSON string,
) ([]*models.PlanCollaborator, error) {

	var collabSlice []*models.PlanCollaborator
	arg := map[string]interface{}{
		"paramTableJSON": paramTableJSON,
	}

	// This returns more than one
	err := s.db.Select(&collabSlice, planCollaboratorGetByModelPlanIDLoaderSQL, arg)
	if err != nil {
		return nil, err
	}

	return collabSlice, nil
}

// PlanCollaboratorCreate creates a new plan collaborator
func (s *Store) PlanCollaboratorCreate(
	_ *zap.Logger,
	collaborator *models.PlanCollaborator,
) (*models.PlanCollaborator, error) {

	collaborator.ID = utilityUUID.ValueOrNewUUID(collaborator.ID)
	collaborator.ModifiedBy = nil
	collaborator.ModifiedDts = nil

	err := s.db.Get(collaborator, planCollaboratorCreateSQL, collaborator)
	if err != nil {
		return nil, err
	}

	return collaborator, nil
}

// PlanCollaboratorUpdate updates the plan collaborator for a given id
func (s *Store) PlanCollaboratorUpdate(
	_ *zap.Logger,
	collaborator *models.PlanCollaborator,
) (*models.PlanCollaborator, error) {

	err := s.db.Get(collaborator, planCollaboratorUpdateSQL, collaborator)
	if err != nil {
		return nil, err
	}

	return collaborator, nil
}

// PlanCollaboratorDelete deletes the plan collaborator for a given id
func (s *Store) PlanCollaboratorDelete(_ *zap.Logger, id uuid.UUID, userID uuid.UUID) (*models.PlanCollaborator, error) {
	tx := s.db.MustBegin()
	defer tx.Rollback()
	err := setCurrentSessionUserVariable(tx, userID)
	if err != nil {
		return nil, err
	}

	statement, err := tx.PrepareNamed(planCollaboratorDeleteSQL)
	if err != nil {
		return nil, err
	}

	collaborator := &models.PlanCollaborator{}
	err = statement.Get(collaborator, utilitySQL.CreateIDQueryMap(id))
	if err != nil {
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		return nil, fmt.Errorf("could not commit collaborator delete transaction: %w", err)
	}

	return collaborator, nil
}

// PlanCollaboratorFetchByID returns a plan collaborator for a given database ID, or nil if none found
func (s *Store) PlanCollaboratorFetchByID(id uuid.UUID) (*models.PlanCollaborator, error) {

	var collaborator models.PlanCollaborator
	err := s.db.Get(&collaborator, planCollaboratorFetchByIDSQL, utilitySQL.CreateIDQueryMap(id))
	if err != nil {
		return nil, err
	}

	return &collaborator, nil
}
