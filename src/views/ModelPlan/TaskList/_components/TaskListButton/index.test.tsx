import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';

import GetModelPlanQuery from 'queries/GetModelPlan';
import { GetModelPlan_modelPlan as GetModelPlanTypes } from 'queries/types/GetModelPlan';
import {
  CMMIGroup,
  CMSCenter,
  ModelCategory,
  ModelStatus
} from 'types/graphql-global-types';

import TaskListButton from './index';

describe('The Header component', () => {
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
    archived: false,
    basics: null
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

  const renderedComponent = (
    status: 'READY' | 'IN_PROGRESS' | 'CANNOT_START' | 'COMPLETE' = 'READY'
  ) =>
    render(
      <MemoryRouter initialEntries={[`/models/${modelPlan.id}/task-list`]}>
        <MockedProvider mocks={[modelPlanQuery(modelPlan)]} addTypename={false}>
          <TaskListButton path="/" status={status} />
        </MockedProvider>
      </MemoryRouter>
    );

  it('renders without crashing', async () => {
    renderedComponent();
    expect(await screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  describe('displays the correct text', () => {
    it('for IN_PROGRESS status', () => {
      renderedComponent('IN_PROGRESS');

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
    it('for CANNOT_START status', () => {
      renderedComponent('CANNOT_START');

      expect(screen.queryByRole('button')).toBeNull();
    });
  });
});
