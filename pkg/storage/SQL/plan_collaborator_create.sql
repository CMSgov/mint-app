INSERT INTO plan_collaborator (
    id,
    model_plan_id,
    eua_user_id,
    full_name,
    team_role,
    created_by,
    modified_by
)
VALUES (
    :id,
    :model_plan_id,
    :eua_user_id,
    :full_name,
    :team_role,
    :created_by,
    :modified_by
)
RETURNING
id,
model_plan_id,
eua_user_id,
full_name,
team_role,
created_by,
created_dts,
modified_by,
modified_dts;
