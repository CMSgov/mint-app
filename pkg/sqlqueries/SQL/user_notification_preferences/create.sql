INSERT INTO public.user_notification_preferences(
    id,
    user_id,
    daily_digest_complete,
    added_as_collaborator,
    tagged_in_discussion,
    tagged_in_discussion_reply,
    new_discussion_reply,
    model_plan_shared,
    new_plan_discussion,
    created_by
)
VALUES (
    :id,
    :user_id,
    :daily_digest_complete,
    :added_as_collaborator,
    :tagged_in_discussion,
    :tagged_in_discussion_reply,
    :new_discussion_reply,
    :model_plan_shared,
    :new_plan_discussion,
    :created_by
)
RETURNING
id,
user_id,
daily_digest_complete,
added_as_collaborator,
tagged_in_discussion,
tagged_in_discussion_reply,
new_discussion_reply,
model_plan_shared,
new_plan_discussion,
created_by,
created_dts,
modified_by,
modified_dts;    
