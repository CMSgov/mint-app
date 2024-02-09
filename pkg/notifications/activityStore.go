package notifications

import (
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/sqlqueries"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
)

// ActivityCreate creates a new activity in the database
func (s *dataBaseCalls) ActivityCreate(np sqlutils.NamedPreparer, activity *Activity) (*Activity, error) {
	if activity.ID == uuid.Nil {
		activity.ID = uuid.New()
	}
	// Set the raw data that gets saved to the DB.
	activity.MetaDataRaw = activity.MetaData
	retActivity, procErr := sqlutils.GetProcedure[Activity](np, sqlqueries.Activity.Create, activity)
	if procErr != nil {
		return nil, fmt.Errorf("issue creating new activity: %w", procErr)
	}
	return retActivity, nil
}

// ActivityGetByID returns an existing activity from the database
func (s *dataBaseCalls) ActivityGetByID(np sqlutils.NamedPreparer, activityID uuid.UUID) (*Activity, error) {

	arg := map[string]interface{}{"id": activityID}

	retActivity, procErr := sqlutils.GetProcedure[Activity](np, sqlqueries.Activity.GetByID, arg)
	if procErr != nil {
		return nil, fmt.Errorf("issue retrieving activity: %w", procErr)
	}

	// TODO: EASi-3294 finish implementing the parsing of meta data.

	meta, err := parseRawActivityMetaData(retActivity.ActivityType, retActivity.MetaDataRaw)
	if err != nil {
		return nil, fmt.Errorf("issue converting activity meta data to discrete type: %w", err)

	}
	retActivity.MetaData = meta
	return retActivity, nil
}

// func
