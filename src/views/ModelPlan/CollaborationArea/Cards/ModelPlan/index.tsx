import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@trussworks/react-uswds';
import {
  GetModelPlanQuery,
  TaskStatus,
  useGetModelPlanQuery
} from 'gql/gen/graphql';

import UswdsReactLink from 'components/LinkWrapper';
import { Avatar } from 'components/shared/Avatar';
import { formatDateLocal } from 'utils/date';
import { TaskListStatusTag } from 'views/ModelPlan/TaskList/_components/TaskListItem';

import './index.scss';

type GetModelPlanTypes = GetModelPlanQuery['modelPlan'];

type ModelPlanCardType = {
  modelID: string;
};

const ModelPlanCard = ({ modelID }: ModelPlanCardType) => {
  const { t: modelPlanCardT } = useTranslation('modelPlanCard');
  const { data, loading } = useGetModelPlanQuery({
    variables: {
      id: modelID
    }
  });

  const modelPlan = data?.modelPlan || ({} as GetModelPlanTypes);
  const {
    modifiedDts,
    modifiedByUserAccount,
    basics,
    beneficiaries,
    generalCharacteristics,
    opsEvalAndLearning,
    participantsAndProviders,
    payments
  } = modelPlan;

  // Returns the number of sections that have been started (i.e. not in 'READY' status)
  const sectionStartedCounter = () => {
    if (loading) return 0;

    const sections = [
      basics.status,
      beneficiaries.status,
      generalCharacteristics.status,
      opsEvalAndLearning.status,
      participantsAndProviders.status,
      payments.status
    ];

    return sections.filter(status => status !== TaskStatus.READY).length;
  };

  return (
    <Card gridLayout={{ tablet: { col: 6 } }} className="card--model-plan">
      <CardHeader>
        <h3 className="usa-card__heading">{modelPlanCardT('heading')}</h3>
      </CardHeader>
      <div className="card__section-status">
        <TaskListStatusTag
          status={TaskStatus.READY}
          classname="width-fit-content"
        />
        <span className="text-base">
          {modelPlanCardT('sectionsStarted', {
            sectionsStarted: sectionStartedCounter()
          })}
        </span>
      </div>

      <CardBody>
        <p>{modelPlanCardT('body')}</p>
      </CardBody>

      {modifiedDts && modifiedByUserAccount && (
        <div className="display-flex margin-top-2 margin-bottom-3 flex-align-center">
          <span className="text-base margin-left-3 margin-right-1">
            {modelPlanCardT('mostRecentEdit', {
              date: formatDateLocal(modifiedDts, 'MM/dd/yyyy')
            })}
          </span>
          <Avatar
            className="text-base-darkest"
            user={modifiedByUserAccount.commonName}
          />
        </div>
      )}
      <CardFooter>
        <UswdsReactLink
          to={`/models/${modelID}/task-list`}
          className="usa-button"
          variant="unstyled"
        >
          {modelPlanCardT('button.goToModelPlan')}
        </UswdsReactLink>
        {sectionStartedCounter() !== 0 && (
          <UswdsReactLink
            to={`/models/${modelID}/task-list`}
            className="usa-button usa-button--outline"
            variant="unstyled"
          >
            {modelPlanCardT('button.share')}
          </UswdsReactLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModelPlanCard;
