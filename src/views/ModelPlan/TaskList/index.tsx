import React, { Fragment } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Grid,
  GridContainer,
  SummaryBox
} from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import Divider from 'components/shared/Divider';
import GetModelPlan from 'queries/GetModelPlan';
import {
  GetModelPlan as GetModelPlanType,
  GetModelPlan_modelPlan as GetModelPlanTypes,
  GetModelPlanVariables
} from 'queries/types/GetModelPlan';

import TaskListButton from './_components/TaskListButton';
import TaskListItem, {
  TaskListDescription,
  TaskListLastUpdated
} from './_components/TaskListItem';
import TaskListSideNav from './_components/TaskListSideNav';
import TaskListStatus from './_components/TaskListStatus';

import './index.scss';

type TaskListItemProps = {
  heading: string;
  copy: string;
};

const TaskList = () => {
  const { t } = useTranslation('modelPlanTaskList');
  const { modelID } = useParams<{ modelID: string }>();

  const { data } = useQuery<GetModelPlanType, GetModelPlanVariables>(
    GetModelPlan,
    {
      variables: {
        id: modelID
      }
    }
  );

  const modelPlan = data?.modelPlan || ({} as GetModelPlanTypes);

  const {
    modelName,
    modelCategory,
    cmsCenters,
    modifiedDts,
    milestones,
    basics,
    documents,
    status
    // TODO: Add these model plans when BE integrates it
    // characteristics,
    // participants,
    // beneficiaries,
    // operations,
    // payment,
    // finalizeModelPlan
  } = modelPlan;

  const taskListItem: TaskListItemProps[] = t('numberedList', {
    returnObjects: true
  });

  const taskListItemStatus = (key: string) => {
    switch (key) {
      case 'basics':
        if (
          basics?.status === 'COMPLETE' &&
          milestones?.status === 'COMPLETE'
        ) {
          return 'COMPLETE';
        }
        if (modelCategory === null && cmsCenters.length === 0) {
          return 'READY';
        }
        return 'IN_PROGRESS';
      // TODO: Add these model plans when BE integrates it
      // case 'characteristics':
      //   return;
      // case 'participants':
      //   return;
      // case 'beneficiaries':
      //   return;
      // case 'operations':
      //   return;
      // case 'payment':
      //   return;
      // case 'finalizeModelPlan':
      //   return;
      default:
        return 'CANNOT_START';
    }
  };

  return (
    <MainContent
      className="model-plan-task-list"
      data-testid="model-plan-task-list"
    >
      <GridContainer>
        <Grid desktop={{ col: 12 }}>
          <BreadcrumbBar variant="wrap">
            <Breadcrumb>
              <BreadcrumbLink asCustom={Link} to="/">
                <span>{t('navigation.home')}</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>{t('navigation.modelPlanTaskList')}</Breadcrumb>
          </BreadcrumbBar>
        </Grid>
        <Grid row gap>
          <Grid desktop={{ col: 9 }}>
            {data && (
              <>
                <PageHeading className="margin-top-4 margin-bottom-0">
                  {t('navigation.modelPlanTaskList')}
                </PageHeading>
                <p
                  className="margin-top-0 margin-bottom-2 font-body-lg"
                  data-testid="model-plan-name"
                >
                  <Trans i18nKey="modelPlanTaskList:subheading">
                    indexZero {modelName} indexTwo
                  </Trans>
                </p>
                <TaskListStatus modelID={modelID} status={status} />
                <SummaryBox
                  heading=""
                  className="bg-base-lightest border-0 radius-0 padding-2"
                >
                  {documents?.length > 0 ? (
                    <>
                      <p
                        className="margin-0 margin-bottom-1"
                        data-testid="document-items"
                      >
                        <strong>{documents.length} </strong>
                        <Trans i18nKey="modelPlanTaskList:summaryBox.existingDocuments">
                          indexZero {modelName} indexTwo
                        </Trans>
                      </p>
                      <Grid row gap>
                        <Grid tablet={{ col: 4 }}>
                          <UswdsReactLink
                            variant="unstyled"
                            className="margin-right-4"
                            to={`/models/${modelID}/documents`}
                          >
                            {t('summaryBox.viewAll')}
                          </UswdsReactLink>
                        </Grid>
                        <Grid tablet={{ col: 4 }}>
                          <UswdsReactLink
                            variant="unstyled"
                            to={`/models/${modelID}/documents/add-document`}
                          >
                            {t('summaryBox.uploadAnother')}
                          </UswdsReactLink>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <p className="margin-0 margin-bottom-1">
                        <Trans i18nKey="modelPlanTaskList:summaryBox.copy">
                          indexZero {modelName} indexTwo
                        </Trans>
                      </p>
                      <UswdsReactLink
                        className="usa-button usa-button--outline"
                        variant="unstyled"
                        to={`/models/${modelID}/documents`}
                      >
                        {t('summaryBox.cta')}
                      </UswdsReactLink>
                    </>
                  )}
                </SummaryBox>
                <ol
                  data-testid="task-list"
                  className="model-plan-task-list__task-list model-plan-task-list__task-list--primary margin-top-6 margin-bottom-0 padding-left-0"
                >
                  {Object.keys(taskListItem).map((key: any) => {
                    const lastTaskItem = Object.keys(taskListItem).slice(-1)[0];
                    const path =
                      key === 'finalizeModelPlan' ? 'submit-request' : key;

                    return (
                      <Fragment key={key}>
                        <TaskListItem
                          key={key}
                          testId="task-list-intake-form"
                          heading={taskListItem[key].heading}
                          status={taskListItemStatus(key)}
                        >
                          <div className="model-plan-task-list__task-row display-flex flex-justify flex-align-start">
                            <TaskListDescription>
                              <p className="margin-top-0">
                                {taskListItem[key].copy}
                              </p>
                            </TaskListDescription>
                            {taskListItemStatus(key) === 'IN_PROGRESS' && (
                              <TaskListLastUpdated>
                                <p className="margin-y-0">
                                  {t('taskListItem.lastUpdated')}
                                </p>
                                <p className="margin-y-0">4/1/2022</p>
                              </TaskListLastUpdated>
                            )}
                          </div>
                          <TaskListButton
                            path={path}
                            status={taskListItemStatus(key)}
                          />
                        </TaskListItem>
                        {key !== lastTaskItem && (
                          <Divider className="margin-bottom-4" />
                        )}
                      </Fragment>
                    );
                  })}
                </ol>
              </>
            )}
          </Grid>
          <Grid desktop={{ col: 3 }}>
            <TaskListSideNav modelPlan={modelPlan} />
          </Grid>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default TaskList;
