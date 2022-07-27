CREATE TYPE MODEL_CATEGORY AS ENUM (
    'ACCOUNTABLE_CARE',
    'DEMONSTRATION',
    'EPISODE_BASED_PAYMENT_INITIATIVES',
    'INIT_MEDICAID_CHIP_POP',
    'INIT__MEDICARE_MEDICAID_ENROLLEES',
    'INIT_ACCEL_DEV_AND_TEST',
    'INIT_SPEED_ADOPT_BEST_PRACTICE',
    'PRIMARY_CARE_TRANSFORMATION',
    'UNKNOWN'
);

CREATE TYPE CMS_CENTER AS ENUM (
    'CMMI',
    'CENTER_FOR_MEDICARE',
    'FEDERAL_COORDINATED_HEALTH_CARE_OFFICE',
    'CENTER_FOR_CLINICAL_STANDARDS_AND_QUALITY',
    'CENTER_FOR_PROGRAM_INTEGRITY',
    'OTHER'
);

CREATE TYPE CMMI_GROUP AS ENUM (
    'PATIENT_CARE_MODELS_GROUP',
    'POLICY_AND_PROGRAMS_GROUP',
    'PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP',
    'SEAMLESS_CARE_MODELS_GROUP',
    'STATE_INNOVATIONS_GROUP',
    'TBD'
);

CREATE TYPE MODEL_TYPE AS ENUM ('VOLUNTARY', 'MANDATORY', 'TBD');

CREATE TABLE plan_basics (
    id UUID PRIMARY KEY NOT NULL,
    model_plan_id UUID NOT NULL UNIQUE, --foreign key to model plan
    model_category MODEL_CATEGORY, --select from list
    cms_centers CMS_CENTER[], --should select from list
    cms_other ZERO_STRING,
    cmmi_groups CMMI_GROUP[],
    model_type MODEL_TYPE,
    problem ZERO_STRING,
    goal ZERO_STRING,
    test_interventions ZERO_STRING,
    note ZERO_STRING,
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE,
    status TASK_STATUS NOT NULL DEFAULT 'READY' -- can become and ENUM/TYPE
);

ALTER TABLE plan_basics
ADD CONSTRAINT fk_basics_plan FOREIGN KEY (model_plan_id)
REFERENCES public.model_plan (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION
