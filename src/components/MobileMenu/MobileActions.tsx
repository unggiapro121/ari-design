import React from 'react';

import cn from '../../util/cn';

export interface MobileActionsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a list of mobile actions.
 * @component
 */
const MobileActions = (props: MobileActionsProps) => {
  return (
    <ul
      className={cn(
        'tablet:ads-flex ads-flex-col ads-justify-start ads-space-y-l ads-box-border ads-border-background-light ads-border-t-2 ads-flex-1 ads-p-l',
        props.className,
      )}
    >
      {props.children}
    </ul>
  );
};

MobileActions.displayName = 'MobileActions';

export default MobileActions;
