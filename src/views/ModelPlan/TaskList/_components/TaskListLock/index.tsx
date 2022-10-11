import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconStar } from '@trussworks/react-uswds';

import { arrayOfColors } from 'components/shared/IconInitial';
import { GetModelCollaborators_modelPlan_collaborators as GetCollaboratorsType } from 'queries/Collaborators/types/GetModelCollaborators';
import { getUserInitials } from 'utils/modelPlan';

import './index.scss';

type TaskListLockProps = {
  collaborator: GetCollaboratorsType | undefined;
  isAssessment: boolean;
};

const TaskListLock = ({ collaborator, isAssessment }: TaskListLockProps) => {
  const { t } = useTranslation('modelPlanTaskList');

  const randomColorIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      {(collaborator || isAssessment) && (
        <div className="display-inline-flex">
          {isAssessment ? (
            <div className="assessment-container width-4 height-4 display-flex flex-justify-center bg-primary margin-right-1">
              <IconStar size={3} className="assessment-icon text-white" />
            </div>
          ) : (
            <div
              className={`display-flex flex-align-center flex-justify-center circle-4 margin-right-1 flex-none ${
                arrayOfColors[randomColorIndex(0, 3)]
              }`}
            >
              {getUserInitials(collaborator!.fullName)}
            </div>
          )}

          <div className="display-flex flex-align-center line-height-body-4">
            {isAssessment ? t('assessmentLocked') : t('locked')}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskListLock;
