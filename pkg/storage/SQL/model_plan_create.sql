INSERT INTO model_plan (
        id,
        model_name,
        model_category,
        cms_center,
        cmmi_group,
        created_by,
        modified_by
    )
VALUES (
        :id,
        :model_name,
        NULLIF(:model_category, ''),
        NULLIF(:cms_center, ''),
        NULLIF(:cmmi_group, ''),
        :created_by,
        :modified_by
    )
    RETURNING 
        id,
        model_name,
        model_category,
        cms_center,
        cmmi_group,
        created_by,
        created_dts,
        modified_by,
        modified_dts
        ;