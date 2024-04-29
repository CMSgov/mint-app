package sqlqueries

import _ "embed"

// auditChangeCollectionGetByModelPlanIDAndDateRange uses a model plan ID to join on any change that
//
//go:embed SQL/audit_change/collection_by_model_plan_id_and_date_range.sql
var auditChangeCollectionGetByModelPlanIDAndDateRange string

// auditChangeGetByAuditIDWithModelPlanIDstring returns an audit_change along with the representative id. It expects an audit ID to return the data
//
//go:embed SQL/audit_change/get_by_audit_id_with_model_plan_id.sql
var auditChangeGetByAuditIDWithModelPlanIDstring string

type auditChangeScripts struct {

	// Holds the SQL query to return all raw audit changes for given model_plan_id and date range, including all child relations
	CollectionGetByModelPlanIDAndDateRange string

	GetByAuditIDWithModelPlanID string
}

// AuditChange houses all the sql for getting data for analyzed audit from the database
var AuditChange = auditChangeScripts{
	// Holds the SQL to get all changes associated with a model plan
	CollectionGetByModelPlanIDAndDateRange: auditChangeCollectionGetByModelPlanIDAndDateRange,
	// Holds the SQL to get a single change, also returning the model plan ID it is associated with
	GetByAuditIDWithModelPlanID: auditChangeGetByAuditIDWithModelPlanIDstring,
}
