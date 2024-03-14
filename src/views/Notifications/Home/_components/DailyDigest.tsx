import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@trussworks/react-uswds';
import { GetNotifications_currentUser_notifications_notifications_activity_metaData_DailyDigestCompleteActivityMeta_analyzedAudits as AnalyzedAuditsTypes } from 'gql/gen/types/GetNotifications';

import UswdsReactLink from 'components/LinkWrapper';
import PageHeading from 'components/PageHeading';

const DailyDigest = ({
  analyzedAudits
}: {
  analyzedAudits: AnalyzedAuditsTypes[];
}) => {
  const { t: notificationsT } = useTranslation('notifications');

  return (
    <Grid
      desktop={{ col: 12 }}
      className="border-1 border-base-lightest padding-x-3 padding-y-5"
      data-testid="notification--daily-digest"
    >
      <PageHeading headingLevel="h2" className="margin-top-0 margin-bottom-4">
        {notificationsT('index.dailyDigest.heading')}
      </PageHeading>

      {analyzedAudits.map(({ modelName, modelPlanID }) => {
        return (
          <div key={modelPlanID} className="margin-bottom-4">
            <PageHeading
              headingLevel="h3"
              className="margin-top-0 margin-bottom-1"
            >
              {modelName}
            </PageHeading>
            <ul>
              <li />
            </ul>
            <UswdsReactLink to={`/models/${modelPlanID}/read-only/`}>
              {notificationsT('index.dailyDigest.cta')}
            </UswdsReactLink>
          </div>
        );
      })}

      <div className="border-top-1px border-base-light padding-top-2">
        <p className="margin-y-0">
          {notificationsT('index.dailyDigest.unsubscribe')}
        </p>
      </div>
    </Grid>
  );
};

export default DailyDigest;
