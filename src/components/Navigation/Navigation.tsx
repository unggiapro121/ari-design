import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Sticky from 'react-sticky-el';

import hamburger from '../../images/hamburger.png';
import close from '../../images/icons-close@3x.png';
import ToggleIcon from '../ToggleIcon/ToggleIcon';

import styles from './Navigation.module.scss';
export interface NavigationButtonData {
  label: string;
  onClick?: React.MouseEventHandler;
}

export interface NavigationState {
  image?: string;
  style?: React.CSSProperties;
  links?: JSX.Element | JSX.Element[];
  actions?: JSX.Element | JSX.Element[];
}

export interface NavigationProps {
  defaultState: NavigationState;
  hideBurgerMenu?: boolean;
  stickyState?: NavigationState;
  mobileState?: NavigationState;
  sticky?: boolean;
  dark?: boolean;
  onClickLogo?: React.MouseEventHandler;
}

/**
 * An all purpose navigation header
 * @deprecated Use the new `Nav` component instead
 * @param defaultState default state settings (when not stuck)
 * @param hideBurgerMenu hide the burger menu
 * @param stickyState state settings when stuck
 * @param mobileState state settings when mobile menu open (only for links and actions)
 * @param onClickLogo on click event when clicking on logo
 * @param sticky should bar stick to the top on scroll?
 * @param dark adjust the header for dark mode by colouring images and text white
 * @returns JSX Element
 */
const Navigation = forwardRef(({
  defaultState,
  hideBurgerMenu = false,
  stickyState = defaultState,
  mobileState = defaultState,
  onClickLogo,
  sticky = false,
  dark = false,
}: NavigationProps, ref) => {
  const styling = `navigation${dark ? 'Dark' : ''}`;
  const [state, setState] = useState(defaultState);
  const [stuck, setSuck] = useState(false);
  const [menu, setMenu] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleMobileMenu() {
      toggleMobileMenu(!menu);
    },
  }));

  // will force state into sticky
  const toggleMobileMenu = (toggle: boolean) => {
    setMenu(toggle);
    if (toggle) {
      setState(stickyState);
    } else {
      stuck ? setState(stickyState) : setState(defaultState);
    }
  };

  const onFixedToggle = (isStuck: any) => {
    setSuck(isStuck);
    if (menu) return;

    if (isStuck) {
      setState(stickyState);
    } else {
      setState(defaultState);
    }
  };

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : 'auto';
  }, [menu]);

  return (
    <Sticky
      disabled={!sticky}
      stickyClassName={styles.sticky}
      onFixedToggle={onFixedToggle}
      data-testid="Navigation"
    >
      <div
        className={styles.container}
        style={menu ? { height: '100vh', position: 'fixed' } : {}}
      >
        <nav className={styles[styling]} style={state.style}>
          <div className={styles.navigationContainer}>
            <div className={styles.navigationLeft}>
              <div className={styles.navigationLogo}>
                <img
                  src={state.image}
                  onClick={onClickLogo}
                  style={{ cursor: onClickLogo ? 'pointer' : 'initial' }}
                  alt="logo-image"
                />
              </div>
              {state.links && <ul className={styles.navigationLinks}>{state.links}</ul>}
            </div>
            {state.actions && <ul className={styles.navigationRight}>{state.actions}</ul>}
            {!hideBurgerMenu && (
              <div className={styles.navigationMobile}>
                <ToggleIcon
                  size={50}
                  enabledImage={close}
                  disabledImage={hamburger}
                  onToggle={toggleMobileMenu}
                  enabledText={'burger-menu-open'}
                  disabledText={'burger-menu-closed'}
                  isToggled={menu}
                />
              </div>
            )}
          </div>
        </nav>
        <nav
          className={styles.mobile}
          style={{ display: menu ? 'flex' : 'none' }}
        >
          {mobileState.links && <ul className={styles.mobileLinks}>{mobileState.links}</ul>}
          {mobileState.actions && <ul className={styles.mobileActions}>{mobileState.actions}</ul>}
        </nav>
      </div>
    </Sticky>
  );
});

Navigation.displayName = Navigation.name;

export default Navigation;
