import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import GetModelPlanQuery from 'queries/GetModelPlan';
import { GetModelPlan_modelPlan as GetModelPlanTypes } from 'queries/types/GetModelPlan';
import {
  CMMIGroup,
  CMSCenter,
  ModelCategory,
  ModelStatus
} from 'types/graphql-global-types';

import TaskList from './index';

describe('The Model Plan Task List', () => {
  const modelPlan = {
    __typename: 'ModelPlan',
    id: '6e224030-09d5-46f7-ad04-4bb851b36eab',
    status: ModelStatus.PLAN_DRAFT,
    modelName: 'Test',
    modelCategory: ModelCategory.PRIMARY_CARE_TRANSFORMATION,
    cmmiGroups: [
      CMMIGroup.STATE_INNOVATIONS_GROUP,
      CMMIGroup.POLICY_AND_PROGRAMS_GROUP
    ],
    cmsCenters: [CMSCenter.CENTER_FOR_MEDICARE, CMSCenter.OTHER],
    cmsOther: 'The Center for Awesomeness ',
    modifiedDts: '2022-05-12T15:01:39.190679Z',
    archived: false,
    basics: {
      id: 'adsf',
      modelPlanID: '6e224030-09d5-46f7-ad04-4bb851b36eab',
      modelType: null,
      problem: null,
      goal: null,
      testInterventions: null,
      note: null,
      status: 'READY'
    },
    milestones: {
      id: 'adsf',
      modelPlanID: '6e224030-09d5-46f7-ad04-4bb851b36eab',
      completeICIP: null,
      clearanceStarts: null,
      clearanceEnds: null,
      announced: null,
      applicationsStart: null,
      applicationsEnd: null,
      performancePeriodStarts: null,
      performancePeriodEnds: null,
      wrapUpEnds: null,
      highLevelNote: null,
      phasedIn: null,
      phasedInNote: null,
      status: 'READY'
    },
    opsEvalAndLearning: [] as any,
    generalCharacteristics: [] as any,
    participantsAndProviders: [] as any,
    beneficiaries: [] as any,
    documents: [
      {
        id: '6e224030-09d5-46f7-ad04-4bb851b36eab',
        fileName: 'test.pdf'
      }
    ],
    discussions: [
      {
        __typename: 'PlanDiscussion',
        id: '123',
        content: 'This is a question.',
        createdBy: 'John Doe',
        createdDts: '2022-05-12T15:01:39.190679Z',
        status: 'UNANSWERED',
        replies: []
      },
      {
        __typename: 'PlanDiscussion',
        id: '456',
        content: 'This is a second question.',
        createdBy: 'Jane Doe',
        createdDts: '2022-05-12T15:01:39.190679Z',
        status: 'ANSWERED',
        replies: [
          {
            __typename: 'DiscussionReply',
            discussionID: '456',
            resolution: true,
            id: 'abc',
            content: 'This is an answer.',
            createdBy: 'Jack Doe',
            createdDts: '2022-05-12T15:01:39.190679Z'
          }
        ]
      }
    ]
  } as GetModelPlanTypes;

  const modelPlanQuery = (modelPlanDraft: GetModelPlanTypes) => {
    return {
      request: {
        query: GetModelPlanQuery,
        variables: {
          id: modelPlan.id
        }
      },
      result: {
        data: {
          modelPlan: modelPlanDraft
        }
      }
    };
  };

  it('renders without crashing', async () => {
    render(
      <MemoryRouter initialEntries={[`/models/${modelPlan.id}/task-list`]}>
        <MockedProvider mocks={[modelPlanQuery(modelPlan)]} addTypename={false}>
          <Route path="/models/:modelID/task-list" component={TaskList} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(
      await screen.findByTestId('model-plan-task-list')
    ).toBeInTheDocument();
  });

  it('displays the model plan task list steps', async () => {
    modelPlan.modelName = '';
    render(
      <MemoryRouter initialEntries={[`/models/${modelPlan.id}/task-list`]}>
        <MockedProvider mocks={[modelPlanQuery(modelPlan)]} addTypename={false}>
          <Route path="/models/:modelID/task-list" component={TaskList} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('task-list')).toBeInTheDocument();
  });

  it('displays the model plan name', async () => {
    modelPlan.modelName = "PM Butler's great plan";
    render(
      <MemoryRouter initialEntries={[`/models/${modelPlan.id}/task-list`]}>
        <MockedProvider mocks={[modelPlanQuery(modelPlan)]} addTypename={false}>
          <Route path="/models/:modelID/task-list" component={TaskList} />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('model-plan-name').textContent).toContain(
        "for PM Butler's great plan"
      );
    });
  });

  describe('Statuses', () => {
    it('renders proper buttons for Model Basics', async () => {
      modelPlan.modelCategory = null;
      modelPlan.cmsCenters = [];
      render(
        <MemoryRouter initialEntries={[`/models/${modelPlan.id}/task-list`]}>
          <MockedProvider
            mocks={[modelPlanQuery(modelPlan)]}
            addTypename={false}
          >
            <Route path="/models/:modelID/task-list" component={TaskList} />
          </MockedProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Ready to start')).toHaveClass(
          'bg-accent-cool'
        );
      });
    });
  });
});
