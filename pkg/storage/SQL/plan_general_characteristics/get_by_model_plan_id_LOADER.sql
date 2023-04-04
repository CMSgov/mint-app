WITH QUERIED_IDS AS (
    /*Translate the input to a table */
    SELECT model_plan_id
    FROM
        JSON_TO_RECORDSET(:paramTableJSON)
        AS x("model_plan_id" UUID) --noqa
)

SELECT
    gc.id,
    gc.model_plan_id,
    gc.is_new_model,
    gc.existing_model,
    gc.resembles_existing_model,
    gc.resembles_existing_model_which,
    gc.resembles_existing_model_how,
    gc.resembles_existing_model_note,
    gc.has_components_or_tracks,
    gc.has_components_or_tracks_differ,
    gc.has_components_or_tracks_note,
    gc.alternative_payment_model_types,
    gc.alternative_payment_model_note,
    gc.key_characteristics,
    gc.key_characteristics_other,
    gc.key_characteristics_note,
    gc.collect_plan_bids,
    gc.collect_plan_bids_note,
    gc.manage_part_c_d_enrollment,
    gc.manage_part_c_d_enrollment_note,
    gc.plan_contract_updated,
    gc.plan_contract_updated_note,
    gc.care_coordination_involved,
    gc.care_coordination_involved_description,
    gc.care_coordination_involved_note,
    gc.additional_services_involved,
    gc.additional_services_involved_description,
    gc.additional_services_involved_note,
    gc.community_partners_involved,
    gc.community_partners_involved_description,
    gc.community_partners_involved_note,
    gc.geographies_targeted,
    gc.geographies_targeted_types,
    gc.geographies_targeted_types_other,
    gc.geographies_targeted_applied_to,
    gc.geographies_targeted_applied_to_other,
    gc.geographies_targeted_note,
    gc.participation_options,
    gc.participation_options_note,
    gc.agreement_types,
    gc.agreement_types_other,
    gc.multiple_patricipation_agreements_needed,
    gc.multiple_patricipation_agreements_needed_note,
    gc.rulemaking_required,
    gc.rulemaking_required_description,
    gc.rulemaking_required_note,
    gc.authority_allowances,
    gc.authority_allowances_other,
    gc.authority_allowances_note,
    gc.waivers_required,
    gc.waivers_required_types,
    gc.waivers_required_note,
    gc.created_by,
    gc.created_dts,
    gc.modified_by,
    gc.modified_dts,
    gc.ready_for_review_by,
    gc.ready_for_review_dts,
    gc.ready_for_clearance_by,
    gc.ready_for_clearance_dts,
    gc.status
FROM QUERIED_IDS AS qIDs
INNER JOIN plan_general_characteristics AS gc ON gc.model_plan_id = qIDs.model_plan_id;
