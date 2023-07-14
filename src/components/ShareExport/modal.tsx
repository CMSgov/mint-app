import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import {
  Button,
  ButtonGroup,
  GridContainer,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton
} from '@trussworks/react-uswds';
import classNames from 'classnames';

import { ReadOnlyComponents } from 'views/ModelPlan/ReadOnly';
import BodyContent from 'views/ModelPlan/ReadOnly/_components/FilterView/BodyContent';
import { filterGroups } from 'views/ModelPlan/ReadOnly/_components/FilterView/BodyContent/_filterGroupMapping';

import ShareExportHeader from '.';

import './index.scss';

type ShareExportModalButtonProps = {
  modalRef: React.RefObject<ModalRef>;
} & JSX.IntrinsicElements['button'];

export const ShareExportModalOpener = ({
  modalRef,
  className,
  children,
  ...buttonProps
}: ShareExportModalButtonProps) => {
  return (
    <Button
      {...buttonProps}
      type="button"
      className={classNames(
        'usa-button--outline text-white shadow-none border-white border-2px',
        className
      )}
      onClick={e => {
        modalRef.current?.toggleModal(e, true);
      }}
    >
      {children}
    </Button>
  );
};

type ShareExportModalProps = {
  modalRef: React.RefObject<ModalRef>;
  modelID: string;
  filteredView?: typeof filterGroups[number];
} & JSX.IntrinsicElements['button'];

/**
 * Modal for sharing/exporting a model plan
 * Used in conjuction with `<ShareExportModalOpener />`.
 */
function ShareExportModal({
  modalRef,
  modelID,
  filteredView
}: ShareExportModalProps) {
  // const { t } = useTranslation('filterView');

  const modalElementId = 'share-export-modal';

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Model Plan'
  });

  const AllReadonlyComponents = ReadOnlyComponents(modelID, false);

  const excludedComponents: string[] = [
    'team',
    'discussions',
    'documents',
    'crs-and-tdl',
    'it-solutions'
  ];

  const ComponentToPrint = (
    <div className="display-none mint-only-print" ref={componentRef}>
      <ShareExportHeader filteredView={filteredView} />
      <GridContainer className="padding-x-8">
        {filteredView ? (
          <BodyContent modelID={modelID} filteredView={filteredView} />
        ) : (
          <>
            {Object.keys(AllReadonlyComponents)
              .filter(
                component => !excludedComponents.includes(component as string)
              )
              .map((component, index) => (
                <div
                  className={classNames({
                    'margin-top-6': index !== 0
                  })}
                >
                  {AllReadonlyComponents[component].component}
                </div>
              ))}
          </>
        )}
      </GridContainer>
    </div>
  );

  return (
    <Modal
      ref={modalRef}
      id={modalElementId}
      className={modalElementId}
      aria-labelledby={`${modalElementId}-heading`}
      aria-describedby={`${modalElementId}-description`}
    >
      <ModalHeading
        id={`${modalElementId}-heading`}
        className="margin-bottom-2"
      >
        Export this Model Plan
      </ModalHeading>

      {ComponentToPrint}

      <ModalFooter>
        <ButtonGroup>
          <Button
            type="button"
            data-close-modal="true"
            disabled={false}
            onClick={handlePrint}
          >
            Submit
          </Button>
          <ModalToggleButton
            modalRef={modalRef}
            closer
            unstyled
            className="padding-105 text-center"
          >
            Cancel
          </ModalToggleButton>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
}

export default ShareExportModal;
