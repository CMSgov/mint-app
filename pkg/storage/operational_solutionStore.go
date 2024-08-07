package storage

import (
	"fmt"

	"github.com/pkg/errors"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/utilityuuid"
	"github.com/cmsgov/mint-app/pkg/sqlqueries"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
	"github.com/cmsgov/mint-app/pkg/storage/genericmodel"

	_ "embed"
)

//go:embed SQL/operational_solution/and_possible_get_by_operational_need_id_LOADER.sql
var operationalSolutionAndPossibleGetByOperationalNeedIDLOADERSQL string

//go:embed SQL/operational_solution/get_by_id.sql
var operationalSolutionGetByIDSQL string

//go:embed SQL/operational_solution/update_by_id.sql
var operationalSolutionUpdateByIDSQL string

//go:embed SQL/operational_solution/insert.sql
var operationalSolutionInsertSQL string

// OperationalSolutionAndPossibleCollectionGetByOperationalNeedIDLOADER returns
// Operational Solutions that match the paramTable JSON
func (s *Store) OperationalSolutionAndPossibleCollectionGetByOperationalNeedIDLOADER(
	_ *zap.Logger,
	paramTableJSON string,
) ([]*models.OperationalSolution, error) {

	var solutions []*models.OperationalSolution

	stmt, err := s.db.PrepareNamed(operationalSolutionAndPossibleGetByOperationalNeedIDLOADERSQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	arg := map[string]interface{}{
		"paramTableJSON": paramTableJSON,
	}

	err = stmt.Select(&solutions, arg) //this returns more than one
	if err != nil {
		return nil, err
	}

	return solutions, nil
}

// OperationalSolutionGetByID returns an operational solution by ID
func (s *Store) OperationalSolutionGetByID(_ *zap.Logger, id uuid.UUID) (*models.OperationalSolution, error) {
	solution := models.OperationalSolution{}

	stmt, err := s.db.PrepareNamed(operationalSolutionGetByIDSQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	arg := map[string]interface{}{
		"id": id,
	}

	err = stmt.Get(&solution, arg)
	if err != nil {
		return nil, err
	}

	return &solution, err
}

// OperationalSolutionGetByIDWithNumberOfSubtasks returns an operational solution by ID, along with a count of the number of subtasks
func OperationalSolutionGetByIDWithNumberOfSubtasks(np sqlutils.NamedPreparer, _ *zap.Logger, id uuid.UUID) (*models.OperationalSolutionWithNumberOfSubtasks, error) {

	args := map[string]interface{}{
		"id": id,
	}
	solutionWithNumberOfSubtasks, procError := sqlutils.GetProcedure[models.OperationalSolutionWithNumberOfSubtasks](np, sqlqueries.OperationalSolution.GetWithNumberOfSubtasksByID, args)
	if procError != nil {
		return nil, fmt.Errorf("issue returning Operational Solution With Number of Subtasks object: %w", procError)
	}
	return solutionWithNumberOfSubtasks, nil
}

// OperationalSolutionGetByIDLOADER returns an operational solution by ID using a DataLoader
func (s *Store) OperationalSolutionGetByIDLOADER(
	logger *zap.Logger,
	paramTableJSON string,
) ([]*models.OperationalSolution, error) {
	arg := map[string]interface{}{
		"paramTableJSON": paramTableJSON,
	}

	opSols, err := sqlutils.SelectProcedure[models.OperationalSolution](
		s.db,
		sqlqueries.OperationalSolution.GetByIDLOADER,
		arg,
	)
	if err != nil {
		errMessage := "error selecting operational solution"
		logger.Error(errMessage, zap.Error(err))
		return nil, errors.Wrap(err, errMessage)
	}

	return opSols, nil
}

// OperationalSolutionInsert inserts an operational solution if it already exists
func (s *Store) OperationalSolutionInsert(
	logger *zap.Logger,
	solution *models.OperationalSolution,
	solutionTypeKey *models.OperationalSolutionKey,
) (*models.OperationalSolution, error) {

	stmt, err := s.db.PrepareNamed(operationalSolutionInsertSQL)
	if err != nil {
		return nil, genericmodel.HandleModelUpdateError(logger, err, solution)
	}
	defer stmt.Close()

	solution.ID = utilityuuid.ValueOrNewUUID(solution.ID)
	solution.Key = solutionTypeKey

	err = stmt.Get(solution, solution)
	if err != nil {
		return nil, genericmodel.HandleModelCreationError(logger, err, solution) //this could be either update or insert..
	}

	return solution, err
}

// OperationalSolutionUpdateByID updates an operational solution by its ID
func (s *Store) OperationalSolutionUpdateByID(
	logger *zap.Logger,
	solution *models.OperationalSolution,
) (*models.OperationalSolution, error) {

	stmt, err := s.db.PrepareNamed(operationalSolutionUpdateByIDSQL)
	if err != nil {
		return nil, genericmodel.HandleModelUpdateError(logger, err, solution)
	}
	defer stmt.Close()

	err = stmt.Get(solution, solution)
	if err != nil {
		return nil, genericmodel.HandleModelUpdateError(logger, err, solution) //this could be either update or insert..
	}

	return solution, err
}
