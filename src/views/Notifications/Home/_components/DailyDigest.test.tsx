import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { GetNotifications_currentUser_notifications_notifications_activity_metaData_DailyDigestCompleteActivityMeta_analyzedAudits as AnalyzedAuditsTypes } from 'gql/gen/types/GetNotifications';

import setup from 'utils/testing/setup';

import DailyDigest from './DailyDigest';

const dailyDigestProps: AnalyzedAuditsTypes[] = [
  {
    __typename: 'AnalyzedAudit',
    id: '6e303abe-0d86-4dab-81f4-f090a985b377',
    modelPlanID: '1bf249a6-577b-42fd-8dd2-46563e3d1d9e',
    modelName: 'Empty Plan',
    date: '2024-03-20T00:00:00Z',
    changes: {
      __typename: 'AnalyzedAuditChange',
      modelPlan: {
        __typename: 'AnalyzedModelPlan',
        oldName: 'Old Name Plan',
        statusChanges: ['PLAN_COMPLETE', 'ICIP_COMPLETE', 'CMS_CLEARANCE']
      },
      documents: {
        __typename: 'AnalyzedDocuments',
        count: 2
      },
      crTdls: null,
      planSections: {
        __typename: 'AnalyzedPlanSections',
        updated: ['plan_basics'],
        readyForReview: [],
        readyForClearance: []
      },
      modelLeads: {
        __typename: 'AnalyzedModelLeads',
        added: [
          {
            __typename: 'AnalyzedModelLeadInfo',
            id: '04194827-1997-470a-b3d4-221abf4b86b6',
            commonName: 'MINT Doe'
          }
        ]
      },
      planDiscussions: null
    }
  }
];

describe('Daily Digest in Notifications', () => {
  it('renders without errors', async () => {
    await act(async () => {
      setup(
        <MemoryRouter initialEntries={[`/notifications`]}>
          <Route path="/notifications">
            <DailyDigest analyzedAudits={dailyDigestProps} />
          </Route>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(
          screen.getByTestId('notification--daily-digest')
        ).toBeInTheDocument();
        expect(screen.getByText(/Empty Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/previously Old Name/i)).toBeInTheDocument();
        expect(
          screen.getByText(/MINT Doe has been added as a model lead/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/This Model Plan is complete/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Updates to Basics/i)).toBeInTheDocument();
        expect(screen.getByText(/2 new documents/i)).toBeInTheDocument();
        expect(
          screen.getByText('View this Model Plan').closest('a')
        ).toHaveAttribute(
          'href',
          `/models/${dailyDigestProps[0].modelPlanID}/read-only`
        );
      });
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/notifications`]}>
        <Route path="/notifications">
          <DailyDigest analyzedAudits={dailyDigestProps} />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('notification--daily-digest')
      ).toBeInTheDocument();
      expect(screen.getByText(/Empty Plan/i)).toBeInTheDocument();
      expect(screen.getByText(/previously Old Name/i)).toBeInTheDocument();
      expect(
        screen.getByText(/MINT Doe has been added as a model lead/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/This Model Plan is complete/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Updates to Basics/i)).toBeInTheDocument();
      expect(screen.getByText(/2 new documents/i)).toBeInTheDocument();
      expect(
        screen.getByText('View this Model Plan').closest('a')
      ).toHaveAttribute(
        'href',
        `/models/${dailyDigestProps[0].modelPlanID}/read-only`
      );
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
