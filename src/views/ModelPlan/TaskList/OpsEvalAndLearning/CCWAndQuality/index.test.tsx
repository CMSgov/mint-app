import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import GetCCWAndQuality from 'queries/OpsEvalAndLearning/GetCCWAndQuality';
import { GetCCWAndQuality_modelPlan_opsEvalAndLearning as GetCCWAndQualityType } from 'queries/OpsEvalAndLearning/types/GetCCWAndQuality';
import { CcmInvolvmentType } from 'types/graphql-global-types';

import CCWAndQuality from '.';

const ccwAndQualityMockData: GetCCWAndQualityType = {
  __typename: 'PlanOpsEvalAndLearning',
  id: '123',
  ccmInvolvment: [CcmInvolvmentType.YES_EVALUATION],
  iddocSupport: true,
  sendFilesBetweenCcw: null,
  sendFilesBetweenCcwNote: '',
  appToSendFilesToKnown: null,
  appToSendFilesToWhich: '',
  appToSendFilesToNote: '',
  useCcwForFileDistribiutionToParticipants: null,
  useCcwForFileDistribiutionToParticipantsNote: '',
  developNewQualityMeasures: null,
  developNewQualityMeasuresNote: '',
  qualityPerformanceImpactsPayment: true,
  qualityPerformanceImpactsPaymentNote: ''
};

const ccwAndQualityMock = [
  {
    request: {
      query: GetCCWAndQuality,
      variables: { id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905' }
    },
    result: {
      data: {
        modelPlan: {
          id: 'ce3405a0-3399-4e3a-88d7-3cfc613d2905',
          modelName: 'My excellent plan that I just initiated',
          opsEvalAndLearning: ccwAndQualityMockData
        }
      }
    }
  }
];

describe('Model Plan Ops Eval and Learning CCW and Qualtiy', () => {
  it('renders without errors', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/task-list/ops-eval-and-learning/ccw-and-quality'
        ]}
      >
        <MockedProvider mocks={ccwAndQualityMock} addTypename={false}>
          <Route path="/models/:modelID/task-list/ops-eval-and-learning/ccw-and-quality">
            <CCWAndQuality />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('ops-eval-and-learning-ccw-and-quality-form')
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('ops-eval-and-learning-performance-impact-true')
      ).toBeChecked();
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          '/models/ce3405a0-3399-4e3a-88d7-3cfc613d2905/task-list/ops-eval-and-learning/ccw-and-quality'
        ]}
      >
        <MockedProvider mocks={ccwAndQualityMock} addTypename={false}>
          <Route path="/models/:modelID/task-list/ops-eval-and-learning/ccw-and-quality">
            <CCWAndQuality />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('ops-eval-and-learning-performance-impact-true')
      ).toBeChecked();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
