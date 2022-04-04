INSERT INTO model_plan (
        id,
        requester,
        requester_component,
        main_point_of_contact,
        point_of_contact_component,
        created_by,
        created_dts,
        modified_by        
    )
VALUES (
        :id,
        :requester, 
        :requester_component,
        :main_point_of_contact,
        :point_of_contact_component,
        :created_by,
        :created_dts,
        :modified_by
    )
    RETURNING 
        id,
        requester,
        requester_component,
        main_point_of_contact,
        point_of_contact_component,
        created_by,
        created_dts,
        modified_by,
        modified_dts
        ;