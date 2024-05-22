import React from 'react';

import cn from '../../util/cn';

export interface BannerActionsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a list of actions for the banner component. Intended to have Nav.Action components as children.
 * @component
 */
const BannerActions = (props: BannerActionsProps) => {
  return (
    // Here we use selectors to apply margins between the dividers without adding actions to the action component itself
    // This allows it to be used in other places without margins (eg. mobile menu)
    <ul className={cn('ads-flex ads-divide-x ads-divide-[#949494] [&>*>*]:ads-mx-s last:-ads-mr-s', props.className)}>
      {props.children}
    </ul>
  );
};

BannerActions.displayName = 'BannerActions';

export default BannerActions;
