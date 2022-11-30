SELECT EXISTS(
    SELECT 1
    FROM PLAN_COLLABORATOR AS collab
    INNER JOIN OPERATIONAL_NEED AS need ON need.model_plan_id = collab.model_plan_id
    INNER JOIN OPERATIONAL_SOLUTION AS solution ON need.id = solution.operational_need_id
    WHERE solution.id = :solution_id
        AND collab.eua_user_id = :eua_user_id
) AS isCollaborator
