package storage

import (
	_ "embed"

	"go.uber.org/zap"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/utilityUUID"
)

//go:embed SQL/nda_agreement/get_by_user_id.sql
var ndaAgreementGetByUserIDSQL string

//go:embed SQL/nda_agreement/update.sql
var ndaAgreementUpdateSQL string

//go:embed SQL/nda_agreement/insert.sql
var ndaAgreementInsertSQL string

// NDAAgreementGetByUserID returns an NDA based on a UserID
func (s *Store) NDAAgreementGetByUserID(_ *zap.Logger, userID uuid.UUID) (*models.NDAAgreement, error) {

	nda := models.NDAAgreement{}

	stmt, err := s.db.PrepareNamed(ndaAgreementGetByUserIDSQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	arg := map[string]interface{}{
		"user_id": userID,
	}

	err = stmt.Get(&nda, arg)
	if err != nil {
		if err.Error() == "sql: no rows in result set" { //EXPECT THERE TO BE NULL results, don't treat this as an error
			return nil, nil
		}
		return nil, err
	}

	return &nda, nil
}

// NDAAgreementUpdate updates an nda agreement based on userID
func (s *Store) NDAAgreementUpdate(_ *zap.Logger, nda *models.NDAAgreement) (*models.NDAAgreement, error) {

	stmt, err := s.db.PrepareNamed(ndaAgreementUpdateSQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	err = stmt.Get(nda, nda)
	if err != nil {
		return nil, err
	}

	return nda, nil
}

// NDAAgreementCreate creates a new nda agreement based on an EUA
func (s *Store) NDAAgreementCreate(_ *zap.Logger, nda *models.NDAAgreement) (*models.NDAAgreement, error) {

	nda.ID = utilityUUID.ValueOrNewUUID(nda.ID)

	stmt, err := s.db.PrepareNamed(ndaAgreementInsertSQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	err = stmt.Get(nda, &nda)
	if err != nil {
		return nil, err
	}

	return nda, nil

}
