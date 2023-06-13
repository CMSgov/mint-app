import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, Grid, Link } from '@trussworks/react-uswds';

import ReadOnlyBeneficiaries from 'views/ModelPlan/ReadOnly/Beneficiaries';
import ReadOnlyGeneralCharacteristics from 'views/ModelPlan/ReadOnly/GeneralCharacteristics';
import ReadOnlyModelBasics from 'views/ModelPlan/ReadOnly/ModelBasics';
import ReadOnlyOpsEvalAndLearning from 'views/ModelPlan/ReadOnly/OpsEvalAndLearning';
import ReadOnlyParticipantsAndProviders from 'views/ModelPlan/ReadOnly/ParticipantsAndProviders';
import ReadOnlyPayments from 'views/ModelPlan/ReadOnly/Payments';
import ReadOnlyTeamInfo from 'views/ModelPlan/ReadOnly/Team';

import allPossibleFilterViews from './utils';

const FitleredViewSection = ({
  sectionName,
  children
}: {
  sectionName: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`filtered-view-section filtered-view-section--${sectionName} border-bottom border-base-light padding-bottom-4 margin-bottom-6`}
    >
      {children}
    </div>
  );
};

const BodyContent = ({
  modelID,
  filteredView
}: {
  modelID: string;
  filteredView: string;
}) => {
  const { t } = useTranslation('filterView');

  const individualFilterView =
    allPossibleFilterViews[filteredView as keyof typeof allPossibleFilterViews];

  return (
    <Grid>
      <FitleredViewSection sectionName="model-team">
        <h2 className="margin-top-0 margin-bottom-4">Model Team</h2>
        <ReadOnlyTeamInfo modelID={modelID} isViewingFilteredView />
      </FitleredViewSection>

      {Object.keys(individualFilterView).map(task => {
        if (task === 'basics') {
          return (
            <FitleredViewSection sectionName="model-basics" key={task}>
              <ReadOnlyModelBasics modelID={modelID} isViewingFilteredView />
            </FitleredViewSection>
          );
        }
      })}

      {/* {individualFilterView.map((key: string) => {
        console.log(filteredViews[key]);
        return <p>Filtered View: {key}</p>;
      })} */}

      {/* <FitleredViewSection sectionName="model-basics">
        <ReadOnlyModelBasics modelID={modelID} isViewingFilteredView />
      </FitleredViewSection>
      <FitleredViewSection sectionName="general-characteristics">
        <ReadOnlyGeneralCharacteristics
          modelID={modelID}
          isViewingFilteredView
        />
      </FitleredViewSection>
      <FitleredViewSection sectionName="participants-and-providers">
        <ReadOnlyParticipantsAndProviders
          modelID={modelID}
          isViewingFilteredView
        />
      </FitleredViewSection>
      <FitleredViewSection sectionName="beneficiaries">
        <ReadOnlyBeneficiaries modelID={modelID} isViewingFilteredView />
      </FitleredViewSection>
      <FitleredViewSection sectionName="ops-eval-and-learning">
        <ReadOnlyOpsEvalAndLearning modelID={modelID} isViewingFilteredView />
      </FitleredViewSection>
      <FitleredViewSection sectionName="payments">
        <ReadOnlyPayments modelID={modelID} isViewingFilteredView />
      </FitleredViewSection> */}

      <Alert type="info" noIcon>
        <span className="margin-y-0 font-body-sm text-bold display-block">
          {t('alert.bodyContentHeading')}
        </span>
        <Trans i18nKey="filterView:alert.content">
          indexOne
          <Link href="mailto:MINTTeam@cms.hhs.gov">helpTextEmail</Link>
          indexTwo
        </Trans>
      </Alert>
    </Grid>
  );
};

export default BodyContent;
