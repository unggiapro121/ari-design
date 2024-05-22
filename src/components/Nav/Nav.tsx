import React, { forwardRef, useRef } from 'react';

import { useElementHeight } from '../../hooks/useElementHeight';
import useSticky from '../../hooks/useSticky';
import cn from '../../util/cn';

import NavAction from './NavAction';
import NavActions from './NavActions';
import NavBurger from './NavBurger';
import NavContainer from './NavContainer';
import NavLogo from './NavLogo';
import NavOption from './NavOption';
import NavSelector from './NavSelector';

interface NavProps {
  className?: string;
  children: React.ReactNode | ((isSticky: boolean) => React.ReactNode);
}

/**
 * Renders a navigation component with sticky behavior.
 * @returns The rendered navigation component.
 */
const NavComponent = forwardRef<HTMLElement, NavProps>((props, ref) => {
  const navRef = ref || useRef<HTMLElement>(null);
  const isSticky = useSticky(navRef as React.RefObject<HTMLElement>);
  const navHeight = useElementHeight(navRef as React.RefObject<HTMLElement>);
  const renderChildren = () => {
    if (typeof props.children === 'function') {
      return props.children(isSticky);
    }

    return props.children;
  };

  return (
    <header className="preflight">
      {/* Placeholder div */}
      {isSticky && <div style={{ height: `${navHeight}px` }} />}
      <nav
        ref={navRef}
        className={cn(
          'ads-h-[90px] ads-w-full ads-bg-white ads-p-m tablet:ads-px-[45px] ads-flex ads-flex-row ads-items-center ads-justify-center ads-transition-all ',
          isSticky ?
            'ads-fixed ads-z-[300] ads-top-[0] tablet:ads-h-[100px] ads-shadow-2xl' :
            'ads-relative tablet:ads-h-[125px]',
          props.className,
        )}
      >
        {renderChildren()}
      </nav>
    </header>
  );
});

NavComponent.displayName = 'Nav';

// We use this sub-component syntax to remain typesafe
const Nav = Object.assign(NavComponent, {
  Container: NavContainer,
  Logo: NavLogo,
  Actions: NavActions,
  Action: NavAction,
  Burger: NavBurger,
  Selector: NavSelector,
  Option: NavOption,
});

export default Nav;
