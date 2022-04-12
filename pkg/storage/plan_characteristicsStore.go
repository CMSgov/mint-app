package storage

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/apperrors"
	"github.com/cmsgov/mint-app/pkg/models"

	_ "embed"
)

//go:embed SQL/plan_characteristics_create.sql
var plan_characteristics_createSQL string

//go:embed SQL/plan_characteristics_get_by_plan_id.sql
var plan_characteristics_get_by_plan_idSQL string

func (s *Store) PlanCharacteristicsGetByModelID(ctx context.Context, planId uuid.UUID) (*models.PlanCharacteristics, error) {
	char := models.PlanCharacteristics{}
	stmt, err := s.db.PrepareNamed(plan_characteristics_get_by_plan_idSQL)
	if err != nil {
		return nil, err
	}
	arg := map[string]interface{}{"planId": planId}

	err = stmt.Get(&char, arg)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			appcontext.ZLogger(ctx).Info(
				"No model plan found",
				zap.Error(err),
				zap.String("planId", planId.String()),
			)
			return nil, &apperrors.ResourceNotFoundError{Err: err, Resource: models.ModelPlan{}}
		}
		appcontext.ZLogger(ctx).Error(
			"Failed to fetch model plan",
			zap.Error(err),
			zap.String("planId", planId.String()),
		)
		return nil, &apperrors.QueryError{
			Err:       err,
			Model:     planId,
			Operation: apperrors.QueryFetch,
		}
	}

	return &char, nil

}

func (s *Store) PlanCharacteristicsCreate(ctx context.Context, char *models.PlanCharacteristics) (*models.PlanCharacteristics, error) {

	if char.ID == uuid.Nil {
		char.ID = uuid.New()
	}
	stmt, err := s.db.PrepareNamed(plan_characteristics_createSQL)
	if err != nil {
		appcontext.ZLogger(ctx).Error(
			fmt.Sprintf("Failed to create model plan with error %s", err),
			// zap.String("user", *plan.ModifiedBy), //TODO handle
		)
		return nil, err
	}
	retChar := models.PlanCharacteristics{}

	err = stmt.Get(&retChar, char)
	if err != nil {
		appcontext.ZLogger(ctx).Error(
			fmt.Sprintf("Failed to create model plan with error %s", err),
			// zap.String("user", *plan.ModifiedBy), //TODO handle
		)
		return nil, err

	}

	return &retChar, nil
}
