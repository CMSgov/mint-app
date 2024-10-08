import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TaskStatus } from 'gql/generated/graphql';

import TitleAndStatus from './index';

describe('Title and Status component for Read Only Pages', () => {
  it('renders without crashing', async () => {
    render(
      <TitleAndStatus
        clearance={false}
        clearanceTitle="Clearance"
        heading="Regular Heading"
        isViewingFilteredView={false}
        status={TaskStatus.IN_PROGRESS}
        modelID="123"
        modifiedOrCreatedDts="2021-09-01T00:00:00Z"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Regular Heading')).toBeInTheDocument();
      expect(screen.getByText('In progress')).toBeInTheDocument();
    });
  });

  it('renders Clearance heading', async () => {
    render(
      <TitleAndStatus
        clearance
        clearanceTitle="Clearance"
        heading="Regular Heading"
        isViewingFilteredView={false}
        status={TaskStatus.IN_PROGRESS}
        modelID="123"
        modifiedOrCreatedDts="2021-09-01T00:00:00Z"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Clearance')).toBeInTheDocument();
      expect(screen.getByText('In progress')).toBeInTheDocument();
    });
  });

  it('renders the correct status', async () => {
    render(
      <TitleAndStatus
        clearance
        clearanceTitle="Clearance"
        heading="Regular Heading"
        isViewingFilteredView={false}
        status={TaskStatus.READY_FOR_CLEARANCE}
        modelID="123"
        modifiedOrCreatedDts="2021-09-01T00:00:00Z"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Clearance')).toBeInTheDocument();
      expect(screen.getByText('Ready for clearance')).toBeInTheDocument();
    });
  });

  it('does not render status for Filtered View groups', () => {
    render(
      <TitleAndStatus
        clearance
        clearanceTitle="Clearance"
        heading="Regular Heading"
        isViewingFilteredView
        status={TaskStatus.READY_FOR_CLEARANCE}
        modelID="123"
        modifiedOrCreatedDts="2021-09-01T00:00:00Z"
      />
    );

    expect(screen.getByText('Clearance')).toBeInTheDocument();
    expect(screen.queryByTestId('tasklist-tag')).not.toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <TitleAndStatus
        clearance={false}
        clearanceTitle="Clearance"
        heading="Regular Heading"
        isViewingFilteredView={false}
        status={TaskStatus.IN_PROGRESS}
        modelID="123"
        modifiedOrCreatedDts="2021-09-01T00:00:00Z"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Regular Heading')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
