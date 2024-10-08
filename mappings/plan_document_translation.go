package mappings

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"github.com/cms-enterprise/mint-app/pkg/graph/model"
)

//go:embed translation/plan_document.json
var planDocumentTranslationJSON []byte

// PlanDocumentTranslation reads the json embedded file and renders it as a useable translation file
func PlanDocumentTranslation() (*model.PlanDocumentTranslation, error) {
	var translation model.PlanDocumentTranslation
	err := json.Unmarshal(planDocumentTranslationJSON, &translation)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil, err
	}
	return &translation, nil
}
