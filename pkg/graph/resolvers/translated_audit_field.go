package resolvers

import (
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/sqlutils"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// TranslatedAuditFieldCollectionGetByTranslatedAuditID returns all TranslatedAuditChange for a given translated audit id
func TranslatedAuditFieldCollectionGetByTranslatedAuditID(np sqlutils.NamedPreparer, translatedAuditID uuid.UUID) ([]*models.TranslatedAuditField, error) {
	// Ticket: (EASI-4147) Update this to use a dataloader...
	translatedChangeCollection, err := storage.TranslatedAuditFieldCollectionGetByTranslatedAuditID(np, translatedAuditID)
	if err != nil {
		return nil, err
	}

	for _, change := range translatedChangeCollection {
		err2 := change.ParseMetaData()

		if err2 != nil {
			return nil, fmt.Errorf("issue parsing raw meta data for translated change %s. Error : %w", change.ID, err2)
		}

	}

	return translatedChangeCollection, err

}
