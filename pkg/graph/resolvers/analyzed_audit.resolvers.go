package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"
	"time"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/models"
)

// UserAccount is the resolver for the userAccount field.
func (r *analyzedModelLeadInfoResolver) UserAccount(ctx context.Context, obj *models.AnalyzedModelLeadInfo) (*authentication.UserAccount, error) {
	return UserAccountGetByIDLOADER(ctx, obj.ID)
}

// AnalyzedAudits is the resolver for the analyzedAudits field.
func (r *queryResolver) AnalyzedAudits(ctx context.Context, dateAnalyzed time.Time) ([]*models.AnalyzedAudit, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	audits, _, err := getDigestAnalyzedAudits(principal.Account().ID, dateAnalyzed, r.store, logger)
	if err != nil {
		return nil, err
	}
	return audits, nil
}

// AnalyzedModelLeadInfo returns generated.AnalyzedModelLeadInfoResolver implementation.
func (r *Resolver) AnalyzedModelLeadInfo() generated.AnalyzedModelLeadInfoResolver {
	return &analyzedModelLeadInfoResolver{r}
}

type analyzedModelLeadInfoResolver struct{ *Resolver }
