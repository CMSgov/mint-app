INSERT INTO plan_data_exchange_approach (
    id,
    model_plan_id,
    data_to_collect_from_participants,
    data_to_collect_from_participants_reports_details,
    data_to_collect_from_participants_other,
    data_will_not_be_collected_from_participants,
    data_to_collect_from_participants_note,
    data_to_send_to_participants,
    data_to_send_to_participants_note,
    does_need_to_make_multi_payer_data_available,
    anticipated_multi_payer_data_availability_use_case,
    does_need_to_make_multi_payer_data_available_note,
    does_need_to_collect_and_aggregate_multi_source_data,
    multi_source_data_to_collect,
    multi_source_data_to_collect_other,
    does_need_to_collect_and_aggregate_multi_source_data_note,
    will_implement_new_data_exchange_methods,
    new_data_exchange_methods_description,
    new_data_exchange_methods_note,
    additional_data_exchange_considerations_description,
    created_by,
    modified_by,
    marked_complete_by,
    marked_complete_dts,
    status
)
VALUES (
    :id,
    :model_plan_id,
    :data_to_collect_from_participants,
    :data_to_collect_from_participants_reports_details,
    :data_to_collect_from_participants_other,
    :data_will_not_be_collected_from_participants,
    :data_to_collect_from_participants_note,
    :data_to_send_to_participants,
    :data_to_send_to_participants_note,
    :does_need_to_make_multi_payer_data_available,
    :anticipated_multi_payer_data_availability_use_case,
    :does_need_to_make_multi_payer_data_available_note,
    :does_need_to_collect_and_aggregate_multi_source_data,
    :multi_source_data_to_collect,
    :multi_source_data_to_collect_other,
    :does_need_to_collect_and_aggregate_multi_source_data_note,
    :will_implement_new_data_exchange_methods,
    :new_data_exchange_methods_description,
    :new_data_exchange_methods_note,
    :additional_data_exchange_considerations_description,
    :created_by,
    :modified_by,
    :marked_complete_by,
    :marked_complete_dts,
    :status
)
RETURNING
id,
model_plan_id,
data_to_collect_from_participants,
data_to_collect_from_participants_reports_details,
data_to_collect_from_participants_other,
data_will_not_be_collected_from_participants,
data_to_collect_from_participants_note,
data_to_send_to_participants,
data_to_send_to_participants_note,
does_need_to_make_multi_payer_data_available,
anticipated_multi_payer_data_availability_use_case,
does_need_to_make_multi_payer_data_available_note,
does_need_to_collect_and_aggregate_multi_source_data,
multi_source_data_to_collect,
multi_source_data_to_collect_other,
does_need_to_collect_and_aggregate_multi_source_data_note,
will_implement_new_data_exchange_methods,
new_data_exchange_methods_description,
new_data_exchange_methods_note,
additional_data_exchange_considerations_description,
created_by,
created_dts,
modified_by,
modified_dts,
marked_complete_by,
marked_complete_dts,
status;
