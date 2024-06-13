SELECT 
    id,
    translated_audit_id,
    change_type,
    field_name,
    field_name_translated,
    field_order,
    reference_label,
    question_type,
    not_applicable_questions,
    data_type,
    form_type,
    old,
    old_translated,
    new,
    new_translated,
    meta_data,
    created_by,
    created_dts,
    modified_by,
    modified_dts
FROM translated_audit_field
WHERE translated_audit_id = :translated_audit_id
ORDER BY field_order;
