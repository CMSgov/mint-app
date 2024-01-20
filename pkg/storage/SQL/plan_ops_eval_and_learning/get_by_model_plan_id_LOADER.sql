WITH QUERIED_IDS AS (
    /*Translate the input to a table */
    SELECT model_plan_id
    FROM
        JSON_TO_RECORDSET(:paramTableJSON)
        AS x("model_plan_id" UUID) --noqa
)

SELECT
    oel.id,
    oel.model_plan_id,
    oel.agency_or_state_help,
    oel.agency_or_state_help_other,
    oel.agency_or_state_help_note,
    oel.stakeholders,
    oel.stakeholders_other,
    oel.stakeholders_note,
    oel.helpdesk_use,
    oel.helpdesk_use_note,
    oel.contractor_support,
    oel.contractor_support_other,
    oel.contractor_support_how,
    oel.contractor_support_note,
    oel.iddoc_support,
    oel.iddoc_support_note,
    oel.technical_contacts_identified,
    oel.technical_contacts_identified_detail,
    oel.technical_contacts_identified_note,
    oel.capture_participant_info,
    oel.capture_participant_info_note,
    oel.icd_owner,
    oel.draft_icd_due_date,
    oel.icd_note,
    oel.uat_needs,
    oel.stc_needs,
    oel.testing_timelines,
    oel.testing_note,
    oel.data_monitoring_file_types,
    oel.data_monitoring_file_other,
    oel.data_response_type,
    oel.data_response_file_frequency,
    oel.data_full_time_or_incremental,
    oel.eft_set_up,
    oel.unsolicited_adjustments_included,
    oel.data_flow_diagrams_needed,
    oel.produce_benefit_enhancement_files,
    oel.file_naming_conventions,
    oel.data_monitoring_note,
    oel.benchmark_for_performance,
    oel.benchmark_for_performance_note,
    oel.compute_performance_scores,
    oel.compute_performance_scores_note,
    oel.risk_adjust_performance,
    oel.risk_adjust_feedback,
    oel.risk_adjust_payments,
    oel.risk_adjust_other,
    oel.risk_adjust_note,
    oel.appeal_performance,
    oel.appeal_feedback,
    oel.appeal_payments,
    oel.appeal_other,
    oel.appeal_note,
    oel.evaluation_approaches,
    oel.evaluation_approach_other,
    oel.evalutaion_approach_note,
    oel.ccm_involvment,
    oel.ccm_involvment_other,
    oel.ccm_involvment_note,
    oel.data_needed_for_monitoring,
    oel.data_needed_for_monitoring_other,
    oel.data_needed_for_monitoring_note,
    oel.data_to_send_particicipants,
    oel.data_to_send_particicipants_other,
    oel.data_to_send_particicipants_note,
    oel.share_cclf_data,
    oel.share_cclf_data_note,
    oel.send_files_between_ccw,
    oel.send_files_between_ccw_note,
    oel.app_to_send_files_to_known,
    oel.app_to_send_files_to_which,
    oel.app_to_send_files_to_note,
    oel.use_ccw_for_file_distribiution_to_participants,
    oel.use_ccw_for_file_distribiution_to_participants_note,
    oel.develop_new_quality_measures,
    oel.develop_new_quality_measures_note,
    oel.quality_performance_impacts_payment,
    oel.quality_performance_impacts_payment_other,
    oel.quality_performance_impacts_payment_note,
    oel.data_sharing_starts,
    oel.data_sharing_starts_other,
    oel.data_sharing_frequency,
    oel.data_sharing_frequency_continually,
    oel.data_sharing_frequency_other,
    oel.data_sharing_starts_note,
    oel.data_collection_starts,
    oel.data_collection_starts_other,
    oel.data_collection_frequency,
    oel.data_collection_frequency_continually,
    oel.data_collection_frequency_other,
    oel.data_collection_frequency_note,
    oel.quality_reporting_starts,
    oel.quality_reporting_starts_other,
    oel.quality_reporting_starts_note,
    oel.quality_reporting_frequency,
    oel.quality_reporting_frequency_continually,
    oel.quality_reporting_frequency_other,
    oel.model_learning_systems,
    oel.model_learning_systems_other,
    oel.model_learning_systems_note,
    oel.anticipated_challenges,
    oel.created_by,
    oel.created_dts,
    oel.modified_by,
    oel.modified_dts,
    oel.ready_for_review_by,
    oel.ready_for_review_dts,
    oel.ready_for_clearance_by,
    oel.ready_for_clearance_dts,
    oel.status

FROM QUERIED_IDS AS qIDs
INNER JOIN plan_ops_eval_and_learning AS oel ON oel.model_plan_id = qIDs.model_plan_id;
