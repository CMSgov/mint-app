import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Grid,
  Link as TrussLink,
  ProcessList,
  ProcessListHeading,
  ProcessListItem
} from '@trussworks/react-uswds';
import classNames from 'classnames';

import SectionWrapper from 'components/shared/SectionWrapper';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import GetAllBasics from 'queries/ReadOnly/GetAllBasics';
import { GetAllBasics as GetAllBasicsTypes } from 'queries/ReadOnly/types/GetAllBasics';
import { formatDateUtc } from 'utils/date';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import { TaskListStatusTag } from 'views/ModelPlan/TaskList/_components/TaskListItem';
import { NotFoundPartial } from 'views/NotFound';

import { checkGroupMap } from '../_components/FilterView/util';
import ReadOnlySection from '../_components/ReadOnlySection';
import SideBySideReadOnlySection from '../_components/SideBySideReadOnlySection';

import './index.scss';

export type ReadOnlyProps = {
  modelID: string;
  clearance?: boolean;
  isViewingFilteredView?: boolean;
  filteredQuestions?: string[];
  filteredView?: string;
};

const ReadOnlyModelBasics = ({
  modelID,
  clearance,
  filteredView,
  isViewingFilteredView,
  filteredQuestions
}: ReadOnlyProps) => {
  const { t: planBasicsT } = useTranslation('planBasics');
  const { t: planBasicsMiscT } = useTranslation('planBasicsMisc');
  const { t: generalT } = useTranslation('draftModelPlan');
  const { t: prepareForClearanceT } = useTranslation('prepareForClearance');

  const isTablet = useCheckResponsiveScreen('tablet', 'smaller');

  const { modelName } = useContext(ModelInfoContext);

  const { data, loading, error } = useQuery<GetAllBasicsTypes>(GetAllBasics, {
    variables: {
      id: modelID
    }
  });

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  const { nameHistory } = data?.modelPlan || {};

  const filteredNameHistory = nameHistory?.filter(
    previousName => previousName !== modelName
  );

  const {
    demoCode,
    amsModelID,
    modelCategory,
    cmsCenters,
    cmsOther,
    cmmiGroups,
    modelType,
    problem,
    goal,
    testInterventions,
    note,
    completeICIP,
    clearanceStarts,
    clearanceEnds,
    announced,
    applicationsStart,
    applicationsEnd,
    performancePeriodStarts,
    performancePeriodEnds,
    wrapUpEnds,
    phasedIn,
    phasedInNote,
    highLevelNote,
    status
  } = data?.modelPlan?.basics || {};

  const dateOrNoAnswer = (value: string | null | undefined) => {
    if (value) {
      return formatDateUtc(value, 'MM/dd/yyyy');
    }

    return <em className="text-base">{planBasicsMiscT('na')}</em>;
  };

  return (
    <div
      className="read-only-model-plan--model-basics"
      data-testid="read-only-model-plan--model-basics"
    >
      <div className="display-flex flex-justify flex-align-start">
        <h2 className="margin-top-0 margin-bottom-4">
          {clearance
            ? planBasicsMiscT('clearanceHeading')
            : planBasicsMiscT('heading')}
        </h2>
        {!isViewingFilteredView && status && (
          <TaskListStatusTag status={status} />
        )}
      </div>

      {clearance && (
        <p className="font-body-lg margin-top-neg-2 margin-bottom-6">
          {prepareForClearanceT('forModelPlan', {
            modelName
          })}
        </p>
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'nameHistory',
        <ReadOnlySection
          heading={planBasicsMiscT('previousNames')}
          list
          listItems={filteredNameHistory}
        />
      )}

      {/* Other Identifiers section */}
      {!isViewingFilteredView && (
        <div
          className={classNames(
            'bg-base-lightest padding-2 margin-top-4 margin-bottom-4',
            {
              'maxw-mobile-lg': isTablet
            }
          )}
        >
          <p className="margin-top-0 text-bold">
            {planBasicsMiscT('otherIdentifiers')}
          </p>

          <p className="line-height-mono-4">
            {planBasicsMiscT('otherIdentifiersInfo1')}
            <TrussLink
              aria-label="Open AMS in a new tab"
              href="https://ams.cmmi.cms.gov"
              target="_blank"
              rel="noopener noreferrer"
              variant="external"
            >
              {planBasicsMiscT('otherIdentifiersInfo2')}
            </TrussLink>

            {planBasicsMiscT('otherIdentifiersInfo3')}
          </p>

          <Grid row gap>
            <Grid
              desktop={{ col: 6 }}
              className={classNames({
                'padding-bottom-2': isTablet
              })}
            >
              <p className="text-bold margin-top-0 margin-bottom-1">
                {planBasicsT('amsModelID.question')}
              </p>

              {amsModelID || (
                <div className="text-italic text-base">
                  {planBasicsMiscT('noneEntered')}
                </div>
              )}
            </Grid>
            <Grid desktop={{ col: 6 }}>
              <p className="text-bold margin-top-0 margin-bottom-1">
                {planBasicsT('demoCode.question')}
              </p>

              {demoCode || (
                <div className="text-italic text-base">
                  {planBasicsMiscT('noneEntered')}
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'modelCategory',
        <ReadOnlySection
          heading={planBasicsT('modelCategory.question')}
          copy={planBasicsT(`modelCategory.options.${modelCategory}`, '')} // Default to empty string if category is null
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'cmsCenters',
        <SideBySideReadOnlySection
          firstSection={{
            heading: planBasicsT('cmsCenters.question'),
            list: true,
            listItems: cmsCenters?.map((cmsCenter): string =>
              planBasicsT(`cmsCenters.options.${cmsCenter}`)
            ),
            listOtherItem: cmsOther
          }}
          secondSection={{
            heading: planBasicsT('cmmiGroups.question'),
            list: true,
            listItems: cmmiGroups?.map((cmmiGroup): string =>
              planBasicsT(`cmmiGroups.options.${cmmiGroup}`)
            )
          }}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'modelType',
        <ReadOnlySection
          heading={planBasicsT('modelType.question')}
          copy={planBasicsT(`modelType.options.${modelType}`, '')}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'problem',
        <ReadOnlySection
          heading={planBasicsT('problem.question')}
          copy={problem}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'goal',
        <ReadOnlySection heading={planBasicsT('goal.question')} copy={goal} />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'testInterventions',
        <ReadOnlySection
          heading={planBasicsT('testInterventions.question')}
          copy={testInterventions}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'note',
        <ReadOnlySection heading={generalT('note')} copy={note} />
      )}

      {isViewingFilteredView && filteredView !== 'ipc' ? (
        <>
          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'completeICIP',
            <ReadOnlySection
              heading={planBasicsT('completeICIP.question')}
              copy={completeICIP && formatDateUtc(completeICIP, 'MM/dd/yyyy')}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'clearanceStartDate',
            <SideBySideReadOnlySection
              firstSection={{
                heading: planBasicsT('clearanceStarts.question'),
                copy:
                  clearanceStarts &&
                  formatDateUtc(clearanceStarts, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: planBasicsT('clearanceEnds.question'),
                copy:
                  clearanceEnds && formatDateUtc(clearanceEnds, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'annouceModel',
            <ReadOnlySection
              heading={planBasicsT('announced.question')}
              copy={announced && formatDateUtc(announced, 'MM/dd/yyyy')}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'applicationStartDate',
            <SideBySideReadOnlySection
              firstSection={{
                heading: planBasicsT('applicationsStart.question'),
                copy:
                  applicationsStart &&
                  formatDateUtc(applicationsStart, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: planBasicsT('applicationsEnd.question'),
                copy:
                  applicationsEnd &&
                  formatDateUtc(applicationsEnd, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'performanceStartDate',
            <SideBySideReadOnlySection
              firstSection={{
                heading: planBasicsT('performancePeriodStarts.question'),
                copy:
                  performancePeriodStarts &&
                  formatDateUtc(performancePeriodStarts, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: planBasicsT('performancePeriodEnds.question'),
                copy:
                  performancePeriodEnds &&
                  formatDateUtc(performancePeriodEnds, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'modelWrapUp',
            <ReadOnlySection
              heading={planBasicsT('wrapUpEnds.question')}
              copy={wrapUpEnds && formatDateUtc(wrapUpEnds, 'MM/dd/yyyy')}
            />
          )}
        </>
      ) : (
        <SectionWrapper
          className={classNames(
            'read-only-model-plan__timeline--wrapper border-base-light padding-top-4 ',
            {
              'border-y-1px padding-bottom-2 margin-bottom-4 margin-top-6': !isViewingFilteredView
            }
          )}
        >
          <h3 className="margin-top-0 margin-bottom-4">
            {planBasicsMiscT('highLevelTimeline')}
          </h3>

          <ProcessList className="read-only-model-plan__timeline">
            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsT('completeICIP.question')}
              </ProcessListHeading>

              <p className="margin-y-0 font-body-md line-height-sans-4">
                {dateOrNoAnswer(completeICIP)}
              </p>
            </ProcessListItem>

            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsMiscT('clearance')}
              </ProcessListHeading>

              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('clearanceStarts.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(clearanceStarts)}
                  </p>
                </div>
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('clearanceEnds.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(clearanceEnds)}
                  </p>
                </div>
              </div>
            </ProcessListItem>
            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsT('announced.question')}
              </ProcessListHeading>

              <p className="margin-y-0 font-body-md line-height-sans-4">
                {dateOrNoAnswer(announced)}
              </p>
            </ProcessListItem>

            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsMiscT('applicationPeriod')}
              </ProcessListHeading>

              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('applicationsStart.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(applicationsStart)}
                  </p>
                </div>
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('applicationsEnd.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(applicationsEnd)}
                  </p>
                </div>
              </div>
            </ProcessListItem>

            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsMiscT('demonstrationPerformance')}
              </ProcessListHeading>
              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('performancePeriodStarts.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(performancePeriodStarts)}
                  </p>
                </div>
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {planBasicsT('performancePeriodEnds.question')}
                  </ProcessListHeading>

                  <p className="margin-y-0 font-body-md line-height-sans-4">
                    {dateOrNoAnswer(performancePeriodEnds)}
                  </p>
                </div>
              </div>
            </ProcessListItem>

            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {planBasicsT('wrapUpEnds.question')}
              </ProcessListHeading>

              <p className="margin-y-0 font-body-md line-height-sans-4">
                {dateOrNoAnswer(wrapUpEnds)}
              </p>
            </ProcessListItem>
          </ProcessList>

          <ReadOnlySection heading={generalT('note')} copy={highLevelNote} />
        </SectionWrapper>
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'phasedIn',
        <ReadOnlySection
          heading={planBasicsT('phasedIn.question')}
          copy={planBasicsT(`phasedIn.options.${phasedIn}`, '')} // Default to empty string if bool is null
          notes={phasedInNote}
        />
      )}
    </div>
  );
};

export default ReadOnlyModelBasics;
