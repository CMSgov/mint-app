package loaders

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/samber/lo"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/models"
	"github.com/cms-enterprise/mint-app/pkg/storage"

	"github.com/graph-gophers/dataloader/v7"
)

type modelPlanLoader struct {
	ByID *dataloader.Loader[uuid.UUID, *models.ModelPlan]
}

func (l *modelPlanLoader) init() {
	l.ByID = ModelPlan.GetByID.NewBatchedLoader()
}
func (l *modelPlanLoader) getByKey() any {
	return l.ByID
}
func (l *modelPlanLoader) addLoaderByKeys(hMap *HolderMap) {
	// hMap["model_plan"] = l.ByID
}

func newModelPlanLoaders() modelPlanLoader {
	loader := modelPlanLoader{}
	loader.init()
	return loader
}

// modelPlanLoaderConfig is the loader config for all fetching of model plan data
type modelPlanLoaderConfig struct {
	// GetByID returns a model plan record associated with a uuid
	GetByID LoaderConfig[uuid.UUID, *models.ModelPlan]
}

// // ModelPlan is the loader config for all fetching of model plan data
// var ModelPlan modelPlanLoaderConfig = modelPlanLoaderConfig{
// 	GetByID: LoaderConfig[uuid.UUID, *models.ModelPlan]{
// 		LoadFunc:      modelPlanGetByIDLoad,
// 		batchFunction: batchModelPlanByModelPlanID,
// 	},
// }

var ModelPlan = func() modelPlanLoaderConfig {
	cfg := modelPlanLoaderConfig{
		GetByID: LoaderConfig[uuid.UUID, *models.ModelPlan]{
			loadFunc:      modelPlanGetByIDLoad,
			batchFunction: batchModelPlanByModelPlanID,
		},
	}
	cfg.GetByID.loader = cfg.GetByID.NewBatchedLoader()

	// TODO: should we define an interface or just require this? that needs to be
	// cfg.InstantiateMethod()
	return cfg
}()

func batchModelPlanByModelPlanID(ctx context.Context, modelPlanIDs []uuid.UUID) []*dataloader.Result[*models.ModelPlan] {
	logger := appcontext.ZLogger(ctx)
	output := make([]*dataloader.Result[*models.ModelPlan], len(modelPlanIDs))
	loaders, err := Loaders(ctx)
	if err != nil {
		//TODO: (loaders) make this a helper function to return an error per result
		for index := range modelPlanIDs {
			output[index] = &dataloader.Result[*models.ModelPlan]{Data: nil, Error: err}
		}
		return output
	}

	data, err := storage.ModelPlansGetByModePlanIDsLOADER(loaders.DataReader.Store, logger, modelPlanIDs)
	if err != nil {
		//TODO: (loaders) make this a helper function to return an error per result
		for index := range modelPlanIDs {
			output[index] = &dataloader.Result[*models.ModelPlan]{Data: nil, Error: err}
		}
		return output
	}
	planByID := lo.Associate(data, func(plan *models.ModelPlan) (uuid.UUID, *models.ModelPlan) {
		return plan.ID, plan
	})

	// RETURN IN THE SAME ORDER REQUESTED
	for index, id := range modelPlanIDs {

		plan, ok := planByID[id]
		if ok {
			output[index] = &dataloader.Result[*models.ModelPlan]{Data: plan, Error: nil}
		} else {
			err2 := fmt.Errorf("model plan not found for modelPlanID id %s", id)
			output[index] = &dataloader.Result[*models.ModelPlan]{Data: nil, Error: err2}
		}
	}
	return output
}

// modelPlanGetByIDLoad uses a data loader to return a model plan for a given model plan
func modelPlanGetByIDLoad(ctx context.Context, id uuid.UUID) (*models.ModelPlan, error) {
	allLoaders, err := Loaders(ctx)
	if err != nil {
		return nil, err
	}
	// // loader := allLoaders.myMap["model_plan"]
	// // retLoaderAny := loader.getByKey()
	// typedLoader := retLoaderAny.(*dataloader.Loader[uuid.UUID, *models.ModelPlan])
	// return loader.Load(ctx, id)()
	modelPlanLoader := allLoaders.modelPlan.ByID
	return modelPlanLoader.Load(ctx, id)()
}
