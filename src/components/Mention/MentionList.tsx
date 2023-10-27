import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';

import Spinner from 'components/Spinner';

import './MentionList.scss';

export const SuggestionLoading = () => {
  return (
    <div className="items width-card-lg padding-1">
      <Spinner size="small" />
    </div>
  );
};

const MentionList = forwardRef((props: any, ref) => {
  const { t } = useTranslation('discussions');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: any) => {
    const item = props.items[index];

    if (item) {
      props.command({
        id: item.username,
        label: item.displayName,
        email: item.email
      });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items?.length - 1) % props.items?.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items?.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: any }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    }
  }));

  return (
    <div className="items">
      {props.items?.length ? (
        props.items?.map((item: any, index: any) => (
          <button
            className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
            key={item.username}
            type="button"
            onClick={() => selectItem(index)}
          >
            {item.displayName}
          </button>
        ))
      ) : (
        <div className="item">{t('noResults')}</div>
      )}
    </div>
  );
});

export default MentionList;
