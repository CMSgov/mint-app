import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskListSubscriptionSubscription } from 'gql/gen/graphql';

import { AvatarCircle } from 'components/shared/Avatar';

type LockedByUserAccount = TaskListSubscriptionSubscription['onLockTaskListSectionContext']['lockStatus']['lockedByUserAccount'];

type TaskListLockProps = {
  lockedByUserAccount: LockedByUserAccount | undefined;
  isAssessment: boolean;
  selfLocked: boolean;
};

const TaskListLock = ({
  lockedByUserAccount,
  isAssessment,
  selfLocked
}: TaskListLockProps) => {
  const { t } = useTranslation('modelPlanTaskList');

  const lockMessage = isAssessment
    ? t('assessmentLocked', {
        assessmentUser: lockedByUserAccount?.commonName
      })
    : t('locked', {
        teamMember: lockedByUserAccount?.commonName
      });

  return (
    <>
      {lockedByUserAccount && (
        <div className="display-inline-flex">
          <AvatarCircle
            user={lockedByUserAccount.commonName}
            isAssessment={isAssessment}
            className="margin-right-1"
          />

          <div className="display-flex flex-align-center line-height-body-4 text-base">
            {selfLocked ? t('selfLocked') : lockMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskListLock;
