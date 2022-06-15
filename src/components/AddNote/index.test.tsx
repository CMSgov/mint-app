import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';

import AddNote from './index';

const onSubmit = (values: any) => {};

describe('The AddNote component', () => {
  it('adds input to field', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <Formik initialValues={{ testNote: '' }} onSubmit={onSubmit}>
          <AddNote id="test-note" field="testNote" />
        </Formik>
      );

      screen.getByRole('button', { name: /Add an additional note/i }).click();

      await waitFor(() => {
        userEvent.type(getByTestId('test-note'), 'Test Note');

        expect(getByTestId('test-note')).toHaveValue('Test Note');
      });
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <Formik initialValues={{ testNote: '' }} onSubmit={onSubmit}>
        <AddNote id="test-note" field="testNote" />
      </Formik>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
