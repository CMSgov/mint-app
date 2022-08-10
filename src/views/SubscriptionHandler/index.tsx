/**
  Subscription handler for checking lock statuses, adding locks, and removing locks
  Utilizes the SubscriptionContext to listen for updates made from locking/unlocking mutations
  Uses app location to identify the model plan and current task list section of the model plan
  Redirects locked and errors states to /locked-task-list-section view
 */

import React, { useContext, useEffect, useRef } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useOktaAuth } from '@okta/okta-react';

import LockTaskListSection from 'queries/TaskListSubscription/LockTaskListSection';
import { LockTaskListSectionVariables } from 'queries/TaskListSubscription/types/LockTaskListSection';
import { TaskListSubscription_onTaskListSectionLocksChanged_lockStatus as LockSectionType } from 'queries/TaskListSubscription/types/TaskListSubscription';
import { UnlockTaskListSectionVariables } from 'queries/TaskListSubscription/types/UnlockTaskListSection';
import UnlockTackListSection from 'queries/TaskListSubscription/UnlockTackListSection';
import { TaskListSection } from 'types/graphql-global-types';
import { isUUID } from 'utils/modelPlan';
import { SubscriptionContext } from 'views/SubscriptionWrapper';

type SubscriptionHandlerProps = {
  children: React.ReactNode;
};

export enum LockStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  OCCUPYING = 'OCCUPYING',
  CANT_LOCK = 'CANT_LOCK'
}

type TaskListSectionMapType = {
  [key: string]: string;
};

// Map used to connect url route to Subscription Task List Section
export const taskListSectionMap: TaskListSectionMapType = {
  basics: TaskListSection.MODEL_BASICS,
  beneficiaries: TaskListSection.BENEFICIARIES,
  characteristics: TaskListSection.GENERAL_CHARACTERISTICS,
  'it-tools': TaskListSection.IT_TOOLS,
  'ops-eval-and-learning': TaskListSection.OPERATIONS_EVALUATION_AND_LEARNING,
  'participants-and-providers': TaskListSection.PARTICIPANTS_AND_PROVIDERS,
  payment: TaskListSection.PAYMENT
};

// Find lock and sets the LockStatus of the current task list section
// Returns - LOCKED || UNLOCKED || OCCUPYING
export const findLockedSection = (
  locks: LockSectionType[],
  route: string,
  userEUA?: string
): LockStatus => {
  const foundLockedSection = locks.find(
    (section: LockSectionType) => section.section === route
  );

  // If the locked section is not found, set to UNLOCKED, then send mutation to lock
  if (!foundLockedSection) {
    return LockStatus.UNLOCKED;
  }
  if (foundLockedSection && foundLockedSection.lockedBy !== userEUA) {
    // If the locked section is found - render locked screen
    return LockStatus.LOCKED;
  }
  // user currently has the lock
  return LockStatus.OCCUPYING;
};

const SubscriptionHandler = ({ children }: SubscriptionHandlerProps) => {
  // Gets the modelID and tasklist section route from any location within the application
  const { pathname } = useLocation();
  const modelID = pathname.split('/')[2];
  const taskListRoute = pathname.split('/')[4];

  const history = useHistory();

  const validModelID: boolean = isUUID(modelID);

  const prevPath = useRef<string>('');
  // Used in addtion to mutation loading states to catch delayed updates to the context
  const locking = useRef<boolean>(false);

  let lockState: LockStatus;

  const taskListSection = taskListSectionMap[taskListRoute];

  const { authState } = useOktaAuth();

  // Get the subscription context - messages (locks, unlocks), loading
  const { taskListSectionLocks, loading } = useContext(SubscriptionContext);

  const [
    addLock,
    { loading: addLockLoading }
  ] = useMutation<LockTaskListSectionVariables>(LockTaskListSection);

  const [
    removeLock,
    { loading: removeLockLoading }
  ] = useMutation<UnlockTaskListSectionVariables>(UnlockTackListSection);

  /**
   * Checks to see the status of task list section
   * Returns - 'LOCKED', 'UNLOCKED', 'OCCUPYING', or 'CANT_LOCK' (pages that don't require locking)
   * 'OCCUPYING' refers to the current user already occupying the page
   */
  if (
    taskListSection &&
    taskListSectionLocks &&
    authState?.euaId &&
    !addLockLoading &&
    !removeLockLoading &&
    !locking.current &&
    !loading
  ) {
    lockState = findLockedSection(
      taskListSectionLocks,
      taskListSection,
      authState?.euaId as string
    );
  } else {
    lockState = LockStatus.CANT_LOCK;
  }

  console.log(lockState);

  // Checks the location before unmounting to see if lock should be unlocked
  useEffect(() => {
    return () => {
      prevPath.current = pathname;
    };
  }, [pathname]);

  if (lockState === LockStatus.LOCKED) {
    return (
      <Redirect
        push
        to={{
          pathname: `/models/${modelID}/locked-task-list-section`,
          // Passing the route for breadcrumbs on locked section page
          state: { route: taskListRoute }
        }}
      />
    );
  }

  // Removes a section that is locked
  const removeLockedSection = (section: LockSectionType | undefined) => {
    const prevModelID = prevPath.current.split('/')[2];

    // Check if the prev path was a part of a model plan
    if (section && isUUID(prevModelID)) {
      removeLock({
        variables: {
          modelPlanID: section.modelPlanID,
          section: section.section
        }
      }).catch(() => {
        history.push({
          pathname: `/models/${modelID}/locked-task-list-section`,
          // Passing error status to default error page
          state: { route: taskListRoute, error: true }
        });
      });
    }
  };

  // Checks to see if section should be unlocked and calls mutation
  if (
    (!validModelID || !taskListSection) &&
    taskListSectionLocks?.length > 0 &&
    !addLockLoading &&
    !removeLockLoading &&
    !locking.current &&
    !loading
  ) {
    const lockedSection = taskListSectionLocks.find(
      (section: LockSectionType) => section.lockedBy === authState?.euaId
    );

    removeLockedSection(lockedSection);
  }

  // Checks to see if section should be locked and calls mutation to add lock
  if (
    lockState === LockStatus.UNLOCKED &&
    taskListSection &&
    validModelID &&
    !addLockLoading &&
    !removeLockLoading &&
    !locking.current &&
    !loading
  ) {
    const prevLockedSection = taskListSectionLocks.find(
      (section: LockSectionType) =>
        section.lockedBy === authState?.euaId &&
        taskListSection !== section.section
    );

    // If coming from IT Tools
    // (Or any react-router redirect from one section directly to another)
    if (prevLockedSection) removeLockedSection(prevLockedSection);

    locking.current = true;

    addLock({
      variables: {
        modelPlanID: modelID,
        section: taskListSection
      }
    })
      .then(() => {
        /**
         * TODO: Remove if ref counts are removed along with locking state
         * There is a slight delay in th receiving the mutation status from the context
         * Occasionally mutation fires quickly twice, adding 2 to the ref count
         */
        setTimeout(() => {
          locking.current = false;
        }, 100);
      })
      .catch(() => {
        history.push({
          pathname: `/models/${modelID}/locked-task-list-section`,
          // Passing error status to default error page
          state: { route: taskListRoute, error: true }
        });
      });
  }

  return <div>{children}</div>;
};

export default SubscriptionHandler;
