/* Create new table, same format as it was for plan_cr_tdl */
CREATE TABLE plan_tdl (
    id uuid PRIMARY KEY,
    model_plan_id uuid NOT NULL REFERENCES model_plan(id),
    id_number zero_string NOT NULL,
    date_initiated timestamp without time zone NOT NULL,
    title zero_string NOT NULL,
    note text,
    created_dts timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_dts timestamp with time zone,
    created_by uuid NOT NULL REFERENCES user_account(id),
    modified_by uuid REFERENCES user_account(id)
);

/* Enable Audting for new table*/
SELECT audit.AUDIT_TABLE('public', 'plan_tdl', 'id', 'model_plan_id', '{created_by,created_dts,modified_by,modified_dts}'::TEXT[], '{}'::TEXT[]);
