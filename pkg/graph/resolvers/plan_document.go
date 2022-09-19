package resolvers

import (
	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
	"github.com/cmsgov/mint-app/pkg/storage/genericmodel"
	"github.com/cmsgov/mint-app/pkg/upload"
)

// PlanDocumentNewUpload is the new upload resolver that do it all on the backend. IT DO!
// TODO Fix the shitty name
func PlanDocumentNewUpload(logger *zap.Logger, input model.PlanDocumentInput, principal authentication.Principal, store *storage.Store, s3Client *upload.S3Client) (*models.PlanDocument, error) {
	document := &models.PlanDocument{
		BaseStruct: models.BaseStruct{
			CreatedBy: principal.ID(),
		},
		ModelPlanRelation: models.ModelPlanRelation{
			ModelPlanID: input.ModelPlanID,
		},
		FileType:             input.FileData.ContentType,
		Bucket:               *s3Client.GetBucket(),
		FileKey:              uuid.NewString(),
		VirusScanned:         false,
		VirusClean:           false,
		FileName:             input.FileData.Filename,
		FileSize:             int(input.FileData.Size),
		DocumentType:         input.DocumentType,
		OtherTypeDescription: input.OtherTypeDescription,
		OptionalNotes:        input.OptionalNotes,
		DeletedAt:            nil,
	}

	err := BaseStructPreCreate(logger, document, principal, store, true)
	if err != nil {
		return nil, err
	}

	err = s3Client.UploadFile(input.FileData.File, document.FileKey)
	if err != nil {
		return &models.PlanDocument{}, err
	}

	document, err = store.PlanDocumentCreate(logger, principal.ID(), document, s3Client)
	if err != nil {
		return nil, genericmodel.HandleModelUpdateError(logger, err, document)
	}

	return &models.PlanDocument{}, nil
}

// PlanDocumentRead implements resolver logic to fetch a plan document object by ID
func PlanDocumentRead(logger *zap.Logger, store *storage.Store, s3Client *upload.S3Client, id uuid.UUID) (*models.PlanDocument, error) {
	document, err := store.PlanDocumentRead(logger, s3Client, id)
	if err != nil {
		return nil, err
	}

	return document, nil
}

// PlanDocumentsReadByModelPlanID implements resolver logic to fetch a plan document object by model plan ID
func PlanDocumentsReadByModelPlanID(logger *zap.Logger, id uuid.UUID, store *storage.Store, s3Client *upload.S3Client) ([]*models.PlanDocument, error) {
	documents, err := store.PlanDocumentsReadByModelPlanID(logger, id, s3Client)
	if err != nil {
		return nil, err
	}

	return documents, nil
}

// PlanDocumentDelete implements resolver logic to update a plan document object
func PlanDocumentDelete(logger *zap.Logger, s3Client *upload.S3Client, input *models.PlanDocument, principal authentication.Principal, store *storage.Store) (int, error) {
	euaid := principal.ID()
	input.ModifiedBy = &euaid

	existingdoc, err := store.PlanDocumentRead(logger, s3Client, input.ID)
	if err != nil {
		return 0, err
	}
	err = BaseStructPreDelete(logger, existingdoc, principal, store, true)
	if err != nil {
		return 0, err
	}

	sqlResult, err := store.PlanDocumentDelete(logger, input.ID)
	if err != nil {
		return 0, err
	}

	rowsAffected, err := sqlResult.RowsAffected()
	return int(rowsAffected), err
}
