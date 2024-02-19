package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
)

// LaunchDarkly is the resolver for the launchDarkly field.
func (r *currentUserResolver) LaunchDarkly(ctx context.Context, obj *models.CurrentUser) (*model.LaunchDarklySettings, error) {
	return CurrentUserLaunchDarklySettingsGet(ctx, r.ldClient)
}

// Account is the resolver for the account field.
func (r *currentUserResolver) Account(ctx context.Context, obj *models.CurrentUser) (*authentication.UserAccount, error) {
	return CurrentUserAccountGet(ctx)
}

// Notifications is the resolver for the notifications field.
func (r *currentUserResolver) Notifications(ctx context.Context, obj *models.CurrentUser) (*models.UserNotifications, error) {
	return CurrentUserNotificationsGet(ctx, r.store)
}

// NotificationPreferences is the resolver for the notificationPreferences field.
func (r *currentUserResolver) NotificationPreferences(ctx context.Context, obj *models.CurrentUser) (*models.UserNotificationPreferences, error) {
	princ := appcontext.Principal(ctx)
	return UserNotificationPreferencesGetByUserID(ctx, r.store, princ.Account().ID)
}

// CurrentUser is the resolver for the currentUser field.
func (r *queryResolver) CurrentUser(ctx context.Context) (*models.CurrentUser, error) {
	return &models.CurrentUser{}, nil
}

// CurrentUser returns generated.CurrentUserResolver implementation.
func (r *Resolver) CurrentUser() generated.CurrentUserResolver { return &currentUserResolver{r} }

type currentUserResolver struct{ *Resolver }
