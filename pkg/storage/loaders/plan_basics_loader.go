package loaders

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	dataloaderOld "github.com/graph-gophers/dataloader"
	"github.com/samber/lo"
	"go.uber.org/zap"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/models"
	"github.com/cms-enterprise/mint-app/pkg/storage"

	"github.com/graph-gophers/dataloader/v7"
)

type planBasicsLoaders struct {
	ByModelPlanID *dataloader.Loader[uuid.UUID, *models.PlanBasics]
}

// TODO: (loaders) make a generic method to initialize these methods?
func (l *planBasicsLoaders) init() {
	l.ByModelPlanID = PlanBasics.GetByModelPlanID.NewBatchedLoader()
}

func newPlanBasicsLoaders() planBasicsLoaders {
	loader := planBasicsLoaders{}
	loader.init()
	return loader
}

type planBasicsLoaderConfig struct {
	GetByModelPlanID LoaderConfig[uuid.UUID, *models.PlanBasics]
}

var PlanBasics planBasicsLoaderConfig = planBasicsLoaderConfig{
	GetByModelPlanID: LoaderConfig[uuid.UUID, *models.PlanBasics]{
		Note:          "Gets a plan basics record associated with a model plan by the supplied model plan id",
		Load:          planBasicsGetByModelPlanIDLoad, // Direct assignment
		batchFunction: batchPlanBasicsGetByModelPlanID,
		// getExistingBatchFunction: ,
	},
}

// GetPlanBasicsByModelPlanID uses a DataLoader to aggreggate a SQL call and return all plan basics in one query
func (loaders *DataLoaders) GetPlanBasicsByModelPlanID(ctx context.Context, keys dataloaderOld.Keys) []*dataloaderOld.Result {
	dr := loaders.DataReader

	logger := appcontext.ZLogger(ctx)
	arrayCK, err := ConvertToKeyArgsArray(keys)
	if err != nil {
		logger.Error("issue converting keys for data loader in Plan Basics", zap.Error(*err))
	}
	marshaledParams, err := arrayCK.ToJSONArray()
	if err != nil {
		logger.Error("issue converting keys to JSON for data loader in Plan Basics", zap.Error(*err))
	}

	basics, _ := dr.Store.PlanBasicsGetByModelPlanIDLOADER(logger, marshaledParams)
	basicsByID := lo.Associate(basics, func(b *models.PlanBasics) (string, *models.PlanBasics) {
		return b.ModelPlanID.String(), b
	})

	// RETURN IN THE SAME ORDER REQUESTED
	output := make([]*dataloaderOld.Result, len(keys))
	for index, key := range keys {
		ck, ok := key.Raw().(KeyArgs)
		if ok {
			resKey := fmt.Sprint(ck.Args[DLModelPlanIDKey])
			basic, ok := basicsByID[resKey]
			if ok {
				output[index] = &dataloaderOld.Result{Data: basic, Error: nil}
			} else {
				err := fmt.Errorf("plan basic not found for model plan %s", resKey)
				output[index] = &dataloaderOld.Result{Data: nil, Error: err}
			}
		} else {
			err := fmt.Errorf("could not retrive key from %s", key.String())
			output[index] = &dataloaderOld.Result{Data: nil, Error: err}
		}
	}
	return output

}

func batchPlanBasicsGetByModelPlanID(ctx context.Context, modelPlanIDs []uuid.UUID) []*dataloader.Result[*models.PlanBasics] {
	logger := appcontext.ZLogger(ctx)
	output := make([]*dataloader.Result[*models.PlanBasics], len(modelPlanIDs))
	loaders := Loaders(ctx)

	data, err := storage.PlanBasicsGetByModelPlanIDLOADGEN(loaders.DataReader.Store, logger, modelPlanIDs)
	if err != nil {

		for index := range modelPlanIDs {
			output[index] = &dataloader.Result[*models.PlanBasics]{Data: nil, Error: err}
		}
		return output
	}
	basicsByModelPlanID := lo.Associate(data, func(basics *models.PlanBasics) (uuid.UUID, *models.PlanBasics) {
		return basics.ModelPlanID, basics
	})

	// RETURN IN THE SAME ORDER REQUESTED

	for index, id := range modelPlanIDs {

		basics, ok := basicsByModelPlanID[id]
		if ok {
			output[index] = &dataloader.Result[*models.PlanBasics]{Data: basics, Error: nil}
		} else {
			err2 := fmt.Errorf("plan basics not found for modelPlanID id %s", id)
			output[index] = &dataloader.Result[*models.PlanBasics]{Data: nil, Error: err2}
		}
	}
	return output

}

// func

func planBasicsGetByModelPlanIDLoad(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanBasics, error) {
	allLoaders := Loaders(ctx)
	basicsLoader := allLoaders.planBasics.ByModelPlanID
	return basicsLoader.Load(ctx, modelPlanID)()
}
