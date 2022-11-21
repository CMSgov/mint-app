CREATE TABLE user_account (
    id UUID PRIMARY KEY NOT NULL,
    eua_id EUA_ID,
    idm_username ZERO_STRING,
    common_name ZERO_STRING NOT NULL,
    email ZERO_STRING NOT NULL
);

ALTER TABLE user_account
ADD CONSTRAINT unique_euaid UNIQUE (eua_id);

ALTER TABLE user_account
ADD CONSTRAINT unique_idm_username UNIQUE (idm_username);

ALTER TABLE user_account ADD CONSTRAINT eua_id_or_id_username_null_if CHECK (
    (eua_id IS NOT NULL AND idm_username IS NULL) -- User is an EUA user
    OR
    (eua_id IS NULL AND idm_username IS NOT NULL) -- User is an IDM user
);

COMMENT ON CONSTRAINT eua_id_or_id_username_null_if ON user_account IS '
This checks to make sure that either the EUA_ID is null, or the idm_username is null.
You cannot have both be null.
'
