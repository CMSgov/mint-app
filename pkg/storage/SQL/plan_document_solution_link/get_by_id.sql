SELECT
    id,
    solution_id,
    document_id,
    created_by,
    created_dts,
    modified_by,
    modified_dts
FROM plan_document_solution_link
WHERE id = :id
