SELECT
    id,
    model_plan_id,
    model_category,
    cms_centers,
    cms_other,
    cmmi_groups,
    model_type,
    problem,
    goal,
    test_interventions,
    note,
    created_by,
    created_dts,
    modified_by,
    modified_dts,
    status
FROM plan_basics
WHERE model_plan_id = :model_plan_id
