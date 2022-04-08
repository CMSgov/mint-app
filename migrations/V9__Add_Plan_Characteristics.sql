CREATE TABLE plan_characteristics (
  id uuid,
  model_plan_id uuid,
  existing_model_or_new_track text, --should be a type
  existing_model text, --should be a type or a foreign key // HOW TO GET THIS?
  resembles_existing_model boolean,
  existing_model_resemblance text, --should be a type
  how_model_resembles_note text,
  how_model_differs_note text, --Might not be here any longer
  model_match__add_note text,

  different_components tri_state_answer, --YES NO TBD
  different_components_note text,

  apm_qpp tri_state_answer, --YES NO TBD
  apm_qpp_type text, --should be a type REGULAR, MIPS, ADVANCED, NOT SURE
  apm_qpp_note text,
  model_key_characteristics text, --should be a type
  model_key_characteristics_other text,
  model_key_characteristics_note text,

  --this next section looks like it moved
  /*
This bit is about Medicare advantage or Part D...
1 Question that was in the Particpants providers section
1 Question that was in the spot before the waiver quetsions


  */
  medicare_review_plan_bids tri_state_answer,
  medicare_review_plan_bids_note TEXT,
  medicare_manage_enrollment tri_state_answer,
  medicare_manage_enrollment_note TEXT,
  
  updated_plan_contact tri_state_answer,
  updated_plan_contact_note text,


  care_coordination_involved tri_state_answer,
  care_coordination_involved_note text,
  additional_services_involved  tri_state_answer,
  additional_services_involved_note text,
  community_partners_involved  tri_state_answer,
  community_partners_involved_note text,
  targeted_at_specific_geographies  tri_state_answer,

  geography_type  text, --should be a type -- STATE, REGION, OTHER
  geography_type_other text,
  geographies_applied_to text, --should be a type -- PARTICIPANTS, PROVIDERS, BENEFICIAREIES, OTHER
  geographies_applied_to_other text,
  targeted_at_specific_geographies_note text,

  different_options_for_participation tri_state_answer,
  different_options_for_participation_note text,
  agreement_type text, --should be a type --PARTICIPATION AGREEMENT, CO-OPERativeAgreement / GRANT . OTHER, TBD
  agreement_type_other text, --should be a type
  agreement_type_note text,
  rule_making tri_state_answer, --should be a type
  rule_making_details TEXT, -- If Yes is the answer
  rule_making_note text,
  autthority_to_test text, --should be a type -- 3021, Congressionally Mandated, Section 1833, TBD, OTHER
  autthority_to_test_other text,
  authority_to_test_note text,

  waivers_required  tri_state_answer,
  waiver_type text, --should be a type --FRAUD AND ABUSE --PROGRAM PAYMENT --MEDICAID --TBD
  waiver_note text, 
  primary key (id),

  created_by eua_id,
  created_dts timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by eua_id,
  modified_dts timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT -- can become and ENUM/TYPE
);


ALTER TABLE plan_characteristics
    ADD CONSTRAINT fk_characteristics_plan FOREIGN KEY (model_plan_id)
        REFERENCES public.model_plan (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION