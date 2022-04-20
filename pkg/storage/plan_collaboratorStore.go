package storage

import (
	"database/sql"
	_ "embed"
	"errors"

	"github.com/cmsgov/mint-app/pkg/models"
	utilityUuid "github.com/cmsgov/mint-app/pkg/shared/utility_uuid"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

//go:embed SQL/plan_collaborator_create.sql
var planCollaboratorCreateSQL string

//go:embed SQL/plan_collaborator_update.sql
var planCollaboratorUpdateSQL string

//go:embed SQL/plan_collaborator_delete.sql
var planCollaboratorDeleteSQL string

//go:embed SQL/plan_collaborator_fetch_by_model_plan_id.sql
var planCollaboratorFetchByModelPlanIDSQL string

func (s *Store) PlanCollaboratorCreate(logger *zap.Logger, collaborator *models.PlanCollaborator) (*models.PlanCollaborator, error) {

	collaborator.ID = utilityUuid.ValueOrNewUUID(collaborator.ID)

	statement, err := s.db.PrepareNamed(planCollaboratorCreateSQL)
	if err != nil {
		return nil, err
	}

	err = statement.Get(collaborator, collaborator)
	if err != nil {
		return nil, err
	}

	return collaborator, nil
}

func (s *Store) PlanCollaboratorUpdate(logger *zap.Logger, collaborator *models.PlanCollaborator) (*models.PlanCollaborator, error) {
	statement, err := s.db.PrepareNamed(planCollaboratorUpdateSQL)
	if err != nil {
		return nil, err
	}

	err = statement.Get(collaborator, collaborator)
	if err != nil {
		return nil, err
	}

	return collaborator, nil
}

func (s *Store) PlanCollaboratorDelete(logger *zap.Logger, collaborator *models.PlanCollaborator) (*models.PlanCollaborator, error) {
	statement, err := s.db.PrepareNamed(planCollaboratorDeleteSQL)
	if err != nil {
		return nil, err
	}

	err = statement.Get(collaborator, collaborator)
	if err != nil {
		return nil, err
	}

	return collaborator, nil
}

func (s *Store) PlanCollaboratorsByModelPlanID(logger *zap.Logger, modelPlanID uuid.UUID) ([]*models.PlanCollaborator, error) {
	collaborators := []*models.PlanCollaborator{}

	statement, err := s.db.PrepareNamed(planCollaboratorFetchByModelPlanIDSQL)
	if err != nil {
		return nil, err
	}

	arg := map[string]interface{}{
		"model_plan_id": modelPlanID,
	}

	err = statement.Select(&collaborators, arg)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return collaborators, nil
		}

		return nil, err
	}

	return collaborators, nil
}
