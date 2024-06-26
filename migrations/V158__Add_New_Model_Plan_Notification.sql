ALTER TYPE ACTIVITY_TYPE
  ADD VALUE 'NEW_MODEL_PLAN' AFTER 'MODEL_PLAN_SHARED';

ALTER TABLE user_notification_preferences
  ADD COLUMN new_model_plan user_notification_preference_flag[] DEFAULT '{}'::user_notification_preference_flag[];

COMMENT ON COLUMN user_notification_preferences.new_model_plan IS 'Notification preference for when a model plan is created';
