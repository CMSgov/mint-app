package loaders

import "github.com/cmsgov/mint-app/pkg/storage"

// DataLoaders wrap your data loaders to inject via middleware
type DataLoaders struct {
	BasicsLoader *WrappedDataLoader

	GeneralCharacteristicsLoader          *WrappedDataLoader
	ParticipantsAndProvidersLoader        *WrappedDataLoader
	BeneficiariesLoader                   *WrappedDataLoader
	OperationsEvaluationAndLearningLoader *WrappedDataLoader
	PaymentLoader                         *WrappedDataLoader
	PrepareForClearanceLoader             *WrappedDataLoader

	OperationalNeedLoader   *WrappedDataLoader
	OperationSolutionLoader *WrappedDataLoader
	UserAccountLoader       *WrappedDataLoader
	DataReader              *DataReader
}

// NewDataLoaders instantiates data loaders for the middleware
func NewDataLoaders(store *storage.Store) *DataLoaders {
	loaders := &DataLoaders{
		DataReader: &DataReader{
			Store: store,
		},
	}
	loaders.BasicsLoader = newWrappedDataLoader(loaders.GetPlanBasicsByModelPlanID)
	loaders.GeneralCharacteristicsLoader = newWrappedDataLoader(loaders.GetPlanGeneralCharacteristicsByModelPlanID) //TODO: Unit Tests
	loaders.ParticipantsAndProvidersLoader = newWrappedDataLoader(loaders.GetPlanParticipantsAndProvidersByModelPlanID)
	loaders.BeneficiariesLoader = newWrappedDataLoader(loaders.GetPlanBeneficiariesByModelPlanID)
	// loaders.OperationsEvaluationAndLearningLoader = newWrappedDataLoader(loaders.)
	// loaders.PaymentLoader = newWrappedDataLoader(loaders.)
	// loaders.PrepareForClearanceLoader = newWrappedDataLoader(loaders.)

	loaders.OperationalNeedLoader = newWrappedDataLoader(loaders.GetOperationalNeedsByModelPlanID)
	loaders.OperationSolutionLoader = newWrappedDataLoader(loaders.GetOperationalSolutionAndPossibleCollectionByOperationalNeedID)
	loaders.UserAccountLoader = newWrappedDataLoader(loaders.GetUserAccountsByIDLoader)

	return loaders
}

// DataReader reads Users from a database
type DataReader struct {
	Store *storage.Store
}
