SELECT
    id,
    model_plan_id,
    is_new_model,
    existing_model,
    resembles_existing_model,
    resembles_existing_model_which,
    resembles_existing_model_how,
    resembles_existing_model_note,
    has_components_or_tracks,
    has_components_or_tracks_differ,
    has_components_or_tracks_note,
    alternative_payment_model_types,
    alternative_payment_model_note,
    key_characteristics,
    key_characteristics_other,
    key_characteristics_note,
    collect_plan_bids,
    collect_plan_bids_note,
    manage_part_c_d_enrollment,
    manage_part_c_d_enrollment_note,
    plan_contact_updated,
    plan_contact_updated_note,
    care_coordination_involved,
    care_coordination_involved_description,
    care_coordination_involved_note,
    additional_services_involved,
    additional_services_involved_description,
    additional_services_involved_note,
    community_partners_involved,
    community_partners_involved_description,
    community_partners_involved_note,
    geographies_targeted,
    geographies_targeted_types,
    geographies_targeted_types_other,
    geographies_targeted_applied_to,
    geographies_targeted_applied_to_other,
    geographies_targeted_note,
    participation_options,
    participation_options_note,
    agreement_types,
    agreement_types_other,
    multiple_patricipation_agreements_needed,
    multiple_patricipation_agreements_needed_note,
    rulemaking_required,
    rulemaking_required_description,
    rulemaking_required_note,
    authority_allowances,
    authority_allowances_other,
    authority_allowances_note,
    waivers_required,
    waivers_required_types,
    waivers_required_note,
    created_by,
    created_dts,
    modified_by,
    modified_dts,
    ready_for_review_by,
    ready_for_review_dts,
    ready_for_clearance_by,
    ready_for_clearance_dts,
    status
FROM plan_general_characteristics
WHERE id = :id
