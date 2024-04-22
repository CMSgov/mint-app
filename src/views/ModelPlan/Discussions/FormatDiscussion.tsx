import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@trussworks/react-uswds';
import {
  GetModelPlanDiscussions_modelPlan_discussions as DiscussionType,
  GetModelPlanDiscussions_modelPlan_discussions_replies as ReplyType
} from 'gql/gen/types/GetModelPlanDiscussions';

import Divider from 'components/shared/Divider';
import SectionWrapper from 'components/shared/SectionWrapper';

import SingleDiscussion from './SingleDiscussion';

type FormatDiscussionProps = {
  discussionsContent: DiscussionType[];
  setDiscussionType: (a: 'question' | 'reply' | 'discussion') => void;
  setReply: (discussion: DiscussionType | ReplyType) => void;
  setIsDiscussionOpen?: (value: boolean) => void;
  setDiscussionStatusMessage: (value: string) => void;
};

const FormatDiscussion = ({
  discussionsContent,
  setDiscussionType,
  setReply,
  setIsDiscussionOpen,
  setDiscussionStatusMessage
}: FormatDiscussionProps) => {
  const { t: discussionsMiscT } = useTranslation('discussionsMisc');

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const discussionsContentList = isAccordionExpanded
    ? discussionsContent
    : discussionsContent.slice(0, 5);

  return (
    <>
      {discussionsContentList.map((discussion, index) => {
        return (
          <div key={discussion.id} className="margin-top-4">
            <SingleDiscussion
              discussion={discussion}
              index={index}
              connected={false}
              setDiscussionType={setDiscussionType}
              setReply={setReply}
              setIsDiscussionOpen={setIsDiscussionOpen}
              setDiscussionStatusMessage={setDiscussionStatusMessage}
              replies={discussion.replies}
            />
            {/* Divider to separate questions if not the last question */}
            {index !== discussionsContentList.length - 1 && <Divider />}
            {!isAccordionExpanded &&
              discussionsContent.length > 5 &&
              index === discussionsContentList.length - 1 && (
                <SectionWrapper className="display-flex flex-justify-center flex-align-center margin-top-4">
                  <Button
                    type="button"
                    className="usa-button usa-button--unstyled"
                    onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
                  >
                    {discussionsMiscT('viewMoreQuestions')}
                  </Button>
                </SectionWrapper>
              )}
          </div>
        );
      })}
    </>
  );
};

export default FormatDiscussion;
