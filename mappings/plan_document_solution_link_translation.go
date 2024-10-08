package mappings

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"github.com/cms-enterprise/mint-app/pkg/graph/model"
)

//go:embed translation/plan_document_solution_link.json
var PlanDocumentSolutionLinkTranslationJSON []byte

func PlanDocumentSolutionLinkTranslation() (*model.PlanDocumentSolutionLinkTranslation, error) {
	var translation model.PlanDocumentSolutionLinkTranslation
	err := json.Unmarshal(PlanDocumentSolutionLinkTranslationJSON, &translation)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil, err
	}
	return &translation, nil
}
