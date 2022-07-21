import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import GetAnticipateDependencies from 'queries/Payments/GetAnticipateDependencies';
import { GetAnticipateDependencies_modelPlan_payments as GetAnticipateDependenciesType } from 'queries/Payments/types/GetAnticipateDependencies';
import { ClaimsBasedPayType, PayType } from 'types/graphql-global-types';

import AnticipateDependencies from './index';

const mockData: GetAnticipateDependenciesType = {
  __typename: 'PlanPayments',
  id: '123',
  payType: [PayType.CLAIMS_BASED_PAYMENTS],
  payClaims: [ClaimsBasedPayType.OTHER],
  creatingDependenciesBetweenServices: null,
  creatingDependenciesBetweenServicesNote: null,
  needsClaimsDataCollection: null,
  needsClaimsDataCollectionNote: null,
  providingThirdPartyFile: null,
  isContractorAwareTestDataRequirements: null
};

const paymentsMock = [
  {
    request: {
      query: GetAnticipateDependencies,
      variables: { id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905' }
    },
    result: {
      data: {
        modelPlan: {
          id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905',
          modelName: 'My excellent plan that I just initiated',
          payments: mockData
        }
      }
    }
  }
];

describe('Model Plan -- Anticipate Dependencies', () => {
  it('renders without errors', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/task-list/payment/anticipating-dependencies'
        ]}
      >
        <MockedProvider mocks={paymentsMock} addTypename={false}>
          <Route path="/models/:modelID/task-list/payment/anticipating-dependencies">
            <AnticipateDependencies />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('payment-anticipate-dependencies-form')
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/task-list/payment/anticipating-dependencies'
        ]}
      >
        <MockedProvider mocks={paymentsMock} addTypename={false}>
          <Route path="/models/:modelID/task-list/payment/anticipating-dependencies">
            <AnticipateDependencies />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('payment-anticipate-dependencies-form')
      ).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
