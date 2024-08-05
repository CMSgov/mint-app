package mappings

import (
	_ "embed"
	"testing"

	"github.com/cmsgov/mint-app/pkg/models"
)

func TestPlanDocumentTranslation(t *testing.T) {
	excludedFields := append(taskListStructExcludeFields, "FileSize", "VirusScanned", "VirusClean", "DeletedAt", "Bucket", "FileKey")

	assertAllTranslationDataGeneric(t, PlanDocumentTranslation, models.PlanDocument{}, excludedFields)
}
