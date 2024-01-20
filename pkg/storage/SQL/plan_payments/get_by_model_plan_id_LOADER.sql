WITH QUERIED_IDS AS (
    /*Translate the input to a table */
    SELECT model_plan_id
    FROM
        JSON_TO_RECORDSET(:paramTableJSON)
        AS x("model_plan_id" UUID) --noqa
)

SELECT
    pay.id,
    pay.model_plan_id,
    pay.funding_source,
    pay.funding_source_other,
    pay.funding_source_note,
    pay.funding_source_r,
    pay.funding_source_r_other,
    pay.funding_source_r_note,
    pay.pay_recipients,
    pay.pay_recipients_other_specification,
    pay.pay_recipients_note,
    pay.pay_type,
    pay.pay_type_note,
    pay.pay_claims,
    pay.pay_claims_other,
    pay.pay_claims_note,
    pay.should_any_providers_excluded_ffs_systems,
    pay.should_any_providers_excluded_ffs_systems_note,
    pay.changes_medicare_physician_fee_schedule,
    pay.changes_medicare_physician_fee_schedule_note,
    pay.affects_medicare_secondary_payer_claims,
    pay.affects_medicare_secondary_payer_claims_how,
    pay.affects_medicare_secondary_payer_claims_note,
    pay.pay_model_differentiation,
    pay.creating_dependencies_between_services,
    pay.creating_dependencies_between_services_note,
    pay.needs_claims_data_collection,
    pay.needs_claims_data_collection_note,
    pay.providing_third_party_file,
    pay.is_contractor_aware_test_data_requirements,
    pay.beneficiary_cost_sharing_level_and_handling,
    pay.waive_beneficiary_cost_sharing_for_any_services,
    pay.waive_beneficiary_cost_sharing_service_specification,
    pay.waiver_only_applies_part_of_payment,
    pay.waive_beneficiary_cost_sharing_note,
    pay.non_claims_payments,
    pay.non_claims_payments_other,
    pay.non_claims_payments_note,
    pay.payment_calculation_owner,
    pay.number_payments_per_pay_cycle,
    pay.number_payments_per_pay_cycle_note,
    pay.shared_systems_involved_additional_claim_payment,
    pay.shared_systems_involved_additional_claim_payment_note,
    pay.planning_to_use_innovation_payment_contractor,
    pay.planning_to_use_innovation_payment_contractor_note,
    pay.expected_calculation_complexity_level,
    pay.expected_calculation_complexity_level_note,
    pay.can_participants_select_between_payment_mechanisms,
    pay.can_participants_select_between_payment_mechanisms_how,
    pay.can_participants_select_between_payment_mechanisms_note,
    pay.anticipated_payment_frequency,
    pay.anticipated_payment_frequency_continually,
    pay.anticipated_payment_frequency_other,
    pay.anticipated_payment_frequency_note,
    pay.will_recover_payments,
    pay.will_recover_payments_note,
    pay.anticipate_reconciling_payments_retrospectively,
    pay.anticipate_reconciling_payments_retrospectively_note,
    pay.payment_reconciliation_frequency,
    pay.payment_reconciliation_frequency_continually,
    pay.payment_reconciliation_frequency_other,
    pay.payment_reconciliation_frequency_note,
    pay.payment_start_date,
    pay.payment_start_date_note,
    pay.created_by,
    pay.created_dts,
    pay.modified_by,
    pay.modified_dts,
    pay.ready_for_review_by,
    pay.ready_for_review_dts,
    pay.ready_for_clearance_by,
    pay.ready_for_clearance_dts,
    pay.status,
    pay.funding_source_medicare_a_info,
    pay.funding_source_medicare_b_info,
    pay.funding_source_r_medicare_a_info,
    pay.funding_source_r_medicare_b_info
FROM QUERIED_IDS AS qIDs
INNER JOIN plan_payments AS pay ON pay.model_plan_id = qIDs.model_plan_id;
