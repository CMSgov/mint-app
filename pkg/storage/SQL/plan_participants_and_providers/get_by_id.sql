SELECT
    id,
    model_plan_id,
    participants,
    medicare_provider_type,
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
    provider_overlap,
    provider_overlap_hierarchy,
    provider_overlap_note,
    created_by,
    created_dts,
    modified_by,
    modified_dts,
    ready_for_review_by,
    ready_for_review_dts,
    ready_for_clearance_by,
    ready_for_clearance_dts,
    status
FROM public.plan_participants_and_providers
WHERE id = :id;
