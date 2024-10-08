package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/models"
)

// MostRecentDiscussionRoleSelection is the resolver for the mostRecentDiscussionRoleSelection field.
func (r *queryResolver) MostRecentDiscussionRoleSelection(ctx context.Context) (*models.DiscussionRoleSelection, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return GetMostRecentDiscussionRoleSelection(logger, r.store, principal)
}
