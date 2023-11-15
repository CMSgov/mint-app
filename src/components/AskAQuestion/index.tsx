import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@trussworks/react-uswds';

import Discussions from 'views/ModelPlan/Discussions';
import DiscussionModalWrapper from 'views/ModelPlan/Discussions/DiscussionModalWrapper';

type AskAQuestionType = {
  modelID: string;
  renderTextFor?: 'need' | 'solution' | 'status';
};

const AskAQuestion = ({ modelID, renderTextFor }: AskAQuestionType) => {
  const { t } = useTranslation('discussions');
  const { t: o } = useTranslation('itSolutions');
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  const renderText = (text: string | undefined) => {
    switch (text) {
      case 'need':
        return o('notSureWhatToDoNext');
      case 'status':
        return o('helpTiming');
      case 'solution':
      default:
        return o('helpChoosing');
    }
  };

  return (
    <>
      {isDiscussionOpen && (
        <DiscussionModalWrapper
          isOpen={isDiscussionOpen}
          closeModal={() => setIsDiscussionOpen(false)}
        >
          <Discussions modelID={modelID} askAQuestion />
        </DiscussionModalWrapper>
      )}

      <div className="padding-2 bg-primary-lighter">
        {renderTextFor && (
          <p className="text-bold margin-top-0">{renderText(renderTextFor)}</p>
        )}

        <div className="display-flex" data-testid="ask-a-question">
          <Icon.Announcement className="text-primary margin-right-1" />

          <Button
            type="button"
            data-testid="ask-a-question-button"
            unstyled
            onClick={() => setIsDiscussionOpen(true)}
          >
            {t('askAQuestionLink')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AskAQuestion;
