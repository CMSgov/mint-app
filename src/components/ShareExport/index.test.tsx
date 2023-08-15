import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mount } from 'enzyme';
import toJson, { OutputMapper } from 'enzyme-to-json';

import allMocks, { modelID, summaryMock } from 'data/mock/readonly';
import VerboseMockedProvider from 'utils/testing/MockedProvider';
import renameTooltipAriaAndID from 'utils/testing/snapshotSerializeReplacements';

import ShareExportModal from './index';

describe('ShareExportModal', () => {
  it('renders modal with prepopulated filter', async () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter
        initialEntries={[`/models/${modelID}/read-only/model-basics`]}
      >
        <VerboseMockedProvider
          mocks={[...allMocks, ...summaryMock]}
          addTypename={false}
        >
          <Route path="/models/:modelID/read-only/model-basics">
            <ShareExportModal
              modelID={modelID}
              closeModal={() => null}
              filteredView="ccw"
            />
          </Route>
        </VerboseMockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Renders default Fitler group option if supplied
      expect(getByText('Testing Model Summary')).toBeInTheDocument();
      const combobox = getByTestId('combo-box-select');
      expect(combobox).toHaveValue('ccw');

      // Select new filter group option
      userEvent.selectOptions(combobox, ['cmmi']);
      expect(combobox).toHaveValue('cmmi');

      // Check if export is disabled
      const exportSubmit = getByTestId('export-model-plan');
      expect(exportSubmit).toBeDisabled();

      // Select new filter group option
      const pdfCheckbox = getByTestId('share-export-modal-file-type-pdf');
      userEvent.click(pdfCheckbox);

      expect(exportSubmit).not.toBeDisabled();
    });
  });

  it('matches the snapshot', async () => {
    const component = mount(
      <MemoryRouter
        initialEntries={[`/models/${modelID}/read-only/model-basics`]}
      >
        <VerboseMockedProvider
          mocks={[...allMocks, ...summaryMock]}
          addTypename={false}
        >
          <Route path="/models/:modelID/read-only/model-basics">
            <ShareExportModal modelID={modelID} closeModal={() => null} />
          </Route>
        </VerboseMockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(component.text().includes('Testing Model Summary')).toBe(true);
    });

    expect(
      toJson(component, {
        mode: 'deep',
        map: renameTooltipAriaAndID as OutputMapper
      })
    ).toMatchSnapshot();
  });
});
