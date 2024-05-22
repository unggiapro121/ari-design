import React from 'react';

import cn from '../../util/cn';

export interface MobileSubActionsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a list of sub-actions for the mobile menu.
 * @component
 */
const MobileSubActions = (props: MobileSubActionsProps) => {
  return (
    <ul
      className={cn(
        'ads-bg-background-light ads-border-box ads-p-l ads-space-y-xs',
        props.className,
      )}
    >
      {props.children}
    </ul>
  );
};

MobileSubActions.displayName = 'MobileSubActions';

export default MobileSubActions;
