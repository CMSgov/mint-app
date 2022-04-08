package storage

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/models"

	_ "embed"
)

//go:embed SQL/plan_characteristics_create.sql
var plan_characteristics_createSQL string

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
