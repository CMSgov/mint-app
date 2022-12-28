import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import classNames from 'classnames';

// TODO: Once subtasks are added to BE, replace this any enum with gql generated enum
export enum SubtaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

// TODO: Once subtasks are added to BE, replace this any type with gql generated type
type SubtaskType = {
  name: string;
  status: SubtaskStatus;
};

// Used for label translations
const columnTypes = {
  todo: SubtaskStatus.TO_DO,
  inProgress: SubtaskStatus.IN_PROGRESS,
  done: SubtaskStatus.DONE
};

// Returns ul list component with subtask name
const SubtaskColumns = (
  subtasks: SubtaskType[],
  status: keyof typeof columnTypes
): JSX.Element => {
  const { t } = useTranslation('itSolutions');

  return (
    <Grid
      desktop={{ col: 4 }}
      className={classNames({ 'border-right': status !== 'done' })}
    >
      <div className="border-bottom">
        <p className="text-bold padding-x-1 margin-y-105">
          {t(`subtasks.${status}`)}
        </p>
      </div>

      <div className="border-top">
        {subtasks.length === 0 &&
        columnTypes[status] === SubtaskStatus.TO_DO ? (
          <div className="padding-x-1 margin-y-105">
            {t('subtasks.noSubtasks')}
          </div>
        ) : (
          <ul>
            {subtasks
              .filter(
                (subtask: SubtaskType) => subtask.status === columnTypes[status]
              )
              .map((subtask: SubtaskType) => (
                <li key={subtask.name} className="margin-y-1">
                  {subtask.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </Grid>
  );
};

type SubtaskLinksType = {
  [key: string]: string;
  addSubtasks: 'add-subtasks';
  manageSubtasks: 'manage-subtasks';
};

// Additional links beneath subtask table for adding and managing subtasks
export const SubtaskLinks = ({ className }: { className?: string }) => {
  const { t } = useTranslation('itSolutions');
  const { modelID, operationalNeedID } = useParams<{
    modelID: string;
    operationalNeedID: string;
  }>();

  const history = useHistory();

  const subtaskLinks: SubtaskLinksType = {
    addSubtasks: 'add-subtasks',
    manageSubtasks: 'manage-subtasks'
  };

  return (
    <div className={classNames(className, 'display-flex')}>
      {Object.keys(subtaskLinks).map(link => (
        <Button
          key={link}
          type="button"
          id={subtaskLinks[link]}
          className="usa-button usa-button--outline"
          onClick={() => {
            history.push(
              `/models/${modelID}/task-list/it-solutions/${operationalNeedID}/${subtaskLinks[link]}`
            );
          }}
        >
          {t(`subtasks.${link}`)}
        </Button>
      ))}
    </div>
  );
};

type SubtasksProps = {
  subtasks: SubtaskType[];
  className?: string;
};

const Subtasks = ({ subtasks, className }: SubtasksProps) => {
  const { t } = useTranslation('itSolutions');

  const TodoSubtasks = SubtaskColumns(subtasks, 'todo');

  const InProgressSubtasks = SubtaskColumns(subtasks, 'inProgress');

  const DoneSubtasks = SubtaskColumns(subtasks, 'done');

  return (
    <div className={classNames(className)}>
      <h3 className="margin-top-0">{t('subtasks.header')}</h3>

      <GridContainer className="padding-0">
        <Grid row className="border">
          {/* TO_DO Subtasks */}
          {TodoSubtasks}

          {/* IN_PROGRESS Subtasks */}

          {InProgressSubtasks}

          {/* DONE Subtasks */}
          {DoneSubtasks}
        </Grid>
      </GridContainer>
    </div>
  );
};

export default Subtasks;
