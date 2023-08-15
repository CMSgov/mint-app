import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import {
  Grid,
  IconInfo,
  Link as TrussLink,
  ProcessList,
  ProcessListHeading,
  ProcessListItem
} from '@trussworks/react-uswds';
import classNames from 'classnames';

import SectionWrapper from 'components/shared/SectionWrapper';
import Tooltip from 'components/shared/Tooltip';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import GetAllBasics from 'queries/ReadOnly/GetAllBasics';
import { GetAllBasics as GetAllBasicsTypes } from 'queries/ReadOnly/types/GetAllBasics';
import { ModelCategory } from 'types/graphql-global-types';
import { formatDateUtc } from 'utils/date';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import { NotFoundPartial } from 'views/NotFound';

import {
  checkGroupMap,
  hasQuestions,
  highLevelTimelineQuestions
} from '../_components/FilterView/util';
import ReadOnlySection from '../_components/ReadOnlySection';
import SideBySideReadOnlySection from '../_components/SideBySideReadOnlySection';
import TitleAndStatus from '../_components/TitleAndStatus';

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
  const { t: basicsT } = useTranslation('basics');
  const { t: basicsMiscT } = useTranslation('basicsMisc');
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
    additionalModelCategories,
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

    return <em className="text-base">{basicsMiscT('na')}</em>;
  };

  return (
    <div
      className="read-only-model-plan--model-basics"
      data-testid="read-only-model-plan--model-basics"
    >
      <TitleAndStatus
        clearance={clearance}
        clearanceTitle={basicsMiscT('clearanceHeading')}
        heading={basicsMiscT('heading')}
        isViewingFilteredView={isViewingFilteredView}
        status={status}
      />

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
          heading={basicsMiscT('previousNames')}
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
            {basicsMiscT('otherIdentifiers')}
          </p>

          <p className="line-height-mono-4">
            {basicsMiscT('otherIdentifiersInfo1')}

            <span className="mint-no-print">
              <TrussLink
                aria-label="Open AMS in a new tab"
                href="https://ams.cmmi.cms.gov"
                target="_blank"
                rel="noopener noreferrer"
                variant="external"
              >
                {basicsMiscT('otherIdentifiersInfo2')}
              </TrussLink>
            </span>

            <span className="mint-only-print-inline">
              {basicsMiscT('otherIdentifiersInfo2')}
            </span>

            {basicsMiscT('otherIdentifiersInfo3')}
          </p>

          <Grid row gap>
            <Grid
              desktop={{ col: 6 }}
              className={classNames({
                'padding-bottom-2': isTablet
              })}
            >
              <p className="text-bold margin-top-0 margin-bottom-1">
                {basicsT('amsModelID.label')}
              </p>

              {amsModelID || (
                <div className="text-italic text-base">
                  {basicsMiscT('noneEntered')}
                </div>
              )}
            </Grid>
            <Grid desktop={{ col: 6 }}>
              <p className="text-bold margin-top-0 margin-bottom-1">
                {basicsT('demoCode.label')}
              </p>

              {demoCode || (
                <div className="text-italic text-base">
                  {basicsMiscT('noneEntered')}
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
        <SideBySideReadOnlySection
          firstSection={{
            heading: basicsT('modelCategory.question'),
            copy:
              modelCategory === null ? (
                ''
              ) : (
                <span
                  className="display-flex flex-align-center"
                  style={{ gap: '4px' }}
                >
                  {basicsT(`modelCategory.options.${modelCategory}`, '')}

                  {modelCategory !== ModelCategory.TO_BE_DETERMINED && (
                    <Tooltip
                      label={basicsT(`modelCategory.tooltip.${modelCategory}`)}
                      position="right"
                    >
                      <IconInfo className="text-base-light" />
                    </Tooltip>
                  )}
                </span>
              )
          }}
          secondSection={{
            heading: basicsT('additionalModelCategories.question'),
            list: true,
            listItems: additionalModelCategories?.map(group => {
              return (
                <Fragment key={group}>
                  <span
                    className="display-flex flex-align-center"
                    style={{ gap: '4px' }}
                  >
                    {basicsT(`modelCategory.options.${group}`)}

                    <Tooltip
                      label={basicsT(`modelCategory.tooltip.${group}`)}
                      position="right"
                    >
                      <IconInfo className="text-base-light" />
                    </Tooltip>
                  </span>
                </Fragment>
              );
            })
          }}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'cmsCenters',
        <SideBySideReadOnlySection
          firstSection={{
            heading: basicsT('cmsCenters.label'),
            list: true,
            listItems: cmsCenters?.map((cmsCenter): string =>
              basicsT(`cmsCenters.options.${cmsCenter}`)
            ),
            listOtherItem: cmsOther
          }}
          secondSection={{
            heading: basicsT('cmmiGroups.label'),
            list: true,
            listItems: cmmiGroups?.map((cmmiGroup): string =>
              basicsT(`cmmiGroups.options.${cmmiGroup}`)
            )
          }}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'modelType',
        <ReadOnlySection
          heading={basicsT('modelType.label')}
          copy={basicsT(`modelType.options.${modelType}`, '')}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'problem',
        <ReadOnlySection heading={basicsT('problem.label')} copy={problem} />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'goal',
        <ReadOnlySection heading={basicsT('goal.label')} copy={goal} />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'testInterventions',
        <ReadOnlySection
          heading={basicsT('testInterventions.label')}
          copy={testInterventions}
        />
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'note',
        <ReadOnlySection heading={basicsT('note.label')} copy={note} />
      )}

      {isViewingFilteredView && filteredView !== 'ipc' ? (
        <>
          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'completeICIP',
            <ReadOnlySection
              heading={basicsT('completeICIP.label')}
              copy={completeICIP && formatDateUtc(completeICIP, 'MM/dd/yyyy')}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'clearanceStarts',
            <SideBySideReadOnlySection
              firstSection={{
                heading: basicsT('clearanceStarts.label'),
                copy:
                  clearanceStarts &&
                  formatDateUtc(clearanceStarts, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: basicsT('clearanceEnds.label'),
                copy:
                  clearanceEnds && formatDateUtc(clearanceEnds, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'announced',
            <ReadOnlySection
              heading={basicsT('announced.label')}
              copy={announced && formatDateUtc(announced, 'MM/dd/yyyy')}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'applicationsStart',
            <SideBySideReadOnlySection
              firstSection={{
                heading: basicsT('applicationsStart.label'),
                copy:
                  applicationsStart &&
                  formatDateUtc(applicationsStart, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: basicsT('applicationsEnd.label'),
                copy:
                  applicationsEnd &&
                  formatDateUtc(applicationsEnd, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'performancePeriodStarts',
            <SideBySideReadOnlySection
              firstSection={{
                heading: basicsT('performancePeriodStarts.label'),
                copy:
                  performancePeriodStarts &&
                  formatDateUtc(performancePeriodStarts, 'MM/dd/yyyy')
              }}
              secondSection={{
                heading: basicsT('performancePeriodEnds.label'),
                copy:
                  performancePeriodEnds &&
                  formatDateUtc(performancePeriodEnds, 'MM/dd/yyyy')
              }}
            />
          )}

          {checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'wrapUpEnds',
            <ReadOnlySection
              heading={basicsT('wrapUpEnds.label')}
              copy={wrapUpEnds && formatDateUtc(wrapUpEnds, 'MM/dd/yyyy')}
            />
          )}

          {filteredQuestions &&
            hasQuestions(filteredQuestions, highLevelTimelineQuestions) && (
              <ReadOnlySection
                heading={basicsT('highLevelNote.label')}
                copy={highLevelNote}
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
          <h3 className="margin-y-0">{basicsMiscT('highLevelTimeline')}</h3>

          <ProcessList className="read-only-model-plan__timeline">
            <ProcessListItem className="read-only-model-plan__timeline__list-item">
              <ProcessListHeading
                type="p"
                className="font-body-sm line-height-sans-4"
              >
                {basicsT('completeICIP.label')}
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
                {basicsMiscT('clearance')}
              </ProcessListHeading>

              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {basicsT('clearanceStarts.label')}
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
                    {basicsT('clearanceEnds.label')}
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
                {basicsT('announced.label')}
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
                {basicsMiscT('applicationPeriod')}
              </ProcessListHeading>

              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {basicsT('applicationsStart.label')}
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
                    {basicsT('applicationsEnd.label')}
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
                {basicsMiscT('demonstrationPerformance')}
              </ProcessListHeading>
              <div className="mobile-lg:display-flex">
                <div className="width-card-lg margin-bottom-2 mobile-lg:margin-bottom-0">
                  <ProcessListHeading
                    type="p"
                    className="font-body-sm line-height-sans-4"
                  >
                    {basicsT('performancePeriodStarts.label')}
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
                    {basicsT('performancePeriodEnds.label')}
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
                {basicsT('wrapUpEnds.label')}
              </ProcessListHeading>

              <p className="margin-y-0 font-body-md line-height-sans-4">
                {dateOrNoAnswer(wrapUpEnds)}
              </p>
            </ProcessListItem>
          </ProcessList>

          <ReadOnlySection
            heading={basicsT('highLevelNote.label')}
            copy={highLevelNote}
          />
        </SectionWrapper>
      )}

      {checkGroupMap(
        isViewingFilteredView,
        filteredQuestions,
        'phasedIn',
        <ReadOnlySection
          heading={basicsT('phasedIn.label')}
          copy={basicsT(`phasedIn.options.${phasedIn}`, '')} // Default to empty string if bool is null
          notes={phasedInNote}
        />
      )}
    </div>
  );
};

export default ReadOnlyModelBasics;
