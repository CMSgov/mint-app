package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/graph/generated"
	"github.com/cms-enterprise/mint-app/pkg/models"
)

// UpdatePlanDataExchangeApproach is the resolver for the updatePlanDataExchangeApproach field.
func (r *mutationResolver) UpdatePlanDataExchangeApproach(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanDataExchangeApproach, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return PlanDataExchangeApproachUpdate(logger, id, changes, principal, r.store)
}

// DataToCollectFromParticipants is the resolver for the dataToCollectFromParticipants field.
func (r *planDataExchangeApproachResolver) DataToCollectFromParticipants(ctx context.Context, obj *models.PlanDataExchangeApproach) ([]models.DataToCollectFromParticipants, error) {
	return models.ConvertEnums[models.DataToCollectFromParticipants](obj.DataToCollectFromParticipants), nil
}

// DataToSendToParticipants is the resolver for the dataToSendToParticipants field.
func (r *planDataExchangeApproachResolver) DataToSendToParticipants(ctx context.Context, obj *models.PlanDataExchangeApproach) ([]models.DataToSendToParticipants, error) {
	return models.ConvertEnums[models.DataToSendToParticipants](obj.DataToSendToParticipants), nil
}

// DoesNeedToMakeMultiPayerDataAvailable is the resolver for the doesNeedToMakeMultiPayerDataAvailable field.
func (r *planDataExchangeApproachResolver) DoesNeedToMakeMultiPayerDataAvailable(ctx context.Context, obj *models.PlanDataExchangeApproach) (*bool, error) {
	panic(fmt.Errorf("not implemented: DoesNeedToMakeMultiPayerDataAvailable - doesNeedToMakeMultiPayerDataAvailable"))
}

// DoesNeedToCollectAndAggregateMultiSourceData is the resolver for the doesNeedToCollectAndAggregateMultiSourceData field.
func (r *planDataExchangeApproachResolver) DoesNeedToCollectAndAggregateMultiSourceData(ctx context.Context, obj *models.PlanDataExchangeApproach) (*bool, error) {
	panic(fmt.Errorf("not implemented: DoesNeedToCollectAndAggregateMultiSourceData - doesNeedToCollectAndAggregateMultiSourceData"))
}

// MultiSourceDataToCollect is the resolver for the multiSourceDataToCollect field.
func (r *planDataExchangeApproachResolver) MultiSourceDataToCollect(ctx context.Context, obj *models.PlanDataExchangeApproach) ([]models.MultiSourceDataToCollect, error) {
	return models.ConvertEnums[models.MultiSourceDataToCollect](obj.MultiSourceDataToCollect), nil
}

// WillImplementNewDataExchangeMethods is the resolver for the willImplementNewDataExchangeMethods field.
func (r *planDataExchangeApproachResolver) WillImplementNewDataExchangeMethods(ctx context.Context, obj *models.PlanDataExchangeApproach) (*bool, error) {
	panic(fmt.Errorf("not implemented: WillImplementNewDataExchangeMethods - willImplementNewDataExchangeMethods"))
}

// PlanDataExchangeApproach returns generated.PlanDataExchangeApproachResolver implementation.
func (r *Resolver) PlanDataExchangeApproach() generated.PlanDataExchangeApproachResolver {
	return &planDataExchangeApproachResolver{r}
}

type planDataExchangeApproachResolver struct{ *Resolver }
