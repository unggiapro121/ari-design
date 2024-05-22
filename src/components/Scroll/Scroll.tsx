import React, { forwardRef } from 'react';

import styles from './Scroll.module.scss';
  
export interface ScrollProps {
  children?: JSX.Element | JSX.Element[]
  style?: React.CSSProperties
  className?: string
  /**
   * Triggers when a user scrolls to the bottom
   */
  onScroll?: (isAtBottom: boolean) => void
}

/**
 * An Ampol styled scrollbox
 */
const Scroll = forwardRef<HTMLDivElement, ScrollProps>(({ children, className, style, onScroll }: ScrollProps, ref) => {
  const onScrollHandler = (e : React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const scrollDifference = Math.abs(scrollHeight - scrollTop - clientHeight);
    const atBottom = scrollDifference <= 3.0;

    onScroll?.(atBottom);
  };

  return <div className={styles.wrapper} data-testid="Scroll">
    <div className={ `${ styles.scrollalble } ${ className }` } style={ style } onScroll={onScrollHandler} ref={ref}>
      { children }
    </div>
  </div>;
});

Scroll.displayName = Scroll.name;

export default Scroll;