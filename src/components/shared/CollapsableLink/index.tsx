import React, { useState } from 'react';
import { Button, Icon } from '@trussworks/react-uswds';

import './index.scss';

type CollapsableLinkProps = {
  id: string;
  className?: string;
  children: React.ReactNode | React.ReactNodeArray;
  label: string;
  closeLabel?: string;
  styleLeftBar?: boolean;
  eyeIcon?: boolean;
  iconPosition?: 'left' | 'right';
  startOpen?: boolean;
  showDescription?: (show: boolean) => void;
  labelPosition?: 'top' | 'bottom';
};

const CollapsableLink = ({
  id,
  className,
  children,
  label,
  closeLabel,
  styleLeftBar = true,
  eyeIcon,
  iconPosition,
  startOpen = false,
  showDescription,
  labelPosition = 'top'
}: CollapsableLinkProps) => {
  // TODO: should this state instead be held in the parent and passed in as prop?
  // Followup: if the state should remain here, how do we test the component when it's open?
  // That is, how do we initialize this component and set isOpen to true?
  const [isOpen, setOpen] = useState(startOpen);

  const renderEyeIcon = () => {
    return isOpen ? (
      <Icon.VisibilityOff className="mint-collapsable-link__eye-icon" />
    ) : (
      <Icon.Visibility className="mint-collapsable-link__eye-icon" />
    );
  };

  const renderCaret = () => {
    return isOpen ? (
      <Icon.ExpandLess className="top-05" />
    ) : (
      <Icon.ExpandMore className="top-05" />
    );
  };

  const expandIcon = eyeIcon ? renderEyeIcon() : renderCaret();
  const selectedLabel = isOpen ? closeLabel || label : label;

  const collapseButton: React.ReactNode = (
    <Button
      type="button"
      onClick={() => {
        setOpen(!isOpen);
        if (showDescription) showDescription(!isOpen);
      }}
      aria-expanded={isOpen}
      aria-controls={id}
      className={className}
      unstyled
      data-testid="collapsable-link"
    >
      {iconPosition === 'left' ? selectedLabel : expandIcon}
      {iconPosition === 'left' ? expandIcon : selectedLabel}
    </Button>
  );
  return (
    <div className="mint-collapsable-link">
      {labelPosition === 'top' && collapseButton}
      {isOpen && (
        <div
          id={id}
          className={
            styleLeftBar
              ? 'mint-collapsable-link__content'
              : 'mint-collapsable-link__content-no-bar'
          }
        >
          {children}
        </div>
      )}
      {labelPosition === 'bottom' && collapseButton}
    </div>
  );
};

export default CollapsableLink;
