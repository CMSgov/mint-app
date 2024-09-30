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

// AddPlanFavorite is the resolver for the addPlanFavorite field.
func (r *mutationResolver) AddPlanFavorite(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanFavorite, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return PlanFavoriteCreate(r.store, logger, principal, principal.Account().ID, r.store, modelPlanID)
}

// DeletePlanFavorite is the resolver for the deletePlanFavorite field.
func (r *mutationResolver) DeletePlanFavorite(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanFavorite, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return PlanFavoriteDelete(logger, principal, r.store, modelPlanID)
}
