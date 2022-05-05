import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@trussworks/react-uswds';

import CreatePlanBasics from 'queries/CreatePlanBasics';
import { CreatePlanBasics as CreatePlanBasicsType } from 'queries/types/CreatePlanBasics';

type TaskListButtonProps = {
  path: string;
  status: 'READY' | 'IN_PROGRESS' | 'CANNOT_START' | 'COMPLETE';
};

const TaskListButton = ({ path, status }: TaskListButtonProps) => {
  const { t } = useTranslation('modelPlanTaskList');
  const { modelId } = useParams<{ modelId: string }>();
  const history = useHistory();
  const [create] = useMutation<CreatePlanBasicsType>(CreatePlanBasics);

  const handleCreatePlanBasics = () => {
    if (status === 'READY') {
      create({
        variables: {
          input: {
            modelPlanID: modelId
          }
        }
      }).then(response => {
        if (!response.errors) {
          history.push(`task-list/${path}`);
        }
      });
    } else {
      history.push(`/models/${modelId}/task-list/${path}`);
    }
  };

  if (status === 'CANNOT_START' || status === 'COMPLETE') {
    return <></>;
  }

  return (
    <Button type="button" onClick={handleCreatePlanBasics}>
      {status === 'READY'
        ? t('taskListButton.start')
        : t('taskListButton.continue')}
    </Button>
  );
};

export default TaskListButton;
