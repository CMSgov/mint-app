import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Alert,
  Button,
  Grid,
  GridContainer,
  IconArrowBack,
  IconExpandMore,
  SummaryBox
} from '@trussworks/react-uswds';
import classnames from 'classnames';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import CollapsableLink from 'components/shared/CollapsableLink';
import {
  DescriptionDefinition,
  DescriptionTerm
} from 'components/shared/DescriptionGroup';
import SectionWrapper from 'components/shared/SectionWrapper';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import GetModelSummary from 'queries/ReadOnly/GetModelSummary';
import {
  GetModelSummary as GetModelSummaryType,
  GetModelSummary_modelPlan as GetModelSummaryTypes
} from 'queries/ReadOnly/types/GetModelSummary';
import { ModelStatus } from 'types/graphql-global-types';
import { formatDate } from 'utils/date';
import { translateKeyCharacteristics } from 'utils/modelPlan';
import { NotFoundPartial } from 'views/NotFound';

import TaskListStatus from '../TaskList/_components/TaskListStatus';

import ContactInfo from './_components/ContactInfo';
import MobileNav from './_components/MobileNav';
import SideNav from './_components/Sidenav';

import './index.scss';

type subComponentProps = {
  component: React.ReactNode;
  route: string;
};

export interface subComponentsProps {
  [key: string]: subComponentProps;
}

export type SubpageKey =
  | 'model-basics'
  | 'general-characteristics'
  | 'participants-and-providers'
  | 'beneficiaries'
  | 'operations-evaluation-and-learning'
  | 'payment'
  | 'it-tools'
  | 'team'
  | 'discussions'
  | 'documents'
  | 'crs-and-tdl';

const ReadOnly = () => {
  const { t } = useTranslation('modelSummary');
  const { t: h } = useTranslation('generalReadOnly');
  const isMobile = useCheckResponsiveScreen('tablet');
  const { modelID, subinfo } = useParams<{
    modelID: string;
    subinfo: SubpageKey;
  }>();

  const descriptionRef = React.createRef<HTMLElement>();
  const [
    isDescriptionExpandable,
    setIsDescriptionExpandable
  ] = useState<boolean>(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState<boolean>(
    false
  );

  // Enable the description toggle if it overflows
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { current: el } = descriptionRef;
    if (!el) return;
    if (el.scrollHeight > el.offsetHeight) {
      setIsDescriptionExpandable(true);
    }
  });

  const { data, loading, error } = useQuery<GetModelSummaryType>(
    GetModelSummary,
    {
      variables: {
        id: modelID
      }
    }
  );

  const {
    modelName,
    modifiedDts,
    status,
    basics,
    generalCharacteristics,
    collaborators
  } = data?.modelPlan || ({} as GetModelSummaryTypes);

  const formattedApplicationStartDate =
    basics?.applicationsStart && formatDate(basics?.applicationsStart);

  const formattedKeyCharacteristics = generalCharacteristics?.keyCharacteristics.map(
    (item, index) => {
      return `${translateKeyCharacteristics(item)}${
        index === generalCharacteristics?.keyCharacteristics.length - 1
          ? ''
          : ', '
      }`;
    }
  );

  const formattedModelLeads = collaborators?.map((collaborator, index) => {
    return `${collaborator.fullName}${
      index === collaborators.length - 1 ? '' : ', '
    }`;
  });

  const subComponents: subComponentsProps = {
    'model-basics': {
      route: `/models/${modelID}/read-only/model-basics`,
      component: <h1>modelBasics</h1>
    },
    'general-characteristics': {
      route: `/models/${modelID}/read-only/general-characteristics`,
      component: <h1>generalCharacteristics</h1>
    },
    'participants-and-providers': {
      route: `/models/${modelID}/read-only/participants-and-providers`,
      component: <h1>participantsAndProviders</h1>
    },
    beneficiaries: {
      route: `/models/${modelID}/read-only/beneficiaries`,
      component: <h1>beneficiaries</h1>
    },
    'operations-evaluation-and-learning': {
      route: `/models/${modelID}/read-only/operations-evaluation-and-learning`,
      component: <h1>operationsEvaluationAndLearning</h1>
    },
    payment: {
      route: `/models/${modelID}/read-only/payment`,
      component: <h1>payment</h1>
    },
    'it-tools': {
      route: `/models/${modelID}/read-only/it-tools`,
      component: <h1>itTools</h1>
    },
    team: {
      route: `/models/${modelID}/read-only/team`,
      component: <h1>team</h1>
    },
    discussions: {
      route: `/models/${modelID}/read-only/discussions`,
      component: <h1>discussions</h1>
    },
    documents: {
      route: `/models/${modelID}/read-only/documents`,
      component: <h1>documents</h1>
    },
    'crs-and-tdl': {
      route: `/models/${modelID}/read-only/crs-and-tdl`,
      component: <h1>crsAndTdls</h1>
    }
  };

  const subComponent = subComponents[subinfo];

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  return (
    <MainContent
      className="model-plan-read-only"
      data-testid="model-plan-read-only"
    >
      <SummaryBox
        heading=""
        className="padding-y-6 border-0 bg-primary-lighter"
        data-testid="read-only-model-summary"
      >
        <GridContainer>
          <UswdsReactLink
            to="/models"
            className="display-flex flex-align-center margin-bottom-3"
          >
            <IconArrowBack className="text-primary margin-right-1" />
            {h('back')}
          </UswdsReactLink>

          <PageHeading className="margin-0 line-height-sans-2">
            {modelName}
          </PageHeading>

          <CollapsableLink
            className="margin-top-3 padding-0"
            eyeIcon
            startOpen
            labelPosition="bottom"
            closeLabel={h('hideSummary')}
            styleLeftBar={false}
            id={`${modelName?.replace(/\s+/g, '-').toLowerCase()}--description`}
            label={h('showSummary')}
          >
            <div
              className={classnames(
                'description-truncated',
                'margin-bottom-2',
                {
                  expanded: descriptionExpanded
                }
              )}
            >
              <DescriptionDefinition
                definition={basics?.goal ?? ''}
                ref={descriptionRef}
                dataTestId="read-only-model-summary__description"
                className="font-body-lg line-height-body-5 text-light"
              />
              {isDescriptionExpandable && (
                <div>
                  <Button
                    unstyled
                    type="button"
                    className="margin-top-1"
                    onClick={() => {
                      setDescriptionExpanded(!descriptionExpanded);
                    }}
                  >
                    {h(
                      descriptionExpanded
                        ? 'description.less'
                        : 'description.more'
                    )}
                    <IconExpandMore className="expand-icon margin-left-05 margin-bottom-2px text-tbottom" />
                  </Button>
                </div>
              )}
            </div>
            <Grid row className="margin-top-3">
              <Grid col={6} className="margin-bottom-2">
                <DescriptionDefinition
                  className="font-body-sm"
                  definition={t('summary.keyCharacteristics')}
                />
                <DescriptionTerm
                  className="font-body-lg line-height-sans-2 margin-bottom-0"
                  term={
                    generalCharacteristics?.keyCharacteristics.length !== 0
                      ? formattedKeyCharacteristics
                      : t('noAnswer.noneEntered')
                  }
                />
              </Grid>
              <Grid col={6} className="margin-bottom-2">
                <DescriptionDefinition
                  className="font-body-sm"
                  definition={t('summary.modelLeads')}
                />
                <DescriptionTerm
                  className="font-body-lg line-height-sans-2 margin-bottom-0"
                  term={formattedModelLeads}
                />
              </Grid>
              <Grid col={6} className="margin-bottom-2 desktop:margin-bottom-0">
                <DescriptionDefinition
                  className="font-body-sm"
                  definition={t('summary.modelStartDate')}
                />
                <DescriptionTerm
                  className="font-body-lg line-height-sans-2 margin-bottom-0"
                  term={formattedApplicationStartDate ?? t('noAnswer.tBD')}
                />
              </Grid>
              <Grid col={6} className="margin-bottom-2 desktop:margin-bottom-0">
                <DescriptionDefinition
                  className="font-body-sm"
                  definition={t('summary.crAndTdls')}
                />
                <DescriptionTerm
                  className="font-body-lg line-height-sans-2 margin-bottom-0"
                  term={t('noAnswer.noneEntered')}
                />
              </Grid>
            </Grid>
          </CollapsableLink>
        </GridContainer>
      </SummaryBox>
      <SectionWrapper className="model-plan-status-bar bg-base-lightest">
        <GridContainer>
          <div className="padding-y-1">
            <TaskListStatus
              icon
              readOnly
              modelID={modelID}
              status={status}
              updateLabel={h('updateStatus')}
              modifiedDts={modifiedDts ?? ''}
            />
          </div>
        </GridContainer>
      </SectionWrapper>

      <MobileNav subComponents={subComponents} subinfo={subinfo} />

      <SectionWrapper className="model-plan-alert-wrapper">
        {status !== ModelStatus.CLEARED && status !== ModelStatus.ANNOUNCED && (
          <Alert type="warning" className="margin-bottom-5 desktop:margin-y-3">
            {h('alert')}
          </Alert>
        )}
      </SectionWrapper>

      <SectionWrapper className="model-plan__body-content">
        <GridContainer>
          <Grid row gap>
            {!isMobile && (
              <Grid desktop={{ col: 3 }} className="padding-right-4 sticky-nav">
                <SideNav subComponents={subComponents} />
              </Grid>
            )}

            <Grid desktop={{ col: 9 }}>
              <div id={subinfo ?? ''}>
                <GridContainer className="padding-left-0 padding-right-0">
                  <Grid row gap>
                    {/* Central component */}
                    <Grid desktop={{ col: 8 }}>{subComponent.component}</Grid>

                    {/* Contact info sidebar */}
                    <Grid
                      desktop={{ col: 4 }}
                      className={classnames({
                        'sticky-nav': !isMobile
                      })}
                    >
                      <ContactInfo />
                    </Grid>
                  </Grid>
                </GridContainer>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </SectionWrapper>
    </MainContent>
  );
};

export default ReadOnly;
