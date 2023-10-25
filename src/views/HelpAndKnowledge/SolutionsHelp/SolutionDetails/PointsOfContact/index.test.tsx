import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

import { possibleSolutionsMock } from 'data/mock/solutions';
import VerboseMockedProvider from 'utils/testing/MockedProvider';

import { helpSolutions } from '../../solutionsMap';

import PointsOfContact from '.';

const mocks = [...possibleSolutionsMock];

describe('IT Solutions Points of Contact Components', () => {
  it.each(helpSolutions)(`matches the snapshot`, async solutionPoCComponent => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          `/help-and-knowledge/operational-solutions?solution=${solutionPoCComponent.route}&section=points-of-contact`
        ]}
      >
        <Route path="/help-and-knowledge/operational-solutions">
          <VerboseMockedProvider mocks={mocks} addTypename={false}>
            <PointsOfContact solution={solutionPoCComponent} />
          </VerboseMockedProvider>
        </Route>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot(solutionPoCComponent.name);
  });
});
