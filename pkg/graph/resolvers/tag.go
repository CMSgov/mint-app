package resolvers

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
	"github.com/cmsgov/mint-app/pkg/userhelpers"
)

// TaggedHTMLGet returns the tag content of a parent object
func TaggedHTMLGet( //TODO: SW rename
	logger *zap.Logger,
	store *storage.Store,
	rawContent string, //TODO, if we want, we could get this from the database as well
	taggedTable string,
	taggedField string,
	taggedContentID uuid.UUID) (*models.TaggedHTML, error) {
	taggedHTML, err := models.NewTaggedHTMLFromString(rawContent)
	if err != nil {
		return nil, err
	}

	tags, err := TagCollectionGet(logger, store, taggedTable, taggedField, taggedContentID)
	if err != nil {
		return nil, err
	}
	taggedHTML.Tags = tags

	return &taggedHTML, nil

}

// TagCollectionGet retrieves all the tags for a specific entry and table
func TagCollectionGet(
	logger *zap.Logger,
	store *storage.Store,
	taggedTable string,
	taggedField string,
	taggedContentID uuid.UUID) ([]*models.Tag, error) {

	tags, err := store.TagCollectionGetByContentIDAndField(logger, taggedTable, taggedField, taggedContentID)

	return tags, err
}

// TaggedEntityGet returns a Tagged Entity based on the table it refers to as well as the ID
func TaggedEntityGet(
	ctx context.Context,
	store *storage.Store,
	tagType models.TagType,
	EntityUUID *uuid.UUID,
	EntityIntID *int,
) (models.TaggedEntity, error) {
	logger := appcontext.ZLogger(ctx)
	switch tagType {
	case models.TagTypeUserAccount:
		return UserAccountGetByIDLOADER(ctx, *EntityUUID)
	case models.TagTypePossibleSolution:
		return PossibleOperationalSolutionGetByID(logger, store, *EntityIntID)
	default:
		return nil, fmt.Errorf(" no tagged entity configured for table: %s", tagType)
	}

}

// CreateOrGetTagEntityID updates the tagged html with the correct entity ids, and returns an array of tags to store in the database.
// , taggedField string, taggedTable string, taggedContentID uuid.UUID,
func CreateOrGetTagEntityID(ctx context.Context, store *storage.Store, tHTML *models.TaggedHTMLInput, getAccountInformation userhelpers.GetAccountInfoFunc) error {

	// //TODO remove TagArrayFromHTMLMentions
	// tags := []*models.Tag{}
	for _, mention := range tHTML.Mentions {
		tagType := mention.Type
		// TODO: SW update to check if the id is set, if not do logic to get the entity record created in the db / return the entity needed
		switch tagType { //TODO: Solution is an int id, user is a UUID
		case models.TagTypeUserAccount:
			isMacUser := false
			collabAccount, err := userhelpers.GetOrCreateUserAccount(ctx, store, mention.EntityRaw, false, isMacUser, getAccountInformation)
			if err != nil {
				return err
			}
			mention.EntityUUID = &collabAccount.ID
			oldHTML, err := mention.ToHTML() //TODO store the original raw instead of this
			if err != nil {
				return err //TODO: SW re-visit and make it not be blocking if possible
			}
			mention.EntityDB = mention.EntityUUID
			newHTML, err := mention.ToHTML()
			if err != nil {
				return err //TODO: SW re-visit and make it not be blocking if possible
			}

			newTotalRaw := strings.Replace(string(tHTML.RawContent), string(oldHTML), string(newHTML), -1)
			tHTML.RawContent = models.HTML(newTotalRaw)
			// mention.RawHTML. // TODO: SW add the attribute
		case models.TagTypePossibleSolution:
			logger := appcontext.ZLogger(ctx)

			sol, err := store.PossibleOperationalSolutionGetByKey(logger, models.OperationalSolutionKey(mention.EntityRaw))
			if err != nil {
				return err //TODO, maybe consider just letting this fail?
			}
			mention.EntityIntID = &sol.ID
			mention.EntityDB = mention.EntityIntID
		default:
			return fmt.Errorf("could not set entity id because the tag type is invalid %s", tagType)
		}

		// Updated the parent Raw content with the new fields
		newHTML, err := mention.ToHTML()
		if err != nil {
			return err //TODO: SW re-visit and make it not be blocking if possible
		}

		newTotalRaw := strings.Replace(string(tHTML.RawContent), string(mention.RawHTML), string(newHTML), -1)
		tHTML.RawContent = models.HTML(newTotalRaw)

		mention.RawHTML = newHTML
	}
	return nil
}
