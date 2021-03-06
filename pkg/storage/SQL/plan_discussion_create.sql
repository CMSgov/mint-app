INSERT INTO plan_discussion(
    id,
    model_plan_id,
    content,
    status,
    created_by,
    modified_by
)
VALUES (
    :id,
    :model_plan_id,
    :content,
    :status,
    :created_by,
    :modified_by
)
RETURNING id,
model_plan_id,
content,
status,
created_by,
created_dts,
modified_by,
modified_dts;
