SELECT DISTINCT ON (eua_user_id)
    id,
    model_plan_id,
    eua_user_id,
    full_name,
    team_role,
    email,
    created_by,
    created_dts,
    modified_by,
    modified_dts
FROM plan_collaborator
ORDER BY eua_user_id ASC, created_dts DESC
