SELECT
    id,
    model_plan_id,
    id_number,
    date_initiated,
    date_implemented,
    title,
    note,
    created_by,
    created_dts,
    modified_by,
    modified_dts
FROM plan_cr_tdl
WHERE
    model_plan_id = :model_plan_id
    AND type = 'CR';
