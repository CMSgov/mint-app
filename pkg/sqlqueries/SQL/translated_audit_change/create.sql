INSERT INTO translated_audit_change(
    id,
    model_plan_id,
    actor_id,
    actor_name,
    change_id,
    date,
    table_id,
    table_name,
    primary_key,
    action,
    field_name,
    field_name_translated,
    old,
    old_translated,
    new,
    new_translated,
    meta_data,
    model_name,
    created_by
)
VALUES (
    :id,
    :model_plan_id,
    :actor_id,
    :actor_name,
    :change_id,
    :date,
    :table_id,
    :table_name,
    :primary_key,
    :action,
    :field_name,
    :field_name_translated,
    :old,
    :old_translated,
    :new,
    :new_translated,
    :meta_data,
    :model_name,
    :created_by
)
RETURNING
id,
model_plan_id,
actor_id,
actor_name,
change_id,
date,
table_id,
table_name,
primary_key,
action,
field_name,
field_name_translated,
old,
old_translated,
new,
new_translated,
meta_data,
model_name,
created_by,
created_dts,
modified_by,
modified_dts;
