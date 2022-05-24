package genericmodel

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/apperrors"
	"github.com/cmsgov/mint-app/pkg/models"
)

// HandleModelCreationError handles errors from creating a model
func HandleModelCreationError(logger *zap.Logger, err error, model models.BaseModel) error {
	logger.Error(
		fmt.Sprintf("Failed to create model [%v] with error: %v", model.GetModelTypeName(), err),
		zap.String("user", model.GetCreatedBy()),
	)

	return err
}

func logModelUpdateError(logger *zap.Logger, err error, model models.BaseModel) {
	logger.Error(
		fmt.Sprintf("Failed to update %v due to error: %v", model.GetModelTypeName(), err),
		zap.String("id", model.GetPlanID().String()),
		zap.String("user", models.ValueOrEmpty(model.GetModifiedBy())),
	)
}

// HandleModelUpdateError handles errors from updating a model
func HandleModelUpdateError(logger *zap.Logger, err error, model models.BaseModel) error {
	logModelUpdateError(logger, err, model)
	return err
}

// HandleModelQueryError handles errors from querying a model
func HandleModelQueryError(logger *zap.Logger, err error, model models.BaseModel) error {
	logModelUpdateError(logger, err, model)
	return createQueryError(err, model)
}

func createQueryError(err error, model models.BaseModel) error {
	return &apperrors.QueryError{
		Err:       err,
		Model:     model,
		Operation: apperrors.QueryUpdate,
	}
}

// HandleModelFetchByIDError handles errors from a model being fetched by ID
func HandleModelFetchByIDError(logger *zap.Logger, err error, id uuid.UUID) error {
	if errors.Is(err, sql.ErrNoRows) {
		return HandleModelFetchByIDNoRowsError(logger, err, id)
	}

	return HandleModelFetchGenericError(logger, err, id)
}

// HandleModelFetchByIDNoRowsError handles an errors when there's no results from a query by ID
func HandleModelFetchByIDNoRowsError(logger *zap.Logger, err error, id uuid.UUID) error {
	logger.Info(
		fmt.Sprintf("No model found with ID[%v]", id.String()),
		zap.Error(err),
		zap.String("id", id.String()),
	)

	return nil
}

// HandleModelFetchGenericError handles a generic errors from a model being fetched by ID
func HandleModelFetchGenericError(logger *zap.Logger, err error, id uuid.UUID) error {
	logger.Error(
		"Failed to fetch model",
		zap.Error(err),
		zap.String("id", id.String()),
	)

	return &apperrors.QueryError{
		Err:       err,
		Model:     id,
		Operation: apperrors.QueryFetch,
	}
}

// HandleModelDeleteByIDError handles errors from a model being deleted by ID
func HandleModelDeleteByIDError(logger *zap.Logger, err error, id uuid.UUID) error {
	logger.Error(
		"Failed to delete model by ID",
		zap.Error(err),
		zap.String("id", id.String()),
	)

	return &apperrors.QueryError{
		Err:       err,
		Model:     id,
		Operation: apperrors.QueryDelete,
	}
}
