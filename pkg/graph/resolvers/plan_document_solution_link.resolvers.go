package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/google/uuid"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/models"
)

// CreatePlanDocumentSolutionLinks is the resolver for the createPlanDocumentSolutionLinks field.
func (r *mutationResolver) CreatePlanDocumentSolutionLinks(ctx context.Context, solutionID uuid.UUID, documentIDs []uuid.UUID) ([]*models.PlanDocumentSolutionLink, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return PlanDocumentSolutionLinksCreate(logger, r.store, solutionID, documentIDs, principal)
}

// RemovePlanDocumentSolutionLinks is the resolver for the removePlanDocumentSolutionLinks field.
func (r *mutationResolver) RemovePlanDocumentSolutionLinks(ctx context.Context, solutionID uuid.UUID, documentIDs []uuid.UUID) (bool, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return PlanDocumentSolutionLinkRemove(logger, solutionID, documentIDs, r.store, principal)
}
