SELECT
    id,
    model_plan_id,
    funding_source,
    funding_source_trust_fund,
    funding_source_other,
    funding_source_note,
    funding_source_r,
    funding_source_r_trust_fund,
    funding_source_r_other,
    funding_source_r_note,
    pay_recipients,
    pay_recipients_other_specification,
    pay_recipients_note,
    pay_type,
    pay_type_note,
    pay_claims,
    pay_claims_other,
    pay_claims_note,
    should_any_providers_excluded_ffs_systems,
    should_any_providers_excluded_ffs_systems_note,
    changes_medicare_physician_fee_schedule,
    changes_medicare_physician_fee_schedule_note,
    affects_medicare_secondary_payer_claims,
    affects_medicare_secondary_payer_claims_how,
    affects_medicare_secondary_payer_claims_note,
    pay_model_differentiation,
    creating_dependencies_between_services,
    creating_dependencies_between_services_note,
    needs_claims_data_collection,
    needs_claims_data_collection_note,
    providing_third_party_file,
    is_contractor_aware_test_data_requirements,
    beneficiary_cost_sharing_level_and_handling,
    waive_beneficiary_cost_sharing_for_any_services,
    waive_beneficiary_cost_sharing_service_specification,
    waiver_only_applies_part_of_payment,
    waive_beneficiary_cost_sharing_note,
    non_claims_payments,
    non_claims_payments_other,
    payment_calculation_owner,
    number_payments_per_pay_cycle,
    number_payments_per_pay_cycle_note,
    shared_systems_involved_additional_claim_payment,
    shared_systems_involved_additional_claim_payment_note,
    planning_to_use_innovation_payment_contractor,
    planning_to_use_innovation_payment_contractor_note,
    funding_structure,
    expected_calculation_complexity_level,
    expected_calculation_complexity_level_note,
    can_participants_select_between_payment_mechanisms,
    can_participants_select_between_payment_mechanisms_how,
    can_participants_select_between_payment_mechanisms_note,
    anticipated_payment_frequency,
    anticipated_payment_frequency_other,
    anticipated_payment_frequency_note,
    will_recover_payments,
    will_recover_payments_note,
    anticipate_reconciling_payments_retrospectively,
    anticipate_reconciling_payments_retrospectively_note,
    payment_start_date,
    payment_start_date_note,
    created_by,
    created_dts,
    modified_by,
    modified_dts,
    status
FROM plan_payments
WHERE model_plan_id = :model_plan_id;
