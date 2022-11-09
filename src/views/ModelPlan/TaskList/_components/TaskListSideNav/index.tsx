import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import Modal from 'components/Modal';
import PageHeading from 'components/PageHeading';
import Alert from 'components/shared/Alert';
import IconInitial from 'components/shared/IconInitial';
import useMessage from 'hooks/useMessage';
import ArchiveModelPlan from 'queries/ArchiveModelPlan';
import { GetModelCollaborators_modelPlan_collaborators as GetCollaboratorsType } from 'queries/Collaborators/types/GetModelCollaborators';
import { ArchiveModelPlanVariables } from 'queries/types/ArchiveModelPlan';
import { GetModelPlan_modelPlan as GetModelPlanType } from 'queries/types/GetModelPlan';
import CsvExportLink from 'utils/export/CsvExportLink';

const TaskListSideNav = ({
  modelPlan,
  collaborators
}: {
  modelPlan: GetModelPlanType;
  collaborators: GetCollaboratorsType[];
}) => {
  const { id: modelID } = modelPlan;
  const history = useHistory();
  const { t } = useTranslation('modelPlanTaskList');
  const { showMessageOnNextPage } = useMessage();
  const [isModalOpen, setModalOpen] = useState(false);

  const [update] = useMutation<ArchiveModelPlanVariables>(ArchiveModelPlan);

  const archiveModelPlan = () => {
    update({
      variables: {
        id: modelID,
        archived: true
      }
    })
      .then(response => {
        if (!response?.errors) {
          showMessageOnNextPage(
            <>
              <Alert
                type="success"
                slim
                data-testid="mandatory-fields-alert"
                className="margin-y-4"
              >
                <span className="mandatory-fields-alert__text">
                  {t('withdraw_modal.confirmationText_name', {
                    modelName: modelPlan.modelName
                  })}
                </span>
              </Alert>
            </>
          );
          history.push(`/`);
        }
      })
      .catch(errors => {
        setModalOpen(false);
      });
  };

  const renderModal = () => {
    return (
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <PageHeading headingLevel="h2" className="margin-y-0">
          {t('withdraw_modal.header', {
            requestName: modelPlan.modelName
          })}
        </PageHeading>
        <p className="margin-top-2 margin-bottom-3">
          {t('withdraw_modal.warning')}
        </p>
        <Button
          type="button"
          className="margin-right-4 bg-error"
          onClick={() => archiveModelPlan()}
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
        className="sidenav-actions border-top-05 border-primary-lighter padding-top-2 margin-top-2"
        data-testid="sidenav-actions"
      >
        <UswdsReactLink to="/" className="display-block">
          {t('sideNav.saveAndExit')}
        </UswdsReactLink>
        <div className="flex-align-self-center margin-y-2">
          <CsvExportLink modelPlanID={modelID} includeAll={false} />
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
          <Button
            type="button"
            onClick={() =>
              window.open('/help-and-knowledge/model-plan-overview', '_blank')
            }
            className="usa-button usa-button--unstyled line-height-body-5"
          >
            <Trans i18nKey="modelPlanTaskList:sideNav.overview">
              indexZero
              <span aria-hidden /> indexTwo
            </Trans>
          </Button>
        </div>
        <div>
          <h3 className="margin-bottom-05">{t('sideNav.modelTeam')}</h3>
          <div className="margin-bottom-2">
            <UswdsReactLink to={`/models/${modelID}/collaborators`}>
              {t('sideNav.editTeam')}
            </UswdsReactLink>
          </div>
          <div className="sidenav-actions__teamList">
            <ul className="usa-list usa-list--unstyled">
              {collaborators.map((collaborator, index) => {
                return (
                  <IconInitial
                    key={collaborator.euaUserID}
                    user={collaborator.fullName}
                    index={index}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskListSideNav;
