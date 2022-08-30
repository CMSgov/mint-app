CREATE SCHEMA audit CREATE TABLE audit.table (
    id INT PRIMARY KEY NOT NULL,
    --page 1
    schema TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE,
    --META DATA
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX idx_audit_table_schema_name ON audit.table(schema, name);
CREATE TABLE audit.table_config (
    id INT PRIMARY KEY NOT NULL,
    table_id INT,
    --META DATA
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE
);
ALTER TABLE audit.table_config
ADD CONSTRAINT fk_config_table FOREIGN KEY (table_id) REFERENCES audit.table (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;
CREATE TABLE audit.change (
    id INT PRIMARY KEY NOT NULL,
    table_id INT,
    field_name TEXT NOT NULL,
    old_value TEXT NOT NULL,
    new_value TEXT NOT NULL,
    --META DATA
    created_by EUA_ID NOT NULL,
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by EUA_ID,
    modified_dts TIMESTAMP WITH TIME ZONE
);
ALTER TABLE audit.change
ADD CONSTRAINT fk_change_table FOREIGN KEY (table_id) REFERENCES audit.table (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION;
