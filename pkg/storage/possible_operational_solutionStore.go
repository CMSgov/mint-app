package storage

import (
	"go.uber.org/zap"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/models"

	_ "embed"
)

//go:embed SQL/possible_operational_solution_collection_get_by_need_type.sql
var possibleOperationalSolutionCollectionByNeedTypeSQL string

//go:embed SQL/possible_operational_solution_collection_get_by_operational_need_id.sql
var possibleOperationalSolutionCollectionByOperationalNeedIDSQL string

// PossibleOperationalSolutionCollectionGetByNeedType returns possible operational solutions for a given operational need
func (s *Store) PossibleOperationalSolutionCollectionGetByNeedType(logger *zap.Logger, needType models.OperationalNeedKey) ([]*models.PossibleOperationalSolution, error) {

	posSols := []*models.PossibleOperationalSolution{}

	stmt, err := s.db.PrepareNamed(possibleOperationalSolutionCollectionByNeedTypeSQL)
	if err != nil {
		return nil, err
	}

	arg := map[string]interface{}{
		"need_type": needType,
	}

	err = stmt.Select(&posSols, arg) //this returns more than one

	if err != nil {
		return nil, err
	}
	return posSols, nil

}

// PossibleOperationalSolutionCollectionGetByOperationalNeedID returns possible operational solutions for a given operational need
func (s *Store) PossibleOperationalSolutionCollectionGetByOperationalNeedID(logger *zap.Logger, operationalNeedID uuid.UUID) ([]*models.PossibleOperationalSolution, error) {

	posSols := []*models.PossibleOperationalSolution{}

	stmt, err := s.db.PrepareNamed(possibleOperationalSolutionCollectionByOperationalNeedIDSQL)
	if err != nil {
		return nil, err
	}

	arg := map[string]interface{}{
		"operational_need_id": operationalNeedID,
	}

	err = stmt.Select(&posSols, arg) //this returns more than one

	if err != nil {
		return nil, err
	}
	return posSols, nil

}
