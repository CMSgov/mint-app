CREATE TABLE plan_document (
    id uuid PRIMARY KEY,
    model_plan_id uuid not null,
    file_type text NOT NULL,
    bucket text NOT NULL,
    file_key text NOT NULL,

    virus_scanned boolean,
    virus_clean boolean,
    file_name text NOT NULL,
    file_size integer NOT NULL,
    document_type text NOT NULL, --  make enum for this
    other_type text,
    deleted_at timestamp with time zone, --previously without timeZone...
    --CONSTRAINT other_type_is_null_unless_type_is_other CHECK (document_type = 'OTHER'::accessibility_request_document_type) = (other_type IS NOT NULL AND other_type <> ''::text)

    created_by eua_id,
    created_dts timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by eua_id,
    modified_dts timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE plan_document
    ADD CONSTRAINT fk_document_plan FOREIGN KEY (model_plan_id)
        REFERENCES public.model_plan (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
