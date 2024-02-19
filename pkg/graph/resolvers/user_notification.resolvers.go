package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/notifications"
	"github.com/cmsgov/mint-app/pkg/storage/loaders"
)

// MarkNotificationAsRead is the resolver for the markNotificationAsRead field.
func (r *mutationResolver) MarkNotificationAsRead(ctx context.Context, notificationID uuid.UUID) (*notifications.UserNotification, error) {
	principal := appcontext.Principal(ctx)
	return notifications.UserNotificationMarkAsRead(ctx, r.store, r.store, principal, notificationID)
}

// MarkAllNotificationsAsRead is the resolver for the markAllNotificationsAsRead field.
func (r *mutationResolver) MarkAllNotificationsAsRead(ctx context.Context) ([]*notifications.UserNotification, error) {
	principal := appcontext.Principal(ctx)
	return notifications.UserNotificationMarkAllAsRead(ctx, r.store, r.store, principal)
}

// Activity is the resolver for the activity field.
func (r *userNotificationResolver) Activity(ctx context.Context, obj *notifications.UserNotification) (*notifications.Activity, error) {
	return loaders.ActivityGetByID(ctx, obj.ActivityID)
	// return notifications.ActivityGetByID(ctx, r.store, obj.ActivityID)
}

// Content is the resolver for the content field.
func (r *userNotificationResolver) Content(ctx context.Context, obj *notifications.UserNotification) (models.UserNotificationContent, error) {
	//TODO: EASI-3295  Implement this content resolver, either on the notification or the activity level. Use data loaders
	panic(fmt.Errorf("not implemented: Content - content"))
}

// UserNotification returns generated.UserNotificationResolver implementation.
func (r *Resolver) UserNotification() generated.UserNotificationResolver {
	return &userNotificationResolver{r}
}

type userNotificationResolver struct{ *Resolver }
