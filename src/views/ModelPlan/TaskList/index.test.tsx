import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import GetModelPlanQuery from 'queries/GetModelPlanQuery';
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
      testInventions: null,
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
    }
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
          <Route path="/models/:modelId/task-list" component={TaskList} />
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
          <Route path="/models/:modelId/task-list" component={TaskList} />
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
          <Route path="/models/:modelId/task-list" component={TaskList} />
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
            <Route path="/models/:modelId/task-list" component={TaskList} />
          </MockedProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getAllByTestId('tasklist-tag')[0]).toHaveClass(
          'bg-accent-cool'
        );
        expect(screen.getAllByTestId('tasklist-tag')[0]).toHaveTextContent(
          'Ready to start'
        );
      });
    });
  });
});
