SELECT
    id,
    model_plan_id,
    gc_part_c_d,
    gc_part_c_d_other,
    gc_part_c_d_note,
    gc_collect_bids,
    gc_collect_bids_other,
    gc_collect_bids_note,
    gc_update_contract,
    gc_update_contract_other,
    gc_update_contract_note,
    pp_to_advertise,
    pp_to_advertise_other,
    pp_to_advertise_note,
    pp_collect_score_review,
    pp_collect_score_review_other,
    pp_collect_score_review_note,
    pp_app_support_contractor,
    pp_app_support_contractor_other,
    pp_app_support_contractor_note,
    pp_communicate_with_participant,
    pp_communicate_with_participant_other,
    pp_communicate_with_participant_note,
    pp_manage_provider_overlap,
    pp_manage_provider_overlap_other,
    pp_manage_provider_overlap_note,
    b_manage_beneficiary_overlap,
    b_manage_beneficiary_overlap_other,
    b_manage_beneficiary_overlap_note,
    oel_helpdesk_support,
    oel_helpdesk_support_other,
    oel_helpdesk_support_note,
    oel_manage_aco,
    oel_manage_aco_other,
    oel_manage_aco_note,
    oel_performance_benchmark,
    oel_performance_benchmark_other,
    oel_performance_benchmark_note,
    oel_process_appeals,
    oel_process_appeals_other,
    oel_process_appeals_note,
    oel_evaluation_contractor,
    oel_evaluation_contractor_other,
    oel_evaluation_contractor_note,
    oel_collect_data,
    oel_collect_data_other,
    oel_collect_data_note,
    oel_obtain_data,
    oel_obtain_data_other,
    oel_obtain_data_note,
    oel_claims_based_measures,
    oel_claims_based_measures_other,
    oel_claims_based_measures_note,
    oel_quality_scores,
    oel_quality_scores_other,
    oel_quality_scores_note,
    oel_send_reports,
    oel_send_reports_other,
    oel_send_reports_note,
    oel_learning_contractor,
    oel_learning_contractor_other,
    oel_learning_contractor_note,
    oel_participant_collaboration,
    oel_participant_collaboration_other,
    oel_participant_collaboration_note,
    oel_educate_beneficiaries,
    oel_educate_beneficiaries_other,
    oel_educate_beneficiaries_note,
    p_make_claims_payments,
    p_make_claims_payments_other,
    p_make_claims_payments_note,
    p_inform_ffs,
    p_inform_ffs_other,
    p_inform_ffs_note,
    p_non_claims_based_payments,
    p_non_claims_based_payments_other,
    p_non_claims_based_payments_note,
    p_shared_savings_plan,
    p_shared_savings_plan_other,
    p_shared_savings_plan_note,
    p_recover_payments,
    p_recover_payments_other,
    p_recover_payments_note,
    created_by,
    created_dts,
    modified_by,
    modified_dts,
    status
FROM plan_it_tools
WHERE model_plan_id = :model_plan_id;
