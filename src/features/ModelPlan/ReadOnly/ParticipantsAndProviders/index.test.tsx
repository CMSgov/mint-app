import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import Sinon from 'sinon';
import {
  modelID,
  participantsAndProvidersMocks as mocks
} from 'tests/mock/readonly';

import ReadOnlyParticipantsAndProviders from './index';

describe('Read Only Model Plan Summary -- Participants And Providers', () => {
  // Stubing Math.random that occurs in Truss Tooltip component for deterministic output
  Sinon.stub(Math, 'random').returns(0.5);

  it('renders without errors', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          `/models/${modelID}/read-only/participants-and-providers`
        ]}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <Route path="/models/:modelID/read-only/participants-and-providers">
            <ReadOnlyParticipantsAndProviders modelID={modelID} />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('tasklist-tag')).toHaveTextContent(
        'In progress'
      );
      expect(screen.getByText('Medicaid providers')).toBeInTheDocument();
    });
  });
  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          `/models/${modelID}/read-only/participants-and-providers`
        ]}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <Route path="/models/:modelID/read-only/participants-and-providers">
            <ReadOnlyParticipantsAndProviders modelID={modelID} />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Medicaid providers')).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
