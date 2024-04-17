import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GridContainer, Icon, SummaryBox } from '@trussworks/react-uswds';
import classNames from 'classnames';

import UswdsReactLink from 'components/LinkWrapper';
import PageHeading from 'components/PageHeading';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';

const ChangeHistory = () => {
  const { t } = useTranslation('changeHistory');

  const { modelID } = useParams<{
    modelID: string;
  }>();

  const isMobile = useCheckResponsiveScreen('tablet', 'smaller');
  const isTablet = useCheckResponsiveScreen('tablet', 'smaller');

  return (
    <SummaryBox
      className="padding-y-6 padding-x-2 border-0 bg-primary-lighter radius-0 margin-top-0"
      data-testid="read-only-model-summary"
    >
      <GridContainer
        className={classNames({
          'padding-x-0': isMobile,
          'padding-x-2': isTablet
        })}
      >
        <div className="display-flex flex-justify">
          <UswdsReactLink
            to="/models"
            className="display-flex flex-align-center margin-bottom-4"
          >
            <Icon.ArrowBack className="text-primary margin-right-1" />
            {t('back')}
          </UswdsReactLink>
        </div>

        <PageHeading
          className="margin-0 line-height-sans-2 minh-6 margin-bottom-2"
          headingLevel="h1"
        >
          {t('heading')}
        </PageHeading>

        <span className="font-body-lg">
          for Medicare Diabetes Prevention Program - Expanded Model Revamped
        </span>
      </GridContainer>
    </SummaryBox>
  );
};

export default ChangeHistory;
