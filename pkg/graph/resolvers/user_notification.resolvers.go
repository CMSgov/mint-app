package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/google/uuid"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/graph/generated"
	"github.com/cms-enterprise/mint-app/pkg/models"
	"github.com/cms-enterprise/mint-app/pkg/notifications"
	"github.com/cms-enterprise/mint-app/pkg/storage/loaders"
)

// MarkNotificationAsRead is the resolver for the markNotificationAsRead field.
func (r *mutationResolver) MarkNotificationAsRead(ctx context.Context, notificationID uuid.UUID) (*models.UserNotification, error) {
	principal := appcontext.Principal(ctx)
	return notifications.UserNotificationMarkAsRead(ctx, r.store, principal, notificationID)
}

// MarkAllNotificationsAsRead is the resolver for the markAllNotificationsAsRead field.
func (r *mutationResolver) MarkAllNotificationsAsRead(ctx context.Context) ([]*models.UserNotification, error) {
	principal := appcontext.Principal(ctx)
	return notifications.UserNotificationMarkAllAsRead(ctx, r.store, principal)
}

// Activity is the resolver for the activity field.
func (r *userNotificationResolver) Activity(ctx context.Context, obj *models.UserNotification) (*models.Activity, error) {
	return loaders.ActivityGetByID(ctx, obj.ActivityID)
}

// UserNotification returns generated.UserNotificationResolver implementation.
func (r *Resolver) UserNotification() generated.UserNotificationResolver {
	return &userNotificationResolver{r}
}

type userNotificationResolver struct{ *Resolver }
