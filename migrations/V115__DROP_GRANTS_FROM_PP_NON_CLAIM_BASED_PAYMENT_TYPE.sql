ALTER TYPE PP_NON_CLAIM_BASED_PAYMENT_TYPE RENAME TO PP_NON_CLAIM_BASED_PAYMENT_TYPE_OLD;

CREATE TYPE PP_NON_CLAIM_BASED_PAYMENT_TYPE AS ENUM (
  'ADVANCED_PAYMENT',
  'BUNDLED_EPISODE_OF_CARE',
  'CAPITATION_POPULATION_BASED_FULL',
  'CAPITATION_POPULATION_BASED_PARTIAL',
  'CARE_COORDINATION_MANAGEMENT_FEE',
  'GLOBAL_BUDGET',
  'INCENTIVE_PAYMENT',
  'MAPD_SHARED_SAVINGS',
  'SHARED_SAVINGS',
  'OTHER'
  );

UPDATE plan_payments
SET non_claims_payments = array_remove(non_claims_payments, 'GRANTS')
WHERE 'GRANTS' = ANY (non_claims_payments);

ALTER TABLE plan_payments
  ALTER COLUMN non_claims_payments TYPE PP_NON_CLAIM_BASED_PAYMENT_TYPE[]
    USING non_claims_payments::text[]::PP_NON_CLAIM_BASED_PAYMENT_TYPE[];

DROP TYPE PP_NON_CLAIM_BASED_PAYMENT_TYPE_OLD;
