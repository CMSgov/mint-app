INSERT INTO plan_ops_eval_and_learning(
    id,
    model_plan_id,
    stakeholders,
    stakeholders_other,
    stakeholders_note,
    helpdesk_use,
    helpdesk_use_note,
    contractor_support,
    contractor_support_other,
    contractor_support_how,
    contractor_support_note,
    iddoc_support,
    iddoc_support_note,
    technical_contacts_identified,
    technical_contacts_identified_detail,
    technical_contacts_identified_note,
    capture_participant_info,
    capture_participant_info_note,
    icd_owner,
    draft_icd_due_date,
    icd_note,
    uat_needs,
    stc_needs,
    testing_timelines,
    testing_note,
    data_monitoring_file_types,
    data_monitoring_file_other,
    data_response_type,
    data_response_file_frequency,
    data_full_time_or_incremental,
    eft_set_up,
    unsolicited_adjustments_included,
    data_flow_diagrams_needed,
    produce_benefit_enhancement_files,
    file_naming_conventions,
    data_monitoring_note,
    benchmark_for_performance,
    benchmark_for_performance_note,
    compute_performance_scores,
    compute_performance_scores_note,
    risk_adjust_performance,
    risk_adjust_feedback,
    risk_adjust_payments,
    risk_adjust_other,
    risk_adjust_note,
    appeal_performance,
    appeal_feedback,
    appeal_payments,
    appeal_other,
    appeal_note,
    evaluation_approaches,
    evaluation_approach_other,
    evalutaion_approach_note,
    ccm_involvment,
    ccm_involvment_other,
    ccm_involvment_note,
    data_needed_for_monitoring,
    data_needed_for_monitoring_other,
    data_needed_for_monitoring_note,
    data_to_send_particicipants,
    data_to_send_particicipants_other,
    data_to_send_particicipants_note,
    share_cclf_data,
    share_cclf_data_note,
    send_files_between_ccw,
    send_files_between_ccw_note,
    app_to_send_files_to_known,
    app_to_send_files_to_which,
    app_to_send_files_to_note,
    use_ccw_for_file_distribiution_to_participants,
    use_ccw_for_file_distribiution_to_participants_note,
    develop_new_quality_measures,
    develop_new_quality_measures_note,
    quality_performance_impacts_payment,
    quality_performance_impacts_payment_other,
    quality_performance_impacts_payment_note,
    data_sharing_starts,
    data_sharing_starts_other,
    data_sharing_frequency,
    data_sharing_frequency_continually,
    data_sharing_frequency_other,
    data_sharing_starts_note,
    data_collection_starts,
    data_collection_starts_other,
    data_collection_frequency,
    data_collection_frequency_continually,
    data_collection_frequency_other,
    data_collection_frequency_note,
    quality_reporting_starts,
    quality_reporting_starts_other,
    quality_reporting_starts_note,
    quality_reporting_frequency,
    quality_reporting_frequency_continually,
    quality_reporting_frequency_other,
    model_learning_systems,
    model_learning_systems_other,
    model_learning_systems_note,
    anticipated_challenges,
    created_by,
    modified_by,
    ready_for_review_by,
    ready_for_review_dts,
    ready_for_clearance_by,
    ready_for_clearance_dts,
    status
)
VALUES (
    :id,
    :model_plan_id,
    :stakeholders,
    :stakeholders_other,
    :stakeholders_note,
    :helpdesk_use,
    :helpdesk_use_note,
    :contractor_support,
    :contractor_support_other,
    :contractor_support_how,
    :contractor_support_note,
    :iddoc_support,
    :iddoc_support_note,
    :technical_contacts_identified,
    :technical_contacts_identified_detail,
    :technical_contacts_identified_note,
    :capture_participant_info,
    :capture_participant_info_note,
    :icd_owner,
    :draft_icd_due_date,
    :icd_note,
    :uat_needs,
    :stc_needs,
    :testing_timelines,
    :testing_note,
    :data_monitoring_file_types,
    :data_monitoring_file_other,
    :data_response_type,
    :data_response_file_frequency,
    :data_full_time_or_incremental,
    :eft_set_up,
    :unsolicited_adjustments_included,
    :data_flow_diagrams_needed,
    :produce_benefit_enhancement_files,
    :file_naming_conventions,
    :data_monitoring_note,
    :benchmark_for_performance,
    :benchmark_for_performance_note,
    :compute_performance_scores,
    :compute_performance_scores_note,
    :risk_adjust_performance,
    :risk_adjust_feedback,
    :risk_adjust_payments,
    :risk_adjust_other,
    :risk_adjust_note,
    :appeal_performance,
    :appeal_feedback,
    :appeal_payments,
    :appeal_other,
    :appeal_note,
    :evaluation_approaches,
    :evaluation_approach_other,
    :evalutaion_approach_note,
    :ccm_involvment,
    :ccm_involvment_other,
    :ccm_involvment_note,
    :data_needed_for_monitoring,
    :data_needed_for_monitoring_other,
    :data_needed_for_monitoring_note,
    :data_to_send_particicipants,
    :data_to_send_particicipants_other,
    :data_to_send_particicipants_note,
    :share_cclf_data,
    :share_cclf_data_note,
    :send_files_between_ccw,
    :send_files_between_ccw_note,
    :app_to_send_files_to_known,
    :app_to_send_files_to_which,
    :app_to_send_files_to_note,
    :use_ccw_for_file_distribiution_to_participants,
    :use_ccw_for_file_distribiution_to_participants_note,
    :develop_new_quality_measures,
    :develop_new_quality_measures_note,
    :quality_performance_impacts_payment,
    :quality_performance_impacts_payment_other,
    :quality_performance_impacts_payment_note,
    :data_sharing_starts,
    :data_sharing_starts_other,
    :data_sharing_frequency,
    :data_sharing_frequency_continually,
    :data_sharing_frequency_other,
    :data_sharing_starts_note,
    :data_collection_starts,
    :data_collection_starts_other,
    :data_collection_frequency,
    :data_collection_frequency_continually,
    :data_collection_frequency_other,
    :data_collection_frequency_note,
    :quality_reporting_starts,
    :quality_reporting_starts_other,
    :quality_reporting_starts_note,
    :quality_reporting_frequency,
    :quality_reporting_frequency_continually,
    :quality_reporting_frequency_other,
    :model_learning_systems,
    :model_learning_systems_other,
    :model_learning_systems_note,
    :anticipated_challenges,
    :created_by,
    :modified_by,
    :ready_for_review_by,
    :ready_for_review_dts,
    :ready_for_clearance_by,
    :ready_for_clearance_dts,
    :status
) RETURNING
id,
model_plan_id,
stakeholders,
stakeholders_other,
stakeholders_note,
helpdesk_use,
helpdesk_use_note,
contractor_support,
contractor_support_other,
contractor_support_how,
contractor_support_note,
iddoc_support,
iddoc_support_note,
technical_contacts_identified,
technical_contacts_identified_detail,
technical_contacts_identified_note,
capture_participant_info,
capture_participant_info_note,
icd_owner,
draft_icd_due_date,
icd_note,
uat_needs,
stc_needs,
testing_timelines,
testing_note,
data_monitoring_file_types,
data_monitoring_file_other,
data_response_type,
data_response_file_frequency,
data_full_time_or_incremental,
eft_set_up,
unsolicited_adjustments_included,
data_flow_diagrams_needed,
produce_benefit_enhancement_files,
file_naming_conventions,
data_monitoring_note,
benchmark_for_performance,
benchmark_for_performance_note,
compute_performance_scores,
compute_performance_scores_note,
risk_adjust_performance,
risk_adjust_feedback,
risk_adjust_payments,
risk_adjust_other,
risk_adjust_note,
appeal_performance,
appeal_feedback,
appeal_payments,
appeal_other,
appeal_note,
evaluation_approaches,
evaluation_approach_other,
evalutaion_approach_note,
ccm_involvment,
ccm_involvment_other,
ccm_involvment_note,
data_needed_for_monitoring,
data_needed_for_monitoring_other,
data_needed_for_monitoring_note,
data_to_send_particicipants,
data_to_send_particicipants_other,
data_to_send_particicipants_note,
share_cclf_data,
share_cclf_data_note,
send_files_between_ccw,
send_files_between_ccw_note,
app_to_send_files_to_known,
app_to_send_files_to_which,
app_to_send_files_to_note,
use_ccw_for_file_distribiution_to_participants,
use_ccw_for_file_distribiution_to_participants_note,
develop_new_quality_measures,
develop_new_quality_measures_note,
quality_performance_impacts_payment,
quality_performance_impacts_payment_other,
quality_performance_impacts_payment_note,
data_sharing_starts,
data_sharing_starts_other,
data_sharing_frequency,
data_sharing_frequency_continually,
data_sharing_frequency_other,
data_sharing_starts_note,
data_collection_starts,
data_collection_starts_other,
data_collection_frequency,
data_collection_frequency_continually,
data_collection_frequency_other,
data_collection_frequency_note,
quality_reporting_starts,
quality_reporting_starts_other,
quality_reporting_starts_note,
quality_reporting_frequency,
quality_reporting_frequency_continually,
quality_reporting_frequency_other,
model_learning_systems,
model_learning_systems_other,
model_learning_systems_note,
anticipated_challenges,
created_by,
created_dts,
modified_by,
modified_dts,
ready_for_review_by,
ready_for_review_dts,
ready_for_clearance_by,
ready_for_clearance_dts,
status;
