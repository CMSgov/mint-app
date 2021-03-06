package storage

import (
	_ "embed"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/utilitySQL"
	"github.com/cmsgov/mint-app/pkg/shared/utilityUUID"
	"github.com/cmsgov/mint-app/pkg/storage/genericmodel"
)

//go:embed SQL/plan_beneficiaries_create.sql
var planBeneficiariesCreateSQL string

//go:embed SQL/plan_beneficiaries_update.sql
var planBeneficiariesUpdateSQL string

//go:embed SQL/plan_beneficiaries_get_by_id.sql
var planBeneficiariesGetByIDSQL string

//go:embed SQL/plan_beneficiaries_get_by_model_plan_id.sql
var planBeneficiariesGetByModelPlanIDSQL string

// PlanBeneficiariesCreate creates a new plan benficiaries object
func (s *Store) PlanBeneficiariesCreate(logger *zap.Logger, b *models.PlanBeneficiaries) (*models.PlanBeneficiaries, error) {
	b.ID = utilityUUID.ValueOrNewUUID(b.ID)

	statement, err := s.db.PrepareNamed(planBeneficiariesCreateSQL)
	if err != nil {
		return nil, genericmodel.HandleModelCreationError(logger, err, b)
	}

	b.ModifiedBy = nil
	b.ModifiedDts = nil
	err = statement.Get(b, b)
	if err != nil {
		return nil, genericmodel.HandleModelCreationError(logger, err, b)
	}

	return b, nil
}

// PlanBeneficiariesUpdate updates the plan general characteristics for a given id
func (s *Store) PlanBeneficiariesUpdate(logger *zap.Logger, b *models.PlanBeneficiaries) (*models.PlanBeneficiaries, error) {
	statement, err := s.db.PrepareNamed(planBeneficiariesUpdateSQL)
	if err != nil {
		return nil, genericmodel.HandleModelUpdateError(logger, err, b)
	}

	err = statement.Get(b, b)
	if err != nil {
		return nil, genericmodel.HandleModelQueryError(logger, err, b)
	}

	return b, nil
}

// PlanBeneficiariesGetByID returns the plan general characteristics for a given id
func (s *Store) PlanBeneficiariesGetByID(logger *zap.Logger, id uuid.UUID) (*models.PlanBeneficiaries, error) {
	b := models.PlanBeneficiaries{}

	statement, err := s.db.PrepareNamed(planBeneficiariesGetByIDSQL)
	if err != nil {
		return nil, err
	}

	err = statement.Get(&b, utilitySQL.CreateIDQueryMap(id))

	if err != nil {
		return nil, err
	}

	return &b, nil
}

// PlanBeneficiariesGetByModelPlanID returns the plan general characteristics for a given model plan id
func (s *Store) PlanBeneficiariesGetByModelPlanID(logger *zap.Logger, principal string, modelPlanID uuid.UUID) (*models.PlanBeneficiaries, error) {
	b := models.PlanBeneficiaries{}

	statement, err := s.db.PrepareNamed(planBeneficiariesGetByModelPlanIDSQL)
	if err != nil {
		return nil, err
	}

	err = statement.Get(&b, utilitySQL.CreateModelPlanIDQueryMap(modelPlanID))

	if err != nil {
		return nil, err
	}

	return &b, nil
}
