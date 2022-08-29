import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor, within } from '@testing-library/react';

import GetModelSummary from 'queries/ReadOnly/GetModelSummary';
import { GetModelSummary_modelPlan as GetModelSummaryTypes } from 'queries/ReadOnly/types/GetModelSummary';
import { KeyCharacteristic, ModelStatus } from 'types/graphql-global-types';
import { translateKeyCharacteristics } from 'utils/modelPlan';

import ReadOnly from './index';

const mockData: GetModelSummaryTypes = {
  __typename: 'ModelPlan',
  modelName: 'Testing Model Summary',
  modifiedDts: '2022-08-27T04:00:00Z',
  status: ModelStatus.PLAN_DRAFT,
  basics: {
    __typename: 'PlanBasics',
    goal: 'This is the goal',
    applicationsStart: '2022-08-20T04:00:00Z'
  },
  generalCharacteristics: {
    __typename: 'PlanGeneralCharacteristics',
    keyCharacteristics: [KeyCharacteristic.EPISODE_BASED]
  },
  collaborators: [
    { __typename: 'PlanCollaborator', fullName: 'First Collaborator' }
  ]
};

const mock = [
  {
    request: {
      query: GetModelSummary,
      variables: { id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905' }
    },
    result: {
      data: {
        modelPlan: {
          id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905',
          ...mockData
        }
      }
    }
  }
];

describe('Read Only Model Plan Summary', () => {
  it('renders without errors', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/read-only/model-basics'
        ]}
      >
        <MockedProvider mocks={mock} addTypename={false}>
          <Route path="/models/:modelID/read-only/:subinfo">
            <ReadOnly />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('read-only-model-summary')).toBeInTheDocument();
    });

    await waitFor(() => {
      const { getByText } = within(
        screen.getByTestId('read-only-model-summary__description')
      );
      expect(getByText('This is the goal')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('First Collaborator')).toBeInTheDocument();
      expect(screen.getByText('August 20, 2022')).toBeInTheDocument();
      expect(
        screen.getByText(
          translateKeyCharacteristics(KeyCharacteristic.EPISODE_BASED)
        )
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/read-only/model-basics'
        ]}
      >
        <MockedProvider mocks={mock} addTypename={false}>
          <Route path="/models/:modelID/read-only/:subinfo">
            <ReadOnly />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('read-only-model-summary')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  describe.only('Status Tag updates', () => {
    it('renders "ICIP complete" tag and alert', async () => {
      mock[0].result.data.modelPlan.status = ModelStatus.ICIP_COMPLETE;
      render(
        <MemoryRouter
          initialEntries={[
            '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/read-only/model-basics'
          ]}
        >
          <MockedProvider mocks={mock} addTypename={false}>
            <Route path="/models/:modelID/read-only/:subinfo">
              <ReadOnly />
            </Route>
          </MockedProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('tag').textContent).toContain(
          'ICIP complete'
        );
        expect(screen.getByTestId('alert')).toBeInTheDocument();
      });
    });

    it('renders "Cleared" tag and does not render alert', async () => {
      mock[0].result.data.modelPlan.status = ModelStatus.CLEARED;
      render(
        <MemoryRouter
          initialEntries={[
            '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/read-only/model-basics'
          ]}
        >
          <MockedProvider mocks={mock} addTypename={false}>
            <Route path="/models/:modelID/read-only/:subinfo">
              <ReadOnly />
            </Route>
          </MockedProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('tag').textContent).toContain('Cleared');
        expect(screen.queryByTestId('alert')).toBeNull();
      });
    });
  });
});
