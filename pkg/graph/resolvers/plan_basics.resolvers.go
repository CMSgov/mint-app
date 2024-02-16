package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
)

// UpdatePlanBasics is the resolver for the updatePlanBasics field.
func (r *mutationResolver) UpdatePlanBasics(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanBasics, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return UpdatePlanBasics(
		logger,
		id,
		changes,
		principal,
		r.store,
		r.emailService,
		r.emailTemplateService,
		r.addressBook,
	)
}

// AdditionalModelCategories is the resolver for the additionalModelCategories field.
func (r *planBasicsResolver) AdditionalModelCategories(ctx context.Context, obj *models.PlanBasics) ([]models.ModelCategory, error) {
	modelCategories := models.ConvertEnums[models.ModelCategory](obj.AdditionalModelCategories)
	return modelCategories, nil
}

// CmsCenters is the resolver for the cmsCenters field.
func (r *planBasicsResolver) CmsCenters(ctx context.Context, obj *models.PlanBasics) ([]model.CMSCenter, error) {
	cmsCenters := models.ConvertEnums[model.CMSCenter](obj.CMSCenters)
	return cmsCenters, nil
}

// CmmiGroups is the resolver for the cmmiGroups field.
func (r *planBasicsResolver) CmmiGroups(ctx context.Context, obj *models.PlanBasics) ([]model.CMMIGroup, error) {
	cmmiGroups := models.ConvertEnums[model.CMMIGroup](obj.CMMIGroups)
	return cmmiGroups, nil
}

// ModelType is the resolver for the modelType field.
func (r *planBasicsResolver) ModelType(ctx context.Context, obj *models.PlanBasics) ([]models.ModelType, error) {
	modelTypes := models.ConvertEnums[models.ModelType](obj.ModelType)
	return modelTypes, nil
}

// PlanBasics returns generated.PlanBasicsResolver implementation.
func (r *Resolver) PlanBasics() generated.PlanBasicsResolver { return &planBasicsResolver{r} }

type planBasicsResolver struct{ *Resolver }
