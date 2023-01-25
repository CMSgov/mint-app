SELECT EXISTS(
    SELECT 1
    FROM PLAN_COLLABORATOR AS collab
    INNER JOIN OPERATIONAL_NEED AS need ON need.model_plan_id = collab.model_plan_id
    WHERE need.id = :need_id
        AND PLAN_COLLABORATOR.user_id = :user_id
) AS isCollaborator
