create table model_plan (
    id uuid PRIMARY KEY not null,
    eua_user_id text CHECK (eua_user_id ~ '^[A-Z0-9]{4}$'::text),
    requester text CHECK (requester IS NOT NULL),
    requester_component text,
    Main_Point_Of_Contact text,
    Point_Of_Contact_Component text,
    created_by text, --this could be the eua_user_id?
    created_dts timestamp with time zone,
    modified_by text, --this could be the eua_user_id?
    modified_dts timestamp with time zone

);
