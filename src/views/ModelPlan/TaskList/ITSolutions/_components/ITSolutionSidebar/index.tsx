import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@trussworks/react-uswds';

import AskAQuestion from 'components/AskAQuestion';
import { GetOperationalNeed_operationalNeed as GetOperationalNeedType } from 'queries/ITSolutions/types/GetOperationalNeed';

import { OperationalNeedModalContext } from '../OperationalNeedModalContext';

type ITSolutionsSidebarTypes = {
  modelID: string;
  renderTextFor: 'need' | 'solution' | 'status';
  operationalNeed?: GetOperationalNeedType;
};

const ITSolutionsSidebar = ({
  modelID,
  renderTextFor,
  operationalNeed
}: ITSolutionsSidebarTypes) => {
  const { t } = useTranslation('itSolutions');
  const { setIsModalOpen, setOperationalNeed } = useContext(
    OperationalNeedModalContext
  );

  return (
    <>
      <div className="border-top-05 border-primary-lighter padding-top-2 margin-top-4">
        <AskAQuestion modelID={modelID} renderTextFor={renderTextFor} />
      </div>
      {/* to receive remove operational need */}
      {!!operationalNeed && (
        <div className="margin-top-4">
          <Button
            type="button"
            onClick={() => {
              setOperationalNeed({
                modelID,
                id: operationalNeed.id,
                nameOther: operationalNeed.nameOther ?? ''
              });
              setIsModalOpen(true);
            }}
            className="usa-button usa-button--unstyled line-height-body-5"
          >
            <p>{t('removeNeed')}</p>
          </Button>
        </div>
      )}
      <div className="margin-top-4">
        <p className="text-bold margin-bottom-0">{t('helpfulLinks')}</p>
        <Button
          type="button"
          onClick={() =>
            window.open('/help-and-knowledge/model-plan-overview', '_blank')
          }
          className="usa-button usa-button--unstyled line-height-body-5"
        >
          <p>{t('availableSolutions')}</p>
        </Button>
      </div>
    </>
  );
};

export default ITSolutionsSidebar;
