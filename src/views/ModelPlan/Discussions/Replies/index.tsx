import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@trussworks/react-uswds';
import { GetModelPlanDiscussions_modelPlan_discussions as DiscussionType } from 'gql/gen/types/GetModelPlanDiscussions';

import SectionWrapper from 'components/shared/SectionWrapper';
import TruncatedText from 'components/shared/TruncatedText';

import DiscussionUserInfo from '../_components/DiscussionUserInfo';

const Replies = ({
  originalDiscussion: { replies },
  discussionReplyID
}: {
  originalDiscussion: DiscussionType;
  discussionReplyID?: string | null | undefined;
}) => {
  const { t: discussionsT } = useTranslation('discussions');

  const [areRepliesShowing, setAreRepliesShowing] = useState<boolean>(true);

  // If opening from email, auto-expand all replies
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(
    !!discussionReplyID
  );

  const hasReplies = replies.length > 0;
  const repliesList = isAccordionExpanded ? replies : replies.slice(0, 4);

  return (
    <div className="discussion-replies margin-bottom-4">
      <div className="discussion-replies__heading display-flex flex-justify margin-bottom-1">
        <p className="margin-y-0 text-bold">
          {hasReplies ? (
            <>
              {discussionsT('replies', {
                count: replies.length
              })}
            </>
          ) : (
            <p className="margin-top-0">
              {/*  https://github.com/i18next/i18next/issues/1220#issuecomment-654161038 */}
              {discussionsT('replies', { count: 0, context: '0' })}
            </p>
          )}
        </p>
        {hasReplies && (
          <Button
            type="button"
            onClick={() => setAreRepliesShowing(!areRepliesShowing)}
            aria-expanded={areRepliesShowing}
            unstyled
            data-testid="collapsable-link"
          >
            {areRepliesShowing ? (
              <div className="display-flex flex-align-center">
                {discussionsT('hideReplies')}
                <Icon.ExpandLess className="margin-left-1" />
              </div>
            ) : (
              <div className="display-flex flex-align-center">
                {discussionsT('showReplies')}
                <Icon.ExpandMore className="margin-left-1" />
              </div>
            )}
          </Button>
        )}
      </div>
      {hasReplies && areRepliesShowing && (
        <div className="discussion_replies__wrapper">
          <div className="discussion-replies__content padding-top-2">
            {repliesList.map((reply, index) => {
              return (
                <Fragment key={reply.id}>
                  <DiscussionUserInfo
                    discussionTopic={reply}
                    index={index}
                    connected={index !== replies.length - 1 && hasReplies}
                  />
                  <div
                    className={`margin-top-0 margin-bottom-05 ${
                      index !== replies.length - 1 && hasReplies
                        ? 'mint-discussions__connected'
                        : 'mint-discussions__not-connected'
                    }`}
                  >
                    <TruncatedText
                      id={`reply-content-${reply.id}`}
                      text={reply.content?.rawContent ?? ''}
                      charLimit={500}
                      className="padding-bottom-3"
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
          {replies.length > 4 && (
            <SectionWrapper className="margin-top-1">
              <Button
                type="button"
                className="usa-button usa-button--unstyled"
                onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
              >
                {isAccordionExpanded
                  ? discussionsT('viewFewerReplies')
                  : discussionsT('viewMoreReplies')}
              </Button>
            </SectionWrapper>
          )}
        </div>
      )}
    </div>
  );
};

export default Replies;
