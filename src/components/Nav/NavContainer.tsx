import React from 'react';

import cn from '../../util/cn';

export interface NavContainerProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Container component for the navigation bar. Centers the navigation items with a max width of 1240px.
 * @component
 */
const NavContainer = (props: NavContainerProps) => {
  return (
    <div
      className={cn(
        'ads-flex ads-flex-row ads-items-center ads-w-full ads-max-w-[1240px] ads-h-full',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

NavContainer.displayName = 'NavContainer';

export default NavContainer;
