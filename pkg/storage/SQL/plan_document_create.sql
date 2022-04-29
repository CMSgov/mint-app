INSERT INTO plan_document (
        id,
        model_plan_id,
        file_type,
        bucket,
        file_key,
        virus_scanned,
        virus_clean,
        file_name,
        file_size,
        document_type,
        other_type,
        deleted_at,
        created_by,
        modified_by
    )
VALUES (
        :id,
        :model_plan_id,
        :file_type,
        :bucket,
        :file_key,
        :virus_scanned,
        :virus_clean,
        :file_name,
        :file_size,
        :document_type,
        :other_type,
        :deleted_at,
        :created_by,
        :modified_by
    )
    RETURNING *;
