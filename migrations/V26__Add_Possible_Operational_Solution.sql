CREATE TYPE OPERATIONAL_SOLUTION_KEY AS ENUM (
    'OTHER',
    'MARX',
    'HPMS',
    'SALESFORCE',
    'GRANT_SOLUTIONS',
    'RFA',
    'ARS',
    'RMADA',
    'OUTLOOK_MAILBOX',
    'GOVDELIVERY',
    'SALESFORCE_PORTAL',
    'MDM',
    'CBOSC',
    'THROUGH_A_CONTRACTOR',
    'ACO_OS',
    'ACO_UI',
    'INNOVATION',
    'IDR',
    'CCW',
    'MEDICARE_APPEAL_SYSTEM',
    'IDOS',
    'ISP',
    'ANOTHER_CONTRACTOR',
    'EXISTING_CMS_DATA_AND_PROCESS',
    'NEW_CMMI_PROCESS',
    'OTHER_NEW_PROCESS',
    'INTERNAL_STAFF',
    'CROSS_MODEL_CONTRACT',
    'CONNECT',
    'OC',
    'SHARED_SYSTEMS',
    'HIGLAS',
    'FFS_COMPETENCY_CENTER',
    'APPS',
    'IPC',
    'MAC',
    'RMADA_CONTRACTOR'
);

CREATE TABLE possible_operational_solution (
    id SERIAL PRIMARY KEY NOT NULL,
    sol_name ZERO_STRING NOT NULL,
    sol_key OPERATIONAL_SOLUTION_KEY NOT NULL,

    --META DATA
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE

);
ALTER TABLE possible_operational_solution
ADD CONSTRAINT unique_enum_pos_op_sol UNIQUE (sol_key);
