package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/models"
)

// ActorUserAccount is the resolver for the actorUserAccount field.
func (r *activityResolver) ActorUserAccount(ctx context.Context, obj *models.Activity) (*authentication.UserAccount, error) {
	return UserAccountGetByIDLOADER(ctx, obj.ActorID)
}

// ModelPlanID is the resolver for the modelPlanID field.
func (r *taggedInDiscussionReplyActivityMetaResolver) ModelPlanID(ctx context.Context, obj *models.TaggedInDiscussionReplyActivityMeta) (uuid.UUID, error) {
	panic(fmt.Errorf("not implemented: ModelPlanID - modelPlanID"))
}

// ModelPlan is the resolver for the modelPlan field.
func (r *taggedInDiscussionReplyActivityMetaResolver) ModelPlan(ctx context.Context, obj *models.TaggedInDiscussionReplyActivityMeta) (*models.ModelPlan, error) {
	panic(fmt.Errorf("not implemented: ModelPlan - modelPlan"))
}

// Discussion is the resolver for the discussion field.
func (r *taggedInDiscussionReplyActivityMetaResolver) Discussion(ctx context.Context, obj *models.TaggedInDiscussionReplyActivityMeta) (*models.PlanDiscussion, error) {
	logger := appcontext.ZLogger(ctx)
	return PlanDiscussionGetByID(ctx, r.store, logger, obj.DiscussionID)
}

// Reply is the resolver for the reply field.
func (r *taggedInDiscussionReplyActivityMetaResolver) Reply(ctx context.Context, obj *models.TaggedInDiscussionReplyActivityMeta) (*models.DiscussionReply, error) {
	logger := appcontext.ZLogger(ctx)
	return DiscussionReplyGetByID(ctx, r.store, logger, obj.ReplyID)
}

// ModelPlan is the resolver for the modelPlan field.
func (r *taggedInPlanDiscussionActivityMetaResolver) ModelPlan(ctx context.Context, obj *models.TaggedInPlanDiscussionActivityMeta) (*models.ModelPlan, error) {
	return ModelPlanGetByIDLOADER(ctx, obj.ModelPlanID)
}

// Discussion is the resolver for the discussion field.
func (r *taggedInPlanDiscussionActivityMetaResolver) Discussion(ctx context.Context, obj *models.TaggedInPlanDiscussionActivityMeta) (*models.PlanDiscussion, error) {
	logger := appcontext.ZLogger(ctx)
	return PlanDiscussionGetByID(ctx, r.store, logger, obj.DiscussionID)
}

// Activity returns generated.ActivityResolver implementation.
func (r *Resolver) Activity() generated.ActivityResolver { return &activityResolver{r} }

// TaggedInDiscussionReplyActivityMeta returns generated.TaggedInDiscussionReplyActivityMetaResolver implementation.
func (r *Resolver) TaggedInDiscussionReplyActivityMeta() generated.TaggedInDiscussionReplyActivityMetaResolver {
	return &taggedInDiscussionReplyActivityMetaResolver{r}
}

// TaggedInPlanDiscussionActivityMeta returns generated.TaggedInPlanDiscussionActivityMetaResolver implementation.
func (r *Resolver) TaggedInPlanDiscussionActivityMeta() generated.TaggedInPlanDiscussionActivityMetaResolver {
	return &taggedInPlanDiscussionActivityMetaResolver{r}
}

type activityResolver struct{ *Resolver }
type taggedInDiscussionReplyActivityMetaResolver struct{ *Resolver }
type taggedInPlanDiscussionActivityMetaResolver struct{ *Resolver }
