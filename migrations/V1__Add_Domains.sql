CREATE DOMAIN EUA_ID AS TEXT
CONSTRAINT CHECK_VALID_EUA_ID CHECK (
    VALUE ~ '^[A-Z0-9]{4}$'
);

CREATE DOMAIN ZERO_STRING AS TEXT CHECK (length(value) > 0);

CREATE DOMAIN EMAIL AS TEXT
CONSTRAINT CHECK_VALID_EMAIL CHECK (
    VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);
