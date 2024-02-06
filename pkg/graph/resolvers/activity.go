package resolvers

import (
	"context"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// ActivityCreate creates a new activity in the database.
// It ensures that a notification record is also created in the database for each relevant user based on
// a. Activity type
// b. Notification preferences
func ActivityCreate(ctx context.Context, store *storage.Store, np sqlutils.NamedPreparer, activity *models.Activity) (*models.Activity, error) {

	activity, err := store.ActivityCreate(np, activity)
	if err != nil {
		return nil, err
	}

	//TODO: create all notifications for all relevant users, either as
	//   a. part of this function
	//   b. db trigger
	//   c. another transaction?
	_, err = UserNotificationCreateAllPerActivity(ctx, store, np, activity)
	if err != nil {
		return nil, err
	}

	return activity, nil

}

// ActivityGetByID Returns an activity from the database
func ActivityGetByID(_ context.Context, store *storage.Store, id uuid.UUID) (*models.Activity, error) {
	return store.ActivityGetByID(id)
	//TODO: EASI-3294 implement this as a dataloader
}
