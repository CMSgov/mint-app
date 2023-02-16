DROP TRIGGER collaborator_lead_req_update ON plan_collaborator;
DROP TRIGGER collaborator_lead_req_delete ON plan_collaborator;

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


CREATE TRIGGER collaborator_lead_req_update
BEFORE UPDATE ON plan_collaborator
FOR EACH ROW
WHEN ((old.team_role = 'MODEL_LEAD') AND (new.team_role != 'MODEL_LEAD'))
EXECUTE FUNCTION collaborator_role_check_trigger();


CREATE TRIGGER collaborator_lead_req_delete
BEFORE DELETE ON plan_collaborator
FOR EACH ROW
WHEN (old.team_role = 'MODEL_LEAD')
EXECUTE FUNCTION collaborator_role_check_trigger();
