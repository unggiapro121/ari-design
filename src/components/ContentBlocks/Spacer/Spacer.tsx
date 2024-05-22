import React from 'react';

import styles from './Spacer.module.scss';

export interface SpacerProps {
  /**
   * Vertical size
   */
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Vertical spacing for content blocks
 * @param size
 */
const Spacer = ({ size = 'md' }: SpacerProps) => <div className={styles[`spacer__${size}`]} data-testid="Spacer" />;

export default React.memo(Spacer);
