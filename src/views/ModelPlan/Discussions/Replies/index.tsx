import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconExpandLess,
  IconExpandMore
} from '@trussworks/react-uswds';

const Replies = () => {
  const { t: discussionsT } = useTranslation('discussions');

  const [areRepliesShowing, setAreRepliesShowing] = useState(true);

  return (
    <div className="discussion-replies margin-bottom-4">
      <div className="discussion-replies__heading display-flex flex-justify">
        <p className="margin-y-0">
          {/*  https://github.com/i18next/i18next/issues/1220#issuecomment-654161038 */}
          {discussionsT('replies', { count: 0, context: '0' })}
        </p>
        {/* <p className="margin-y-0">{discussionsT('replies', { count: 1 })}</p>
      <p className="margin-y-0">{discussionsT('replies', { count: 2 })}</p> */}
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
              <IconExpandLess className="margin-left-1" />
            </div>
          ) : (
            <div className="display-flex flex-align-center">
              {discussionsT('showReplies')}
              <IconExpandMore className="margin-left-1" />
            </div>
          )}
        </Button>
      </div>
      <div className="discussion-replies__content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          consequatur quae perspiciatis laboriosam dolorum dolorem fuga. Quod
          incidunt atque recusandae ea. Corporis assumenda fuga distinctio?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          consequatur quae perspiciatis laboriosam dolorum dolorem fuga. Quod
          incidunt atque recusandae ea. Corporis assumenda fuga distinctio?
        </p>
      </div>
    </div>
  );
};

export default Replies;
