import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { Formik } from 'formik';

import { TaskStatus } from 'types/graphql-global-types';

import ReadyForReview from './index';

const onSubmit = (values: any) => {};

const intialValues = {
  id: 'readyForReview',
  field: 'field',
  sectionName: 'Basics',
  status: TaskStatus.IN_PROGRESS,
  readyForReviewBy: 'ASDF',
  readyForReviewDts: '2022-05-12T15:01:39.190679Z',
  setFieldValue: (field: string, value: any) => {}
};

describe('The ReadyForReview Component', () => {
  it('renders the component in formik', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <Formik initialValues={intialValues} onSubmit={onSubmit}>
          <ReadyForReview {...intialValues} />
        </Formik>
      );

      await waitFor(() => {
        expect(getByTestId('readyForReview')).toBeInTheDocument();
      });
    });
  });

  it('renders the component with status = READY_FOR_REVIEW', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <Formik initialValues={intialValues} onSubmit={onSubmit}>
          <ReadyForReview
            {...intialValues}
            status={TaskStatus.READY_FOR_REVIEW}
          />
        </Formik>
      );

      await waitFor(() => {
        const component = getByTestId('readyForReview') as HTMLInputElement;
        expect(component).toBeInTheDocument();
        expect(component.checked).toEqual(true);
      });
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <Formik initialValues={{ testNote: '' }} onSubmit={onSubmit}>
        <ReadyForReview {...intialValues} />
      </Formik>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
