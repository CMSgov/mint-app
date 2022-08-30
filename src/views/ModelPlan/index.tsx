import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Grid,
  GridContainer,
  SummaryBox
} from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';

const ModelPlan = () => {
  const { t } = useTranslation('readOnlyModelPlan');
  const { t: h } = useTranslation('home');

  return (
    <MainContent>
      <GridContainer>
        <Grid className="padding-bottom-6 margin-bottom-4 border-bottom border-base-light">
          <PageHeading className="margin-bottom-1">{t('heading')}</PageHeading>
          <p className="line-height-body-5 font-body-lg text-light margin-bottom-05 margin-top-0">
            {t('subheading')}
          </p>
          <UswdsReactLink variant="unstyled" to="/models#all-models">
            {t('allModelsLink')}
          </UswdsReactLink>
          <SummaryBox
            heading=""
            className="bg-base-lightest border-0 radius-0 padding-2 padding-bottom-3 margin-top-3 "
          >
            <p className="margin-0 margin-bottom-1">
              {h('newModelSummaryBox.copy')}
            </p>
            <UswdsReactLink
              className="usa-button usa-button--outline"
              variant="unstyled"
              to="/models/steps-overview"
            >
              {h('newModelSummaryBox.cta')}
            </UswdsReactLink>
          </SummaryBox>
        </Grid>

        <Grid className="padding-bottom-6 margin-bottom-4 border-bottom border-base-light">
          <PageHeading className="margin-bottom-1">
            {t('following.heading')}
          </PageHeading>
          <p className="line-height-body-5 font-body-lg text-light margin-bottom-05 margin-top-0">
            {t('following.subheading')}
          </p>
          <Alert type="info" heading={t('following.alert.heading')}>
            {t('following.alert.subheading')}
          </Alert>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default ModelPlan;
