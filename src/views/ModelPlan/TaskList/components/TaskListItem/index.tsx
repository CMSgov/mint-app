import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

type TaskListLastUpdatedProps = {
  children?: React.ReactNode | React.ReactNodeArray;
};

export const TaskListLastUpdated = ({ children }: TaskListLastUpdatedProps) => {
  return (
    <div className="model-plan-task-list__last-updated-status line-height-body-4">
      {children}
    </div>
  );
};

type TaskListDescriptionProps = {
  children?: React.ReactNode | React.ReactNodeArray;
};

export const TaskListDescription = ({ children }: TaskListDescriptionProps) => {
  return (
    <div className="model-plan-task-list__task-description line-height-body-4">
      {children}
    </div>
  );
};

type TaskListItemProps = {
  keyName: string;
  heading: string;
  status: string;
  children?: React.ReactNode | React.ReactNodeArray;
  testId: string;
};

const TaskListItem = ({
  keyName,
  heading,
  status,
  children,
  testId
}: TaskListItemProps) => {
  const { t } = useTranslation('modelPlanTaskList');

  const taskListItemClasses = classnames(
    'model-plan-task-list__item',
    'display-flex',
    'padding-bottom-4',
    {
      'text-base-dark': ['NOT_NEEDED', 'CANNOT_START'].includes(status)
    }
  );

  let tagCopy;
  switch (status) {
    case 'READY':
      tagCopy = t('taskListItem.ready');
      break;
    case 'IN_PROGRESS':
      tagCopy = t('taskListItem.inProgress');
      break;
    case 'NOT_NEEDED':
      tagCopy = t('taskListItem.notNeeded');
      break;
    default:
      tagCopy = t('taskListItem.cannotStart');
  }

  const tagStyle =
    (status === 'READY' && 'ready') ||
    (status === 'IN_PROGRESS' && 'in-progress') ||
    ((status === 'CANNOT_START' || status === 'NOT_NEEDED') && 'na');

  return (
    <li className={taskListItemClasses} data-testid={testId}>
      <div className="width-full">
        <div className="model-plan-task-list__task-row display-flex flex-justify flex-align-start">
          <h3 className="model-plan-task-list__task-heading margin-top-0 margin-bottom-1">
            {heading}
          </h3>
          <span
            className={`model-plan-task-list__task-tag model-plan-task-list__task-tag--${tagStyle} line-height-5 text-bold`}
            data-testid={`task-list-task-tag--${keyName}`}
          >
            {tagCopy}
          </span>
        </div>
        {children}
      </div>
    </li>
  );
};

export default TaskListItem;
