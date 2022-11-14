import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import { MessageProvider } from 'hooks/useMessage';
import GetModelPlanDocuments from 'queries/Documents/GetModelPlanDocuments';
import { DocumentType } from 'types/graphql-global-types';

import ReadOnlyDocuments from './index';

const modelID = 'f11eb129-2c80-4080-9440-439cbe1a286f';

const mocks = [
  {
    request: {
      query: GetModelPlanDocuments,
      variables: { id: modelID }
    },
    result: {
      data: {
        modelPlan: {
          __typename: 'ModelPlan',
          id: modelID,
          isCollaborator: true,
          documents: [
            {
              __typename: 'PlanDocument',
              id: '123',
              modelPlanID: modelID,
              fileType: null,
              bucket: null,
              fileKey: null,
              virusScanned: true,
              virusClean: true,
              restricted: false,
              fileName: null,
              fileSize: 123,
              downloadUrl: null,
              documentType: DocumentType.MARKET_RESEARCH,
              otherType: null,
              optionalNotes: null,
              createdDts: '2022-05-12T15:01:39.190679Z'
            }
          ]
        }
      }
    }
  }
];

describe('Model Plan Documents page', () => {
  it('renders without errors', async () => {
    render(
      <MemoryRouter initialEntries={[`/models/${modelID}/read-only/documents`]}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MessageProvider>
            <Route path="/models/:modelID/read-only/documents">
              <ReadOnlyDocuments modelID={modelID} />
            </Route>
          </MessageProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(
        screen.getByTestId('model-plan-documents-table')
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/models/${modelID}/read-only/documents`]}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MessageProvider>
            <Route path="/models/:modelID/read-only/documents">
              <ReadOnlyDocuments modelID={modelID} />
            </Route>
          </MessageProvider>
        </MockedProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(
        screen.getByTestId('model-plan-documents-table')
      ).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
