package sqlqueries

import _ "embed"

//go:embed SQL/existing_model/collection_get.sql
var existingModelCollectionGetSQL string

//go:embed SQL/existing_model/get_by_id_LOADER.sql
var existingModelGetByModelPlanIDLoaderSQL string

//go:embed SQL/existing_model/get_by_id.sql
var existingModelGetByByIDSQL string

type existingModelScripts struct {
	CollectionGet          string
	GetByModelPlanIDLoader string
	GetByID                string
}

// ExistingModel houses all the sql for getting data for existing model from the database
var ExistingModel = existingModelScripts{
	CollectionGet:          existingModelCollectionGetSQL,
	GetByModelPlanIDLoader: existingModelGetByModelPlanIDLoaderSQL,
	GetByID:                existingModelGetByByIDSQL,
}
