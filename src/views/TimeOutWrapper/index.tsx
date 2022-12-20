import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIdleTimer } from 'react-idle-timer';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@trussworks/react-uswds';
import { DateTime, Duration } from 'luxon';

import Modal from 'components/Modal';
import { localAuthStorageKey } from 'constants/localAuth';
import useInterval from 'hooks/useInterval';
import { isLocalAuthEnabled } from 'utils/auth';

type TimeOutWrapperProps = {
  children: React.ReactNode;
};

const TimeOutWrapper = ({ children }: TimeOutWrapperProps) => {
  const isLocalAuth =
    isLocalAuthEnabled() &&
    window.localStorage[localAuthStorageKey] &&
    JSON.parse(window.localStorage[localAuthStorageKey]).favorLocalAuth;

  const { authState, oktaAuth } = useOktaAuth();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRemainingArr, setTimeRemainingArr] = useState([0, 'second']);

  const fiveMinutes = Duration.fromObject({ minutes: 5 }).as('milliseconds');

  // Since 5 minutes is used for the `promptTimeout` AND the `timeout`, you effectively have 10 minutes before you're logged out due to inactivity.
  // 5 of those minutes will be uninterrupted, the other 5 will be when the prompt is up.
  const idleTimer = useIdleTimer({
    events: ['mousedown', 'keydown'],
    onIdle: () => {
      if (!isLocalAuth && authState?.isAuthenticated) {
        oktaAuth.signOut();
      }
    },
    onPrompt: () => {
      if (authState?.isAuthenticated) {
        setTimeRemainingArr(formatSessionTimeRemaining(fiveMinutes));
        setIsModalOpen(true);
      }
    },
    promptTimeout: fiveMinutes,
    crossTab: true,
    syncTimers: 1000,
    debounce: 500,
    timeout: fiveMinutes
  });

  const forceRenew = async () => {
    const tokenManager = await oktaAuth.tokenManager;
    tokenManager.renew('idToken');
    tokenManager.renew('accessToken');
  };

  /**
   * @param timeRemainingMs milliseconds
   * @returns [minutes, seconds]
   */
  const formatSessionTimeRemaining = (
    timeRemainingMs: number
  ): [number, string] => {
    const timeRemainingSeconds = timeRemainingMs / 1000;
    const minutes = timeRemainingSeconds / 60;
    // Using Math.ceil() for greater than one minute
    // 299 seconds = 4.983 minutes, but should still display 5 minutes
    // Using Math.floor() for less than one minute
    // 59 seconds = .983 minutes, Using floor so minutes is 0 to display 59 secounds
    const wholeMinutes = minutes > 1 ? Math.ceil(minutes) : Math.floor(minutes);

    if (timeRemainingSeconds > 0) {
      if (wholeMinutes > 0) {
        return [wholeMinutes, 'minute'];
      }
      return [Math.floor(timeRemainingSeconds), 'second'];
    }
    return [0, 'second'];
  };

  const handleModalExit = async () => {
    setIsModalOpen(false);
    idleTimer.reset();
    forceRenew();
  };

  // useInterval starts once the modal is open and stops when it's closed
  // Updates the minutes/seconds in the message
  useInterval(
    () => {
      setTimeRemainingArr(
        formatSessionTimeRemaining(idleTimer.getRemainingTime())
      );
    },
    authState?.isAuthenticated && isModalOpen ? 1000 : null
  );

  // If user is authenticated and has a token, renew it forever one
  // minute before expiration.
  // The user's inactivity will log the user out.
  useEffect(() => {
    const oneMinute = Duration.fromObject({ minutes: 1 }).as('seconds');

    if (authState?.isAuthenticated && authState.accessToken) {
      // expiresAt is in seconds
      const timeUntilTokenExpiration =
        authState?.accessToken?.expiresAt -
        DateTime.local().toSeconds() -
        oneMinute;

      // If token is expired already, sign out!
      if (timeUntilTokenExpiration <= 0) {
        oktaAuth.signOut();
      }

      const timeout = setTimeout(() => {
        forceRenew();
      }, timeUntilTokenExpiration * 1000);

      return () => clearTimeout(timeout);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.isAuthenticated, authState?.accessToken]);

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={handleModalExit}>
        <h3
          className="margin-top-0"
          role="timer"
          aria-live={timeRemainingArr[1] === 'minute' ? 'polite' : 'off'}
          aria-atomic="true"
        >
          {t('auth:modal.title', {
            count: Number(timeRemainingArr[0]),
            context: String(timeRemainingArr[1])
          })}
        </h3>
        <p>{t('auth:modal.dataSaved')}</p>
        <p>
          {t('auth:modal.inactivityWarning', {
            count: Number(timeRemainingArr[0]),
            context: String(timeRemainingArr[1])
          })}
        </p>
        <Button type="button" onClick={handleModalExit}>
          {t('auth:modal.cta')}
        </Button>
      </Modal>
      {children}
    </>
  );
};

export default TimeOutWrapper;
