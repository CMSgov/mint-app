package mappings

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"github.com/cms-enterprise/mint-app/pkg/graph/model"
)

//go:embed translation/plan_tdl.json
var planTDlJSON []byte

// PlanTDLTranslation Provides the translation for Plan CR
func PlanTDLTranslation() (*model.PlanTDLTranslation, error) {
	var translation model.PlanTDLTranslation
	err := json.Unmarshal(planTDlJSON, &translation)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return nil, err
	}
	return &translation, nil

}
