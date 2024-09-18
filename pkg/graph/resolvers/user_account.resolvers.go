package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/authentication"
)

// UserAccount is the resolver for the userAccount field.
func (r *queryResolver) UserAccount(ctx context.Context, username string) (*authentication.UserAccount, error) {
	logger := appcontext.ZLogger(ctx)
	return UserAccountGetByUsername(logger, r.store, username)
}
