-- Create the new type
CREATE TYPE ACTIVITY_TYPE AS ENUM (
  'DAILY_DIGEST_COMPLETE',
  'NEW_PLAN_DISCUSSION',
  'NEW_DISCUSSION_REPLY'
);

CREATE TABLE activity ( --TODO settle on naming. The word event is reserved
    id UUID PRIMARY KEY NOT NULL,
    actor UUID NOT NULL REFERENCES user_account(id), --foreign key to user table
    activity_type ACTIVITY_TYPE NOT NULL,

    --META DATA
    created_by UUID NOT NULL REFERENCES user_account(id), --Who wrote this row, not necessarily the actor, though it could be the same
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by UUID REFERENCES user_account(id),
    modified_dts TIMESTAMP WITH TIME ZONE

);

--NOTE these tables likely doesn't need to be audited. It is an audit table by itself. If we want, we can audit it though

CREATE TABLE user_notification ( --TODO settle on naming. The word notification is reserved
    id UUID PRIMARY KEY NOT NULL,
    publication_id UUID NOT NULL REFERENCES publication(id), --foreign key to user table
    user_id UUID NOT NULL REFERENCES user_account(id),
    is_read  BOOLEAN NOT NULL DEFAULT FALSE,


    --META DATA
    created_by UUID NOT NULL REFERENCES user_account(id), --Who wrote this row, not necessarily the actor, though it could be the same
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by UUID REFERENCES user_account(id),
    modified_dts TIMESTAMP WITH TIME ZONE

);

CREATE TABLE user_notification_preferences (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES user_account(id),

    daily_digest_email BOOLEAN NOT NULL DEFAULT TRUE,
    daily_digest_in_app BOOLEAN NOT NULL DEFAULT TRUE,

    new_plan_discussion_email BOOLEAN NOT NULL DEFAULT TRUE,
    new_plan_discussion_in_app BOOLEAN NOT NULL DEFAULT TRUE,

    new_discussion_reply_email BOOLEAN NOT NULL DEFAULT TRUE,
    new_discussion_reply_in_app BOOLEAN NOT NULL DEFAULT TRUE,

    --META DATA
    created_by UUID NOT NULL REFERENCES user_account(id),
    created_dts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_by UUID REFERENCES user_account(id),
    modified_dts TIMESTAMP WITH TIME ZONE

)
