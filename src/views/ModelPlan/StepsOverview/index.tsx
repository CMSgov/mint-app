import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Link as UswdsLink,
  ProcessList,
  ProcessListHeading,
  ProcessListItem,
  SummaryBox
} from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';

import './index.scss';

const StepsOverview = () => {
  const { t } = useTranslation('modelPlan');

  return (
    <MainContent>
      <div className="grid-container">
        <div className="tablet:grid-col-12">
          <BreadcrumbBar variant="wrap">
            <Breadcrumb>
              <BreadcrumbLink asCustom={Link} to="/">
                <span>Home</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>{t('stepsOverview.heading')}</Breadcrumb>
          </BreadcrumbBar>
          <PageHeading>{t('stepsOverview.heading')}</PageHeading>
          <SummaryBox
            heading=""
            className="bg-base-lightest border-0 radius-0 padding-y-1 padding-x-2"
          >
            <p className="margin-top-0">{t('stepsOverview.summaryBox.copy')}</p>
            <ul className="padding-left-3">
              <li>{t('stepsOverview.summaryBox.listItem.add')}</li>
              <li>{t('stepsOverview.summaryBox.listItem.upload')}</li>
            </ul>
            <p className="margin-bottom-1">
              <Trans i18nKey="modelPlan:stepsOverview.summaryBox.email">
                indexZero
                <UswdsLink href="mailto:CMS_Section508@cms.hhs.gov">
                  email
                </UswdsLink>
                indexTwo
              </Trans>
            </p>
          </SummaryBox>
          <PageHeading className="margin-top-7 margin-bottom-1">
            {t('stepsOverview.steps.heading')}
          </PageHeading>
          <p className="font-body-lg margin-y-0">
            {t('stepsOverview.steps.description')}
          </p>
        </div>
        <div className="tablet:grid-col-6 margin-top-105">
          <ProcessList>
            <ProcessListItem>
              <ProcessListHeading type="h3">
                {t('stepsOverview.steps.first.heading')}
              </ProcessListHeading>
              <p>{t('stepsOverview.steps.first.description')}</p>
            </ProcessListItem>
            <ProcessListItem>
              <ProcessListHeading type="h3">
                {t('stepsOverview.steps.second.heading')}
              </ProcessListHeading>
              <p>{t('stepsOverview.steps.second.description')}</p>
            </ProcessListItem>
            <ProcessListItem className="padding-bottom-3">
              <ProcessListHeading type="h3">
                {t('stepsOverview.steps.third.heading')}
              </ProcessListHeading>
              <p>{t('stepsOverview.steps.third.description')}</p>
            </ProcessListItem>
          </ProcessList>
          <hr className="margin-top-0 margin-bottom-05" />
          {/* @ts-ignore */}
          <ProcessList
            className="model-plan-step-list--counter-reset"
            start={4}
          >
            <ProcessListItem>
              <ProcessListHeading type="h3">
                {t('stepsOverview.steps.fourth.heading')}
              </ProcessListHeading>
              <p>{t('stepsOverview.steps.fourth.description')}</p>
            </ProcessListItem>
          </ProcessList>
          <UswdsReactLink
            className="usa-button margin-bottom-10"
            variant="unstyled"
            to="/models/new-plan"
            data-testid="continue-link"
          >
            {t('stepsOverview.getStartedButton')}
          </UswdsReactLink>
        </div>
      </div>
    </MainContent>
  );
};

export default StepsOverview;
