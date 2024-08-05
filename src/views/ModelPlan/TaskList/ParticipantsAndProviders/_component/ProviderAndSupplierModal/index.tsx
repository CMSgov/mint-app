import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import {
  Button,
  Grid,
  GridContainer,
  Icon,
  SideNav as TrussSideNav
  // Table as UswdsTable
} from '@trussworks/react-uswds';

import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import {
  ExistingProviderSupplierTypes,
  existingProviderSupplierTypesNames
} from 'i18n/en-US/modelPlan/participantsAndProviders';

import ProviderAndSupplierTable from '../ProviderAndSupplierTable';

import './index.scss';

type ProviderAndSupplierModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ProviderAndSupplierModal = ({
  isOpen,
  closeModal
}: ProviderAndSupplierModalProps) => {
  const { t: modalT } = useTranslation('participantsAndProvidersMisc');
  const isMobile = useCheckResponsiveScreen('tablet');

  const [activeType, setActiveType] = useState<ExistingProviderSupplierTypes>(
    ExistingProviderSupplierTypes.PROVIDER_TYPES_INSTITUTIONAL
  );

  const providerAndSupplierTypes: Record<
    ExistingProviderSupplierTypes,
    string
  > = modalT('modal.existingProviderSupplierTypesNames', {
    returnObjects: true
  });

  const sidenavItems = Object.entries(providerAndSupplierTypes).map(
    ([key, value]) => {
      return (
        <Button
          type="button"
          unstyled
          className={`sidenav-button line-height-sans-3 width-full ${
            activeType === key ? 'current' : ''
          }`}
          onClick={() => setActiveType(key as ExistingProviderSupplierTypes)}
        >
          {value}
        </Button>
      );
    }
  );

  const renderModal = () => {
    return (
      <ReactModal
        isOpen={isOpen}
        overlayClassName="mint-discussions__overlay overflow-y-scroll"
        className="mint-discussions__content solution-details-modal"
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick
        appElement={document.getElementById('root')! as HTMLElement}
      >
        <div data-testid="provider-physician-type-modal">
          <div className="mint-discussions__x-button-container display-flex text-base flex-align-center">
            <button
              type="button"
              data-testid="close-discussions"
              className="mint-discussions__x-button margin-right-2"
              aria-label="Close Modal"
              onClick={closeModal}
            >
              <Icon.Close size={4} className="text-base" />
            </button>
            <h4 className="margin-0">{modalT('modal.title')}</h4>
          </div>

          <div className="bg-primary-darker text-white padding-x-4 padding-top-5 padding-bottom-6">
            <div>
              <h1 className="margin-0 margin-top-05 line-height-body-2">
                {modalT('modal.title')}
              </h1>
              <h4 className="margin-0 text-primary-lighter">
                {modalT('modal.asOfDate')}
              </h4>
            </div>
          </div>

          <GridContainer className="padding-y-6 margin-left-0">
            <Grid row gap>
              {!isMobile && (
                <Grid desktop={{ col: 3 }}>
                  <div id="provider-supplier-modal--sidenav">
                    <TrussSideNav items={sidenavItems} />
                  </div>
                </Grid>
              )}

              <Grid desktop={{ col: 8 }}>
                <h2 className="margin-top-0">
                  {existingProviderSupplierTypesNames[activeType]}
                </h2>
                <ProviderAndSupplierTable type={activeType} />
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </ReactModal>
    );
  };

  return <>{renderModal()}</>;
};

export default ProviderAndSupplierModal;
