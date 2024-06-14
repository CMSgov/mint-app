package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/models"
)

// TranslatedAuditCollection is the resolver for the translatedAuditCollection field.
func (r *queryResolver) TranslatedAuditCollection(ctx context.Context, modelPlanID uuid.UUID) ([]*models.TranslatedAudit, error) {
	// Changes (Confidential) refactor this, get logger and principal to pass to this? Or another way?
	return TranslatedAuditCollectionGetByModelPlanID(ctx, r.store, modelPlanID)
}

// TranslatedFields is the resolver for the translatedFields field.
func (r *translatedAuditResolver) TranslatedFields(ctx context.Context, obj *models.TranslatedAudit) ([]*models.TranslatedAuditField, error) {
	return TranslatedAuditFieldCollectionGetByTranslatedAuditID(ctx, obj.ID)
}

// NotApplicableQuestions is the resolver for the notApplicableQuestions field.
func (r *translatedAuditFieldResolver) NotApplicableQuestions(ctx context.Context, obj *models.TranslatedAuditField) ([]string, error) {
	if obj.NotApplicableQuestions == nil {
		return nil, nil
	}

	return *obj.NotApplicableQuestions, nil
}

// TranslatedAudit returns generated.TranslatedAuditResolver implementation.
func (r *Resolver) TranslatedAudit() generated.TranslatedAuditResolver {
	return &translatedAuditResolver{r}
}

// TranslatedAuditField returns generated.TranslatedAuditFieldResolver implementation.
func (r *Resolver) TranslatedAuditField() generated.TranslatedAuditFieldResolver {
	return &translatedAuditFieldResolver{r}
}

type translatedAuditResolver struct{ *Resolver }
type translatedAuditFieldResolver struct{ *Resolver }
