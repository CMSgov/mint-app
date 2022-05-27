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
    communication_method,
    communication_note,
    participant_assume_risk,
    risk_type,
    risk_other,
    risk_note,
    will_risk_change,
    will_risk_change_note,
    coordinate_work,
    coordinate_work_note,
    gainshare_payments,
    gainshare_payments_method,
    gainshare_payments_note,
    participants_ids,
    participants_ids_other,
    participants_ids_note,
    provider_addition_frequency,
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
    status
FROM public.plan_participants_and_providers
WHERE id = :id;
