package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/models"
)

// SetPrimaryPointOfContact is the resolver for the setPrimaryPointOfContact field.
func (r *mutationResolver) SetPrimaryPointOfContact(ctx context.Context, possibleOperationalSolutionID int, pointOfContactID uuid.UUID) (bool, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return PossibleOperationalSolutionSetPrimaryContactByID(
		logger,
		r.store,
		possibleOperationalSolutionID,
		pointOfContactID,
		principal,
	)
}

// PointsOfContact is the resolver for the pointsOfContact field.
func (r *possibleOperationalSolutionResolver) PointsOfContact(ctx context.Context, obj *models.PossibleOperationalSolution) ([]*models.PossibleOperationalSolutionContact, error) {
	return PossibleOperationalSolutionContactsGetByPossibleSolutionID(ctx, obj.ID)
}

// PrimaryPointOfContact is the resolver for the primaryPointOfContact field.
func (r *possibleOperationalSolutionResolver) PrimaryPointOfContact(ctx context.Context, obj *models.PossibleOperationalSolution) (*models.PossibleOperationalSolutionContact, error) {
	logger := appcontext.ZLogger(ctx)

	return r.store.PossibleOperationalSolutionPrimaryContactGetByPossibleSolutionID(logger, obj.ID)
}

// PossibleOperationalSolutions is the resolver for the possibleOperationalSolutions field.
func (r *queryResolver) PossibleOperationalSolutions(ctx context.Context) ([]*models.PossibleOperationalSolution, error) {
	logger := appcontext.ZLogger(ctx)

	return PossibleOperationalSolutionCollectionGetAll(logger, r.store)
}

// PossibleOperationalSolution returns generated.PossibleOperationalSolutionResolver implementation.
func (r *Resolver) PossibleOperationalSolution() generated.PossibleOperationalSolutionResolver {
	return &possibleOperationalSolutionResolver{r}
}

type possibleOperationalSolutionResolver struct{ *Resolver }
