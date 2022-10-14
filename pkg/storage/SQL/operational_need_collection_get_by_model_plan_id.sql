SELECT
    OpNd.id,
    OpNd.model_plan_id AS model_plan_id,
    pOpNd.id AS need_type,
    pOpNd.name AS name,
    pOpNd.key AS key,
    OpNd.name_other,
    OpNd.needed AS needed,
    OpNd.created_by AS created_by,
    OpNd.created_dts AS created_dts,
    OpNd.modified_by,
    OpNd.modified_dts
FROM operational_need AS OpNd
LEFT JOIN possible_operational_need AS pOpNd ON OpNd.need_type = pOpNd.id
WHERE OpNd.model_plan_id = :model_plan_id
ORDER BY need_type ASC
