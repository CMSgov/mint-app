import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  Grid,
  GridContainer,
  Icon,
  Link as TrussLink
} from '@trussworks/react-uswds';
import {
  GetModelPlanBaseQuery,
  useGetModelPlanBaseQuery
} from 'gql/generated/graphql';

import Alert from 'components/Alert';
import Breadcrumbs, { BreadcrumbItemOptions } from 'components/Breadcrumbs';
import Expire from 'components/Expire';
import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import useMessage from 'hooks/useMessage';

import PlanCRTDLsTable from './table';

type ModelPlanType = GetModelPlanBaseQuery['modelPlan'];

type CRTDLStatusType = 'success' | 'error';

export const CRTDLs = () => {
  const { t: h } = useTranslation('general');
  const { t } = useTranslation('crtdlsMisc');
  const { modelID } = useParams<{ modelID: string }>();
  const { message } = useMessage();
  const [crtdlMessage, setCRTDLMessage] = useState('');
  const [crtdlStatus, setCRTDLStatus] = useState<CRTDLStatusType>('error');

  const { data } = useGetModelPlanBaseQuery({
    variables: {
      id: modelID
    }
  });

  const modelPlan = data?.modelPlan || ({} as ModelPlanType);

  return (
    <MainContent data-testid="model-crtdls">
      <GridContainer>
        <Grid desktop={{ col: 12 }}>
          <Breadcrumbs
            items={[
              BreadcrumbItemOptions.HOME,
              BreadcrumbItemOptions.COLLABORATION_AREA,
              BreadcrumbItemOptions.TASK_LIST,
              BreadcrumbItemOptions.CR_TDLS
            ]}
          />

          {message && <Expire delay={45000}>{message}</Expire>}

          {crtdlMessage && (
            <Expire delay={45000}>
              <Alert
                type={crtdlStatus}
                slim
                data-testid="mandatory-fields-alert"
                className="margin-y-4"
              >
                <span className="mandatory-fields-alert__text">
                  {crtdlMessage}
                </span>
              </Alert>
            </Expire>
          )}

          <PageHeading className="margin-top-4 margin-bottom-0">
            {t('heading')}
          </PageHeading>

          <p
            className="margin-top-0 margin-bottom-2 font-body-lg"
            data-testid="model-plan-name"
          >
            {h('for')} {modelPlan.modelName}
          </p>

          <p className="margin-bottom-2 font-body-md line-height-body-4">
            {t('description')}
          </p>

          <TrussLink
            aria-label="Open EUA in a new tab"
            href="https://echimp.cmsnet/"
            target="_blank"
            rel="noopener noreferrer"
            variant="external"
          >
            {t('visitECHIMP')}
          </TrussLink>

          <Alert type="info" slim className="margin-bottom-1">
            {t('echimp')}
          </Alert>

          <UswdsReactLink
            to={`/models/${modelID}/collaboration-area/task-list`}
            className="display-inline-flex flex-align-center margin-y-3"
          >
            <Icon.ArrowBack className="margin-right-1" aria-hidden />
            {h('returnToTaskList')}
          </UswdsReactLink>

          <h4 className="margin-top-2 margin-bottom-1">{t('heading')}</h4>

          <UswdsReactLink
            className="usa-button"
            variant="unstyled"
            to={`/models/${modelID}/collaboration-area/cr-and-tdl/add-cr-and-tdl`}
          >
            {t('addCRTDL')}
          </UswdsReactLink>

          <PlanCRTDLsTable
            modelID={modelID}
            setCRTDLMessage={setCRTDLMessage}
            setCRTDLStatus={setCRTDLStatus}
          />
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default CRTDLs;
