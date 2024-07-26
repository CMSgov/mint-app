UPDATE plan_participants_and_providers
SET
    participants = :participants,
    medicare_provider_type = :medicare_provider_type,
    is_new_type_of_providers_or_suppliers = :is_new_type_of_providers_or_suppliers,
    states_engagement = :states_engagement,
    participants_other = :participants_other,
    participants_note = :participants_note,
    participants_currently_in_models = :participants_currently_in_models,
    participants_currently_in_models_note = :participants_currently_in_models_note,
    model_application_level = :model_application_level,
    expected_number_of_participants = :expected_number_of_participants,
    estimate_confidence = :estimate_confidence,
    confidence_note = :confidence_note,
    recruitment_method = :recruitment_method,
    recruitment_other = :recruitment_other,
    recruitment_note = :recruitment_note,
    selection_method = :selection_method,
    selection_other = :selection_other,
    selection_note = :selection_note,
    participant_added_frequency = :participant_added_frequency,
    participant_added_frequency_continually = :participant_added_frequency_continually,
    participant_added_frequency_other = :participant_added_frequency_other,
    participant_added_frequency_note = :participant_added_frequency_note,
    participant_removed_frequency = :participant_removed_frequency,
    participant_removed_frequency_continually = :participant_removed_frequency_continually,
    participant_removed_frequency_other = :participant_removed_frequency_other,
    participant_removed_frequency_note = :participant_removed_frequency_note,
    communication_method = :communication_method,
    communication_method_other = :communication_method_other,
    communication_note = :communication_note,
    risk_type = :risk_type,
    risk_other = :risk_other,
    risk_note = :risk_note,
    will_risk_change = :will_risk_change,
    will_risk_change_note = :will_risk_change_note,
    participant_require_financial_guarantee = :participant_require_financial_guarantee,
    participant_require_financial_guarantee_type = :participant_require_financial_guarantee_type,
    participant_require_financial_guarantee_other = :participant_require_financial_guarantee_other,
    participant_require_financial_guarantee_note = :participant_require_financial_guarantee_note,
    coordinate_work = :coordinate_work,
    coordinate_work_note = :coordinate_work_note,
    gainshare_payments = :gainshare_payments,
    gainshare_payments_track = :gainshare_payments_track,
    gainshare_payments_note = :gainshare_payments_note,
    gainshare_payments_eligibility = :gainshare_payments_eligibility,
    gainshare_payments_eligibility_other = :gainshare_payments_eligibility_other,
    participants_ids = :participants_ids,
    participants_ids_other = :participants_ids_other,
    participants_ids_note = :participants_ids_note,
    provider_addition_frequency = :provider_addition_frequency,
    provider_addition_frequency_continually = :provider_addition_frequency_continually,
    provider_addition_frequency_other = :provider_addition_frequency_other,
    provider_addition_frequency_note = :provider_addition_frequency_note,
    provider_add_method = :provider_add_method,
    provider_add_method_other = :provider_add_method_other,
    provider_add_method_note = :provider_add_method_note,
    provider_leave_method = :provider_leave_method,
    provider_leave_method_other = :provider_leave_method_other,
    provider_leave_method_note = :provider_leave_method_note,
    provider_removal_frequency = :provider_removal_frequency,
    provider_removal_frequency_continually = :provider_removal_frequency_continually,
    provider_removal_frequency_other = :provider_removal_frequency_other,
    provider_removal_frequency_note = :provider_removal_frequency_note,
    provider_overlap = :provider_overlap,
    provider_overlap_hierarchy = :provider_overlap_hierarchy,
    provider_overlap_note = :provider_overlap_note,
    modified_by = :modified_by,
    modified_dts = CURRENT_TIMESTAMP,
    ready_for_review_by = :ready_for_review_by,
    ready_for_review_dts = :ready_for_review_dts,
    ready_for_clearance_by = :ready_for_clearance_by,
    ready_for_clearance_dts = :ready_for_clearance_dts,
    status = :status
WHERE plan_participants_and_providers.id = :id
RETURNING
id,
model_plan_id,
participants,
medicare_provider_type,
is_new_type_of_providers_or_suppliers,
states_engagement,
participants_other,
participants_note,
participants_currently_in_models,
participants_currently_in_models_note,
model_application_level,
expected_number_of_participants,
estimate_confidence,
confidence_note,
recruitment_method,
recruitment_other,
recruitment_note,
selection_method,
selection_other,
selection_note,
participant_added_frequency,
participant_added_frequency_continually,
participant_added_frequency_other,
participant_added_frequency_note,
participant_removed_frequency,
participant_removed_frequency_continually,
participant_removed_frequency_other,
participant_removed_frequency_note,
communication_method,
communication_method_other,
communication_note,
risk_type,
risk_other,
risk_note,
will_risk_change,
will_risk_change_note,
participant_require_financial_guarantee,
participant_require_financial_guarantee_type,
participant_require_financial_guarantee_other,
participant_require_financial_guarantee_note,
coordinate_work,
coordinate_work_note,
gainshare_payments,
gainshare_payments_track,
gainshare_payments_note,
gainshare_payments_eligibility,
gainshare_payments_eligibility_other,
participants_ids,
participants_ids_other,
participants_ids_note,
provider_addition_frequency,
provider_addition_frequency_continually,
provider_addition_frequency_other,
provider_addition_frequency_note,
provider_add_method,
provider_add_method_other,
provider_add_method_note,
provider_leave_method,
provider_leave_method_other,
provider_leave_method_note,
provider_removal_frequency,
provider_removal_frequency_continually,
provider_removal_frequency_other,
provider_removal_frequency_note,
provider_overlap,
provider_overlap_hierarchy,
provider_overlap_note,
created_by,
created_dts,
modified_by,
modified_dts,
ready_for_review_by,
ready_for_review_dts,
ready_for_review_by,
ready_for_review_dts,
ready_for_clearance_by,
ready_for_clearance_dts,
status;
