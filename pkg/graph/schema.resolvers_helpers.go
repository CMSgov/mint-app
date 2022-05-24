package graph

import (
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
)

// ConvertToPlanDocumentModel takes an auto-generated model plan input and converts it to a hand-written one
func ConvertToPlanDocumentModel(input *model.PlanDocumentInput) *models.PlanDocument {
	documentModel := models.PlanDocument{
		ModelPlanID:          input.ModelPlanID,
		VirusScanned:         false,
		VirusClean:           false,
		FileSize:             0,
		OtherTypeDescription: nil,
		OptionalNotes:        nil,
		DeletedAt:            nil,
	}

	if input.ID != nil {
		documentModel.ID = *input.ID
	}

	if input.DocumentParameters != nil {
		if input.DocumentParameters.FileName != nil {
			documentModel.FileName = *input.DocumentParameters.FileName
		}
		if input.DocumentParameters.FileType != nil {
			documentModel.FileType = *input.DocumentParameters.FileType
		}
		if input.DocumentParameters.DocumentType != nil {
			documentModel.DocumentType = *input.DocumentParameters.DocumentType
		}

		documentModel.FileSize = input.DocumentParameters.FileSize
		documentModel.OtherTypeDescription = input.DocumentParameters.OtherTypeDescription
		documentModel.OptionalNotes = input.DocumentParameters.OptionalNotes
	}

	return &documentModel
}
