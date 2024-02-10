INSERT INTO public.tag(
    id,
    tag_type,
    tagged_field,
    tagged_content_table,
    tagged_content_id,
    entity_uuid,
    entity_intid,
    created_by,
    modified_by
)
VALUES (
    :id,
    :tag_type,
    :tagged_field,
    :tagged_content_table,
    :tagged_content_id,
    :entity_uuid,
    :entity_intid,
    :created_by,
    :modified_by
)
RETURNING id,
tag_type,
tagged_field,
tagged_content_table,
tagged_content_id,
entity_uuid,
entity_intid,
created_dts,
modified_dts,
created_by,
modified_by;    
