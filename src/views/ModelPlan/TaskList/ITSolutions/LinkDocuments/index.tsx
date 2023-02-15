/*
View for linking and unlinking existing model plan documents for operational need solutions
*/

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid, IconArrowBack } from '@trussworks/react-uswds';

import Breadcrumbs from 'components/Breadcrumbs';
import UswdsReactLink from 'components/LinkWrapper';
import PageHeading from 'components/PageHeading';
import Alert from 'components/shared/Alert';
import useMessage from 'hooks/useMessage';
import CreateDocumentSolutionLinks from 'queries/ITSolutions/CreateDocumentSolutionLinks';
import DeleteDocumentSolutionLinks from 'queries/ITSolutions/DeleteDocumentSolutionLink';
import GetOperationalSolution from 'queries/ITSolutions/GetOperationalSolution';
import {
  CreateDocumentSolutionLinks as CreateDocumentSolutionLinksType,
  CreateDocumentSolutionLinksVariables
} from 'queries/ITSolutions/types/CreateDocumentSolutionLinks';
import { DeleteDocumentSolutionLinkVariables } from 'queries/ITSolutions/types/DeleteDocumentSolutionLink';
import { GetOperationalNeed_operationalNeed as GetOperationalNeedOperationalNeedType } from 'queries/ITSolutions/types/GetOperationalNeed';
import {
  GetOperationalSolution as GetOperationalSolutionType,
  GetOperationalSolution_operationalSolution as GetOperationalSolutionOperationalSolutionType,
  GetOperationalSolutionVariables
} from 'queries/ITSolutions/types/GetOperationalSolution';
import { OperationalNeedKey } from 'types/graphql-global-types';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import PlanDocumentsTable from 'views/ModelPlan/Documents/table';
import NotFound from 'views/NotFound';

import ITSolutionsSidebar from '../_components/ITSolutionSidebar';
import NeedQuestionAndAnswer from '../_components/NeedQuestionAndAnswer';

export const initialValues: GetOperationalNeedOperationalNeedType = {
  __typename: 'OperationalNeed',
  id: '',
  modelPlanID: '',
  name: '',
  key: OperationalNeedKey.ACQUIRE_AN_EVAL_CONT,
  nameOther: '',
  needed: false,
  solutions: []
};

const LinkDocuments = () => {
  const { modelID, operationalNeedID, operationalSolutionID } = useParams<{
    modelID: string;
    operationalNeedID: string;
    operationalSolutionID: string;
  }>();

  const history = useHistory();
  const { showMessageOnNextPage } = useMessage();

  const { t } = useTranslation('documents');
  const { t: h } = useTranslation('draftModelPlan');

  const { modelName } = useContext(ModelInfoContext);

  const solutionDetailsURL = `/models/${modelID}/task-list/it-solutions/${operationalNeedID}/${operationalSolutionID}/solution-details`;

  // State management for linking/unlinking docs
  const [linkedDocs, setLinkedDocs] = useState<string[]>([]);

  // Original state of linked/unlinked docs
  const [linkedDocsInit, setLinkedDocsInit] = useState<string[]>([]);

  // State management for mutation errors
  const [mutationError, setMutationError] = useState<boolean>(false);

  const { data, error } = useQuery<
    GetOperationalSolutionType,
    GetOperationalSolutionVariables
  >(GetOperationalSolution, {
    variables: {
      id: operationalSolutionID
    }
  });

  const solution = useMemo(() => {
    return (
      data?.operationalSolution ||
      ({} as GetOperationalSolutionOperationalSolutionType)
    );
  }, [data?.operationalSolution]);

  // Sets state of linked docs after fetched from query
  useEffect(() => {
    const linkedDocsFiltered = solution?.documents?.map(
      solutionDoc => solutionDoc.id
    );
    setLinkedDocs(linkedDocsFiltered);
    setLinkedDocsInit(linkedDocsFiltered);
  }, [solution]);

  const [
    createSolutionLinks
  ] = useMutation<CreateDocumentSolutionLinksVariables>(
    CreateDocumentSolutionLinks
  );

  const [deleteSolutionLink] = useMutation<DeleteDocumentSolutionLinkVariables>(
    DeleteDocumentSolutionLinks
  );

  // Checks which documents need to be linked/unlinked and calls/handles mutations
  const handleDocumentLink = async (redirect?: 'back' | null) => {
    const documentsToUpdate = docsToUpdate(linkedDocs, linkedDocsInit);

    Object.keys(documentsToUpdate).forEach(linkType => {
      const mutationType =
        linkType === 'links' ? createSolutionLinks : deleteSolutionLink;

      const linksToUpdate =
        documentsToUpdate[linkType as keyof typeof documentsToUpdate];

      // If no docs to link/unlink - return
      if (linksToUpdate.length === 0) return;

      mutationType({
        variables: {
          solutionID: solution.id,
          documentIDs: linksToUpdate
        }
      })
        .then(response => {
          if (response && !response.errors) {
            showMessageOnNextPage(
              <Alert type="success" slim className="margin-y-4">
                <span className="mandatory-fields-alert__text">
                  {linkType === 'links'
                    ? t('documentLinkSuccess')
                    : t('documentUnLinkSuccess')}
                </span>
              </Alert>
            );
            history.push(solutionDetailsURL);
          } else if (response.errors) {
            setMutationError(true);
          }
        })
        .catch(() => {
          setMutationError(true);
        });
    });
  };

  if (error || !solution) {
    return <NotFound />;
  }

  const breadcrumbs = [
    { text: h('home'), url: '/' },
    { text: h('tasklistBreadcrumb'), url: `/models/${modelID}/task-list/` },
    { text: t('itTracker'), url: `/models/${modelID}/task-list/it-solutions` },
    {
      text: t('solutionDetails'),
      url: solutionDetailsURL
    },
    { text: t('linkDocumentsHeader') }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {mutationError && (
        <Alert type="error" slim>
          {t('documentLinkError')}
        </Alert>
      )}

      <Grid row gap>
        <Grid tablet={{ col: 9 }}>
          <Grid tablet={{ col: 11 }}>
            <PageHeading className="margin-top-4 margin-bottom-1">
              {t('linkDocumentsHeader')}
            </PageHeading>

            <p
              className="margin-top-0 margin-bottom-1 font-body-lg"
              data-testid="model-plan-name"
            >
              {h('for')} {modelName}
            </p>

            <p className="line-height-body-4 margin-bottom-4 margin-top-1">
              {t('linkDocumentsInfo')}
            </p>

            <Grid tablet={{ col: 8 }}>
              <NeedQuestionAndAnswer
                operationalNeedID={operationalNeedID}
                modelID={modelID}
                solution={solution}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid tablet={{ col: 3 }} className="padding-x-1">
          <ITSolutionsSidebar
            modelID={modelID}
            renderTextFor="need"
            helpfulLinks={false}
          />
        </Grid>
      </Grid>

      <h3 className="margin-top-8 margin-bottom-neg-1">
        {t('modelDocuments')}
      </h3>

      <PlanDocumentsTable
        modelID={modelID}
        setDocumentMessage={() => null}
        setDocumentStatus={() => null}
        linkedDocs={linkedDocs}
        setLinkedDocs={setLinkedDocs}
      />

      <Grid tablet={{ col: 6 }}>
        <Button
          type="button"
          onClick={() => handleDocumentLink()}
          className="display-inline-flex flex-align-center margin-y-3"
        >
          {t('linkDocumentsButton')}
        </Button>

        <UswdsReactLink className="display-flex" to={solutionDetailsURL}>
          <IconArrowBack className="margin-right-1" aria-hidden />
          {t('dontLink')}
        </UswdsReactLink>
      </Grid>
    </>
  );
};

const docsToUpdate = (linkedDocs: string[], originalDocs: string[]) => {
  const unlinks = originalDocs.filter(doc => !linkedDocs.includes(doc));
  const links = linkedDocs.filter(doc => !originalDocs.includes(doc));
  return { unlinks, links };
};

export default LinkDocuments;
