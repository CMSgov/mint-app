package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/graph/generated"
	"github.com/cms-enterprise/mint-app/pkg/graph/model"
	"github.com/cms-enterprise/mint-app/pkg/models"
	"github.com/cms-enterprise/mint-app/pkg/userhelpers"
)

// Content is the resolver for the content field.
func (r *discussionReplyResolver) Content(ctx context.Context, obj *models.DiscussionReply) (*models.TaggedContent, error) {
	logger := appcontext.ZLogger(ctx)
	return TaggedContentGet(logger, r.store, string(obj.Content.RawContent), "discussion_reply", "content", obj.ID)
}

// CreateDiscussionReply is the resolver for the createDiscussionReply field.
func (r *mutationResolver) CreateDiscussionReply(ctx context.Context, input model.DiscussionReplyCreateInput) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return CreateDiscussionReply(
		ctx,
		logger,
		r.emailService,
		r.emailTemplateService,
		r.addressBook,
		&input,
		principal,
		r.store,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(r.service.FetchUserInfo))
}

// DiscussionReply returns generated.DiscussionReplyResolver implementation.
func (r *Resolver) DiscussionReply() generated.DiscussionReplyResolver {
	return &discussionReplyResolver{r}
}

type discussionReplyResolver struct{ *Resolver }
