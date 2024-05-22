import React from 'react';

import cn from '../../util/cn';

export interface NavActionsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a list of navigation actions. This component is hidden on mobile.
 * Inteded to hold Nav.Action components.
 * @component
 */
const NavActions = (props: NavActionsProps) => {
  return (
    <>
      <ul
        className={cn(
          'ads-hidden tablet:ads-flex ads-flex-row ads-space-x-l ads-justify-center ads-items-center',
          props.className,
        )}
      >
        {props.children}
      </ul>
    </>
  );
};

NavActions.displayName = 'NavActions';

export default NavActions;
