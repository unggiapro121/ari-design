import React from 'react';

import cn from '../../util/cn';

export interface NavActionProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Renders a navigation action button. Intended to be used with the NavActions component.
 * Can also be re-used in MobileMenu.Actions component.
 * @component
 */
const NavAction = (props: NavActionProps) => {
  return (
    <li>
      <button
        className={cn('hover:ads-border-b-[3px] hover:ads-mb-[-3px] ads-border-ampol-red', props.className)}
        onClick={props?.onClick}
      >
        {props.title.toUpperCase()}
      </button>
    </li>
  );
};

NavAction.displayName = 'NavAction';

export default NavAction;
