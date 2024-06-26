import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GridContainer, SummaryBox } from '@trussworks/react-uswds';
import classNames from 'classnames';
import {
  GetModelSummaryQuery,
  ModelStatus,
  useGetModelSummaryQuery
} from 'gql/gen/graphql';
import { useFlags } from 'launchdarkly-react-client-sdk';

import PageHeading from 'components/PageHeading';
import Alert from 'components/shared/Alert';
import { filteredViewOutput } from 'views/ModelPlan/ReadOnly';
import FilterViewBanner from 'views/ModelPlan/ReadOnly/_components/FilterView/Banner';
import { filterGroups } from 'views/ModelPlan/ReadOnly/_components/FilterView/BodyContent/_filterGroupMapping';
import TaskListStatus from 'views/ModelPlan/TaskList/_components/TaskListStatus';
import NotFound from 'views/NotFound';

import NDABanner from '../NDABanner';

type GetModelSummaryTypes = GetModelSummaryQuery['modelPlan'];

const PDFSummary = ({
  filteredView,
  className
}: {
  filteredView?: typeof filterGroups[number] | 'all';
  className?: string;
}) => {
  const { t: generalReadOnlyT } = useTranslation('generalReadOnly');

  const flags = useFlags();

  const { modelID } = useParams<{
    modelID: string;
  }>();

  const { data, loading, error } = useGetModelSummaryQuery({
    variables: {
      id: modelID
    }
  });

  const { abbreviation, modelName, createdDts, modifiedDts, status } =
    data?.modelPlan || ({} as GetModelSummaryTypes);

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFound />;
  }

  const Summary = (
    <div className={classNames(className)}>
      <NDABanner collapsable={false} />
      <SummaryBox
        className="padding-y-6 padding-x-2 border-0 bg-primary-lighter radius-0 margin-top-0"
        data-testid="read-only-model-summary"
      >
        <GridContainer className="padding-x-6">
          <PageHeading
            className="margin-0 line-height-sans-2 minh-6 margin-bottom-2"
            headingLevel="h1"
          >
            {modelName}{' '}
            {abbreviation && (
              <span className="font-sans-sm text-normal">({abbreviation})</span>
            )}
          </PageHeading>

          <TaskListStatus
            readOnly
            modelID={modelID}
            status={status}
            statusLabel
            modifiedOrCreateLabel={!!modifiedDts}
            modifiedDts={modifiedDts ?? createdDts}
          />
        </GridContainer>
      </SummaryBox>

      {!flags.hideGroupView && (
        <FilterViewBanner
          filteredView={
            filteredView &&
            (filteredViewOutput(filteredView) as typeof filterGroups[number])
          }
          openFilterModal={() => null}
          openExportModal={() => null}
        />
      )}
    </div>
  );

  const ModelWarning = (
    <>
      {status !== ModelStatus.CLEARED && status !== ModelStatus.ANNOUNCED && (
        <Alert
          type="warning"
          className="margin-top-2 margin-bottom-5 desktop:margin-y-3"
        >
          {generalReadOnlyT('alert')}
        </Alert>
      )}
    </>
  );

  return (
    <>
      {Summary}
      <GridContainer className="padding-x-8">{ModelWarning}</GridContainer>
    </>
  );
};

export default PDFSummary;
