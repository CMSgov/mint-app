import React from 'react';
import { Trans } from 'react-i18next';
import { Icon } from '@trussworks/react-uswds';
import {
  GetNotifications_currentUser_notifications_notifications_activity_metaData as MetaDataType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_DailyDigestCompleteActivityMeta as DailyDigestCompleteActivityType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_DailyDigestCompleteActivityMeta_analyzedAudits_changes as ChangeTypes,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_TaggedInDiscussionReplyActivityMeta as TaggedInDiscussionReplyActivityType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_TaggedInPlanDiscussionActivityMeta as TaggedInDiscussionActivityType
} from 'gql/gen/types/GetNotifications';

// Type guard to check union type
export const isTaggedInDiscussion = (
  data:
    | TaggedInDiscussionReplyActivityType
    | TaggedInDiscussionActivityType
    | DailyDigestCompleteActivityType
): data is TaggedInDiscussionActivityType => {
  /* eslint no-underscore-dangle: 0 */
  return data.__typename === 'TaggedInPlanDiscussionActivityMeta';
};

export const isTaggedInDiscussionReply = (
  data:
    | TaggedInDiscussionReplyActivityType
    | TaggedInDiscussionActivityType
    | DailyDigestCompleteActivityType
): data is TaggedInDiscussionReplyActivityType => {
  /* eslint no-underscore-dangle: 0 */
  return data.__typename === 'TaggedInDiscussionReplyActivityMeta';
};

export const isDailyDigest = (
  data:
    | TaggedInDiscussionReplyActivityType
    | TaggedInDiscussionActivityType
    | DailyDigestCompleteActivityType
): data is DailyDigestCompleteActivityType => {
  /* eslint no-underscore-dangle: 0 */
  return data.__typename === 'DailyDigestCompleteActivityMeta';
};

export const activityText = (data: MetaDataType) => {
  if (isTaggedInDiscussion(data)) {
    return (
      <Trans
        i18nKey="notifications:index.activityType.taggedInDiscussion.text"
        values={{ modelName: data.modelPlan.modelName }}
      />
    );
  }
  if (isTaggedInDiscussionReply(data)) {
    return (
      <Trans
        i18nKey="notifications:index.activityType.taggedInDiscussionReply.text"
        values={{ modelName: data.modelPlan.modelName }}
      />
    );
  }
  if (isDailyDigest(data)) {
    return (
      <Trans i18nKey="notifications:index.activityType.dailyDigestComplete.text" />
    );
  }
  return '';
};

export const ActivityCTA = ({
  data,
  isExpanded
}: {
  data: MetaDataType;
  isExpanded: boolean;
}) => {
  if (isTaggedInDiscussion(data)) {
    return (
      <>
        <Trans i18nKey="notifications:index.activityType.taggedInDiscussion.cta" />
        <Icon.ArrowForward className="margin-left-1" aria-hidden />
      </>
    );
  }
  if (isTaggedInDiscussionReply(data)) {
    return (
      <>
        <Trans i18nKey="notifications:index.activityType.taggedInDiscussionReply.cta" />
        <Icon.ArrowForward className="margin-left-1" aria-hidden />
      </>
    );
  }
  if (isDailyDigest(data)) {
    return isExpanded ? (
      <>
        <Trans i18nKey="notifications:index.activityType.dailyDigestComplete.cta.hide" />
        <Icon.ExpandLess className="margin-left-1" aria-hidden />
      </>
    ) : (
      <>
        <Trans i18nKey="notifications:index.activityType.dailyDigestComplete.cta.show" />
        <Icon.ExpandMore className="margin-left-1" aria-hidden />
      </>
    );
  }
  return <></>;
};

export const pushValuesToChangesArray = (
  obj: ChangeTypes,
  changesArray: string[]
) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (key !== '__typename') {
      // Ignore key values that where the key is '__typename'
      if (Array.isArray(value) && value.length > 0) {
        // Ignore empty arrays (i.e. [])
        if (key === 'added') {
          // Model Lead added is important, so pushed to the front of array to ensure it will always be shown
          changesArray.unshift(key);
        } else {
          changesArray.push(key);
        }
      } else if (typeof value === 'string' && value.trim() !== '') {
        // Push the key if only the value is not an empty string (i.e. '')
        changesArray.push(key);
      } else if (typeof value === 'number') {
        // Push the key if the value is a number
        changesArray.push(key);
      } else if (typeof value === 'boolean' && value) {
        // Push the key if the boolean value is true, ignore if false
        changesArray.push(key);
      } else if (value !== null && typeof value === 'object') {
        if (key === 'crTdls' || key === 'planDiscussions') {
          // Push the key if it is 'crTdls' & 'planDiscussions'
          changesArray.push(key);
        } else {
          // push the object into the function
          pushValuesToChangesArray(value, changesArray);
        }
      }
    }
  });
};
