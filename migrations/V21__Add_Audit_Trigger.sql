CREATE FUNCTION audit.if_modified() RETURNS TRIGGER AS $audit_table$
DECLARE
    audit_row audit.change;
    include_values boolean;
    log_diffs boolean;
    h_old hstore;
    h_new hstore;
    table_id int;
    excluded_cols text[] = ARRAY[]::text[];
    insert_cols text[] = ARRAY[]::text[];
	pkey_f TEXT;
    fkey_f TEXT;
    created_by_f TEXT;
    modified_by_f TEXT;
    h_changed HSTORE;
    diff_keys text[] = ARRAY[]::text[];
    changeJSON JSONB;
BEGIN

    IF TG_WHEN <> 'AFTER' THEN
        RAISE EXCEPTION 'audit.audit_trigger() may only run as an AFTER trigger';
    END IF;
    
    SELECT 
    id,
    ignored_fields,
    insert_fields,
    created_by_field,
    modified_by_field,
    pkey_field,
    fkey_field
    INTO
    table_id,
    excluded_cols,
    insert_cols,
    created_by_f,
    modified_by_f,
    pkey_f,
    fkey_f
    FROM audit.table_config
    WHERE schema =TG_TABLE_SCHEMA::text AND name = TG_TABLE_NAME::text;

    h_new= hstore(NEW.*);
    h_old= hstore(OLD.*);

    diff_keys = (akeys(h_new - insert_cols)); --these are the keys to subract from all the keys on insert or deleted
    IF TG_OP = 'INSERT' OR TG_OP = 'DELETE' THEN
        h_changed = (h_new -h_old) -diff_keys; --remove matching values, and only  show specific columns for insert /delete
    ELSE
        h_changed = (h_new - h_old) - excluded_cols; --remove matching values and excluded columns
    END If;

    IF TG_OP = 'UPDATE' AND h_changed = hstore('') THEN
       RETURN NULL;
    END IF;  -- All changed fields are ignored. Skip this update.
        WITH NEWval AS
        (
            SELECT (EACH(h_changed)).*
        )
        ,RESULTSet AS 
        (
            SELECT 
            NEWval.key AS field,
            NEWval.value AS new,
            h_old -> NEWval.key AS old 
            FROM NEWval
        )
        SELECT jsonb_object_agg(field,(to_jsonb(r) - 'field'))
        INTO changeJSON
            FROM RESULTSet r;
    audit_row = ROW (
    nextval('audit.change_id_seq'), --id
        table_id, --table_id
        h_new -> pkey_f, --primary_key
        h_new -> fkey_f, --foreign_key
        substring(TG_OP,1,1), --action
        changeJSON, --fields
        NEW.modified_by, --modified_by
        CURRENT_TIMESTAMP --modified_dts
    );
    IF (TG_OP = 'DELETE' AND TG_LEVEL = 'ROW') THEN
        audit_row.modified_by = 'UNKN'; --We don't have the context of who deleted the row
        audit_row.primary_key = h_old -> pkey_f; --New is null
        audit_row.foreign_key = h_old -> fkey_f;
    ELSIF (TG_OP = 'INSERT' AND TG_LEVEL = 'ROW') THEN
        audit_row.modified_by = NEW.created_by;
        audit_row.modified_dts = NEW.created_dts;
    END IF;

    INSERT INTO audit.change VALUES(audit_row.*);
    RETURN NULL;



END;
$audit_table$ LANGUAGE plpgsql
SECURITY DEFINER --Run trigger as the creator of the trigger
SET search_path = pg_catalog, public;
