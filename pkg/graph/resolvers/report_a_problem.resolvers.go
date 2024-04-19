package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/graph/model"
)

// ReportAProblem is the resolver for the reportAProblem field.
func (r *mutationResolver) ReportAProblem(ctx context.Context, input model.ReportAProblemInput) (bool, error) {
	principal := appcontext.Principal(ctx)
	return ReportAProblem(r.emailService, r.emailTemplateService, r.addressBook, principal, input)
}
