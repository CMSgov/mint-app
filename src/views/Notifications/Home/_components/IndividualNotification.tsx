import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Icon } from '@trussworks/react-uswds';
import {
  GetNotifications_currentUser_notifications_notifications_activity as NotificationActivityType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_ActivityMetaBaseStruct as BaseStructActivityType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_TaggedInDiscussionReplyActivityMeta as TaggedInDiscussionReplyActivityType,
  GetNotifications_currentUser_notifications_notifications_activity_metaData_TaggedInPlanDiscussionActivityMeta as TaggedInDiscussionActivityType
} from 'gql/gen/types/GetNotifications';

import { arrayOfColors } from 'components/shared/IconInitial';
import MentionTextArea from 'components/shared/MentionTextArea';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import { getTimeElapsed } from 'utils/date';
import { getUserInitials } from 'utils/modelPlan';

type IndividualNotificationProps = {
  index?: number;
  isRead: boolean;
  createdDts: string;
  activity: NotificationActivityType;
};

const IndividualNotification = ({
  index = 0,
  isRead,
  createdDts,
  activity: {
    metaData,
    actorUserAccount: { commonName }
  }
}: IndividualNotificationProps) => {
  const { t: notificationsT } = useTranslation('notifications');
  const { t: discussionT } = useTranslation('discussions');

  const history = useHistory();
  const isMobile = useCheckResponsiveScreen('mobile');

  // Type guard to check union type
  const isTaggedInDiscussion = (
    data:
      | TaggedInDiscussionReplyActivityType
      | TaggedInDiscussionActivityType
      | BaseStructActivityType
  ): data is TaggedInDiscussionReplyActivityType => {
    /* eslint no-underscore-dangle: 0 */
    return data.__typename === 'TaggedInPlanDiscussionActivityMeta';
  };

  return (
    <Grid row>
      <Grid desktop={{ col: 12 }} className="position-relative">
        {/* Notification Red Dot */}
        {!isRead && (
          <div className="circle-1 bg-error position-absolute margin-top-3 margin-left-1" />
        )}

        <div
          className={`padding-3 display-flex flex-justify ${
            isRead ? 'bg-gray-2' : ''
          }`}
        >
          {isTaggedInDiscussion(metaData) && (
            <div className="flex-9">
              <div className="display-flex flex-align-center margin-bottom-05">
                <div
                  className={`display-flex flex-align-center flex-justify-center circle-4 ${
                    arrayOfColors[index % arrayOfColors.length]
                  }`}
                >
                  {getUserInitials(commonName)}
                </div>

                <span className="margin-left-1 margin-bottom-1">
                  <strong>{commonName}</strong>
                  {notificationsT(
                    'index.activityType.taggedInDiscussion.text',
                    {
                      modelName: metaData.modelPlan.modelName
                    }
                  )}
                </span>
              </div>
              <div className="margin-left-5">
                {!isMobile && (
                  <span>
                    <MentionTextArea
                      className="text-base-darker"
                      id={`mention-${metaData.discussionID}`}
                      editable={false}
                      initialContent={`“${metaData.content}”`}
                    />
                  </span>
                )}

                <Button
                  type="button"
                  unstyled
                  className="display-flex flex-align-center"
                  onClick={() => {
                    // markAsRead();
                    history.push(
                      `/models/${metaData.modelPlanID}/task-list?discussionID=${metaData.discussionID}`
                    );
                  }}
                >
                  {notificationsT('index.activityType.taggedInDiscussion.cta')}
                  <Icon.ArrowForward className="margin-left-1" aria-hidden />
                </Button>
              </div>
            </div>
          )}
          <span className="flex-3 text-base-darker text-right">
            {getTimeElapsed(createdDts)
              ? getTimeElapsed(createdDts) + discussionT('ago')
              : discussionT('justNow')}
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

export default IndividualNotification;
