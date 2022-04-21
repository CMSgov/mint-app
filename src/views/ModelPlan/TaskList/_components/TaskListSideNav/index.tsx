import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button } from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import Modal from 'components/Modal';
import PageHeading from 'components/PageHeading';
import GetModelPlanCollaborators from 'queries/GetModelCollaborators';
import {
  GetModelCollaborators,
  GetModelCollaborators_modelPlan_collaborators as GetCollaboratorsType
} from 'queries/types/GetModelCollaborators';

import TeamMembersList from './TeamMembersList';

const TaskListSideNav = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { t } = useTranslation('modelPlanTaskList');
  const [isModalOpen, setModalOpen] = useState(false);

  const { data } = useQuery<GetModelCollaborators>(GetModelPlanCollaborators, {
    variables: {
      id: modelId
    }
  });

  const collaborators = (data?.modelPlan?.collaborators ??
    []) as GetCollaboratorsType[];

  const renderModal = () => {
    return (
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <PageHeading headingLevel="h2" className="margin-top-0">
          {t('withdraw_modal.header', {
            // TODO: requestName?
            // requestName: intake.requestName
            requestName: 'Requestor Name'
          })}
        </PageHeading>
        <p>{t('withdraw_modal.warning')}</p>
        <Button
          type="button"
          className="margin-right-4"
          // TODO to pass down archive functional prop
          onClick={() => console.log('archive!')}
        >
          {t('withdraw_modal.confirm')}
        </Button>
        <Button type="button" unstyled onClick={() => setModalOpen(false)}>
          {t('withdraw_modal.cancel')}
        </Button>
      </Modal>
    );
  };

  return (
    <>
      {renderModal()}
      <div
        className="sidenav-actions margin-left-4 border-top-05 border-primary-lighter padding-top-2"
        data-testid="sidenav-actions"
      >
        <div className="margin-bottom-1">
          <UswdsReactLink to="/">{t('sideNav.saveAndExit')}</UswdsReactLink>
        </div>
        <Button
          className="line-height-body-5 test-withdraw-request"
          type="button"
          unstyled
          onClick={() => setModalOpen(true)}
        >
          {t('sideNav.remove')}
        </Button>
        <div className="margin-top-4 margin-bottom-7">
          <h4 className="margin-bottom-1">{t('sideNav.relatedContent')}</h4>
          <UswdsReactLink
            aria-label={t('sideNav.ariaLabelForOverview')}
            className="line-height-body-5"
            to="/"
            variant="external"
            target="_blank"
          >
            <Trans i18nKey="modelPlanTaskList:sideNav.overview">
              indexZero
              <span aria-hidden /> indexTwo
            </Trans>
          </UswdsReactLink>
        </div>
        <div>
          <h3 className="margin-bottom-05">{t('sideNav.modelTeam')}</h3>
          <div className="margin-bottom-2">
            <UswdsReactLink to={`/models/${modelId}/collaborators`}>
              {t('sideNav.editTeam')}
            </UswdsReactLink>
          </div>
          <div className="sidenav-actions__teamList">
            <ul className="usa-list usa-list--unstyled">
              <TeamMembersList
                team={collaborators.map(collaborator => collaborator.fullName)}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskListSideNav;
