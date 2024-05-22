import React from 'react';

import cn from '../../util/cn';

import MobileActions from './MobileActions';
import MobileSubActions from './MobileSubActions';

export interface MobileMenuProps {
  children?: React.ReactNode;
  show: boolean;
  className?: string;
  offset?: string;
  height?: string;
}

/**
 * Renders a mobile menu component.
 * @param {Object} props - The component props.
 * @param {string} [props.offset='90px'] - The offset value for the menu. This is ideally the height of the mobile Nav component.
 * @param {string} [props.height='100%'] - The height value for the menu.
 * @param {boolean} props.show - Determines whether the menu is shown or hidden.
 */
const MobileMenuComponent = ({
  offset = '90px',
  height = '100%',
  ...props
}: MobileMenuProps) => {
  const heightAdjustment = `calc(${height} - ${offset})`;

  return (
    <div className="preflight">
      <div
        style={{ height: props.show ? heightAdjustment : 0 }}
        className={cn(
          `ads-fixed ads-top-[${offset}] ads-right-0 ads-bottom-0 ads-left-0 ads-w-full ads-flex-col ads-bg-white tablet:ads-hidden ads-z-[301] ads-transition-all ads-ease-in-out ads-overflow-clip ads-flex ${props.show ? 'ads-opacity-100' : 'ads-opacity-0'}`,
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

MobileMenuComponent.displayName = 'MobileMenu';

const MobileMenu = Object.assign(MobileMenuComponent, {
  Actions: MobileActions,
  SubActions: MobileSubActions,
});

export default MobileMenu;
