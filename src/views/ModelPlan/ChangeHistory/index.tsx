import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GridContainer, Icon, SummaryBox } from '@trussworks/react-uswds';
import { useGetChangeHistoryQuery } from 'gql/gen/graphql';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import PageLoading from 'components/PageLoading';
import Alert from 'components/shared/Alert';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import NotFound from 'views/NotFound';

import ChangeRecord from './components/ChangeRecord';
import {
  extractReadyForReviewChanges,
  separateStatusChanges,
  sortCreateChangeFirst
} from './util';

const ChangeHistory = () => {
  const { t } = useTranslation('changeHistory');

  const { modelID } = useParams<{
    modelID: string;
  }>();

  const { modelName } = useContext(ModelInfoContext);

  const { data, loading, error } = useGetChangeHistoryQuery({
    variables: {
      modelPlanID: modelID
    }
  });

  const changes = [...(data?.translatedAuditCollection || [])];

  const changesSortedByDate = changes?.sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const changesWithStatusSeparation = separateStatusChanges(
    changesSortedByDate
  );

  const changesSortedWithCreateFirst = changesWithStatusSeparation.sort(
    sortCreateChangeFirst
  );

  const changesWithoutReadyForReview = extractReadyForReviewChanges(
    changesSortedWithCreateFirst
  );

  const sortedChanges = changesWithoutReadyForReview;

  if (error) {
    return <NotFound />;
  }

  return (
    <MainContent>
      <SummaryBox
        className="padding-y-6 padding-x-2 border-0 bg-primary-lighter radius-0 margin-top-0"
        data-testid="read-only-model-summary"
      >
        <GridContainer>
          <div className="display-flex flex-justify">
            <UswdsReactLink
              to={`/models/${modelID}/task-list`}
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
            {t('subheading', {
              modelName
            })}
          </span>

          {/* TODO: implement once we have a definitive release date */}
          <div className="bg-white-opacity-50 margin-top-4 padding-y-1 padding-x-2">
            {t('changesSinceRelease')}
          </div>
        </GridContainer>
      </SummaryBox>

      <GridContainer className="padding-y-4">
        {loading ? (
          <PageLoading />
        ) : (
          <>
            {sortedChanges.length === 0 && (
              <Alert type="info" slim className="margin-bottom-2">
                {t('noChanges')}
              </Alert>
            )}

            {sortedChanges.map(changeRecord => (
              <ChangeRecord changeRecord={changeRecord} key={changeRecord.id} />
            ))}
          </>
        )}
      </GridContainer>
    </MainContent>
  );
};

export default ChangeHistory;
