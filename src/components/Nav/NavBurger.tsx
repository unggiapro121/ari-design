import React from 'react';

import hamburger from '../../images/icons/icon-burger.svg';
import close from '../../images/icons/icon-close.svg';
import cn from '../../util/cn';
import ToggleIcon from '../ToggleIcon/ToggleIcon';

export interface NavBurgerProps {
  value: boolean; // Whether the mobile menu is shown or not
  onChange: (value: boolean) => void; // Function to call when the menu visibility changes
  className?: string;
  enabledImage?: string;
  disabledImage?: string;
}

/**
 * Renders a navigation burger component. Intened to be used with the MobileMenu component.
 * @component
 */
const NavBurger = ({
  value,
  onChange,
  className,
  enabledImage = close,
  disabledImage = hamburger,
}: NavBurgerProps) => {
  const toggleMobileMenu = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = !value ? 'hidden' : 'auto';
    // This prevents the page from shifting when the scrollbar is hidden
    document.body.style.marginRight = !value ? `${scrollbarWidth}px` : '';
    onChange(!value);
  };

  return (
    <div className={cn('tablet:ads-hidden', className)}>
      <ToggleIcon
        enabledImage={enabledImage}
        disabledImage={disabledImage}
        enabledText="Close Menu"
        disabledText="Open Menu"
        onToggle={toggleMobileMenu}
        isToggled={value}
        size={40}
      />
    </div>
  );
};

NavBurger.displayName = 'NavBurger';

export default NavBurger;
