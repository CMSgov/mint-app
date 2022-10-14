SELECT
    OpSol.id,
    OpSol.operational_need_id,
    OpSol.solution_type,
    OpSol.archived,
    pOpSol.name AS name,
    pOpSol.key, AS key,
    OpSol.solution_other,
    OpSol.poc_name,
    OpSol.poc_email,
    OpSol.must_start_dts,
    OpSol.must_finish_dts,
    OpSol.status,
    OpSol.created_by,
    OpSol.created_dts,
    OpSol.modified_by,
    OpSol.modified_dts
FROM operational_solution AS OpSol
LEFT JOIN possible_operational_solution AS pOpSol ON OpSol.solution_type = pOpSol.id
WHERE OpSol.operational_need_id = :operational_need_id AND pOpSol.key = :solution_type;
