import React, { useEffect } from 'react';

import useDetectKeyboardOpen from '../../hooks/useDetectKeyboardOpen';

import styles from './StickyBottomBar.module.scss';
export interface StickyBottomBarProps {
  children?: any;
  /**
   * Classes applied to when stuck & not stuck
   */
  className?: string;
  /**
   * Classes applied when element is not stuck
   */
  baseClassName?: string;
  /**
   * Classes applied when element is stuck
   */
  stuckClassName?: string;
  /**
   * Disables the check for virtual keyboard visibility on ios and android devices
   */
  disableVirtualKeyboardCheck?: boolean;
}

/**
 * Sticks child components to bottom of screen until content is scrolled to
 */
const StickyBottomBar = ({
  children,
  baseClassName = '',
  stuckClassName = '',
  className = '',
  disableVirtualKeyboardCheck,
}: StickyBottomBarProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = React.useState(false);
  let isKeyboardOpen = useDetectKeyboardOpen();

  // ignore keyboard check if disabled
  isKeyboardOpen = disableVirtualKeyboardCheck ? false : isKeyboardOpen;

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current) return;

      // get bottom scroll position
      const bottom = window.scrollY + window.innerHeight;
      // get global position (at the bottom) of element
      const initialPos =
        ref.current.getBoundingClientRect().bottom + window.scrollY;

      setIsStuck(bottom < initialPos);
    };

    // run check on initial render
    handleScroll(ref);

    // account for both scroll and window resizing events
    window.addEventListener('scroll', () => handleScroll(ref));
    window.addEventListener('resize', () => handleScroll(ref));

    return () => {
      window.removeEventListener('scroll', () => handleScroll(ref));
      window.removeEventListener('resize', () => handleScroll(ref));
    };
  }, [ref]);

  /**
   * By having two elements, one which remains in it's intial position and another
   * which reveals itself when the first element is scrolled out of view, we can
   * keep track of the position of the initial elements incase it's position changes
   * allowed for more accurate dynamic stick and unstick anchor points
   */
  const StickyElement = () => (
    <div
      className={`${styles.stuck} ${className} ${stuckClassName}`}
      style={{
        display: !isStuck || isKeyboardOpen ? 'none' : 'flex',
      }}
      tabIndex={-1}
    >
      {children}
    </div>
  );

  return (
    <>
      <StickyElement />
      <div
        className={`${className} ${baseClassName}`}
        data-testid="StickyBottomBar"
        style={{
          visibility: isStuck && !isKeyboardOpen ? 'hidden' : 'initial',
        }}
        ref={ref}
      >
        {children}
      </div>
    </>
  );
};

export default StickyBottomBar;
