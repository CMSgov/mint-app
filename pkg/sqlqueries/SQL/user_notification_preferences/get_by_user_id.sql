SELECT
    id,
    user_id,
    daily_digest_complete_email,
    daily_digest_complete_in_app,
    added_as_collaborator_email,
    added_as_collaborator_in_app,
    tagged_in_discussion_email,
    tagged_in_discussion_in_app,
    tagged_in_discussion_reply_email,
    tagged_in_discussion_reply_in_app,
    new_discussion_reply_email,
    new_discussion_reply_in_app,
    model_plan_shared_email,
    model_plan_shared_in_app,
    new_plan_discussion_email,
    new_plan_discussion_in_app,
    created_by,
    created_dts,
    modified_by,
    modified_dts
FROM user_notification_preferences
WHERE user_id = :user_id;
