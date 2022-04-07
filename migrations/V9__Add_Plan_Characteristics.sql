CREATE TABLE plan_characteristics (
  id uuid,
  model_plan_id uuid,
  existing_model_or_new_track text, --should be a type
  existing_model text, --should be a type or a foreign key // HOW TO GET THIS?
  resembles_existing_model boolean,
  existing_model_resemblance text, --should be a type
  how_model_resembles_note text,
  how_model_differs_nopte text,
  model_match__add_note text,
  apm_qpp boolean,
  apm_qpp_type text, --should be a type
  apm_qpp_note text,
  model_key_characteristics text, --should be a type
  model_key_characteristics_other text,
  model_key_characteristics_note text,
  care_coordination_involved boolean,
  care_coordination_involved_note text,
  additional_services_involved  boolean,
  additional_services_involved_note text,
  community_partners_involved  boolean,
  community_partners_involved_note text,
  targeted_at_specific_geographies  boolean,
  geography_type  text, --should be a type
  geography_type_other text,
  geographies_applied_to text, --should be a type
  geographies_applied_to_other text,
  targeted_at_specific_geographies_note text,
  different_components boolean,
  different_components_note text,
  different_options_for_participation boolean,
  different_options_for_participation_note text,
  agreement_type text, --should be a type
  agreement_type_other text, --should be a type
  agreement_type_note text,
  rule_making boolean, --should be a type
  rule_making_note text,
  autthority_to_test text, --should be a type
  autthority_to_test_other text,
  authority_to_test_note text,
  updated_plan_contact boolean,
  updated_plan_contact_note text,
  waivers_required  boolean,
  waiver_type text, --should be a type
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