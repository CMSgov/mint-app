ALTER TABLE plan_collaborator DISABLE TRIGGER collaborator_lead_req_update;

UPDATE plan_collaborator SET team_role = 'IT_LEAD' WHERE team_role = 'ARCHITECT';

ALTER TYPE TEAM_ROLE RENAME TO TEAM_ROLE_OLD;

CREATE TYPE TEAM_ROLE AS ENUM (
    'MODEL_LEAD',
    'MODEL_TEAM',
    'LEADERSHIP',
    'LEARNING',
    'EVALUATION',
    'IT_LEAD'
);

ALTER TABLE plan_collaborator ALTER COLUMN team_role TYPE TEAM_ROLE USING team_role::TEXT::TEAM_ROLE;

DROP TYPE TEAM_ROLE_OLD;

ALTER TABLE plan_collaborator ENABLE TRIGGER collaborator_lead_req_update;
