import clsx from 'clsx';
import React from 'react';

import styles from './Loading.module.scss';

export enum LoadingType {
  Primary = 'primary',
  Indeterminate = 'indeterminate',
  Intermittent = 'intermittent',
}

export interface LoadingProps {
  /**
   * Type of loading bar animation
   * Primary: A cubic slow 1 time loading bar (default)
   * Indeterminate: A infinite sliding loading bar
   * Intermittent: A fake loading bar that simulates random loading times
   */
  type?: `${LoadingType}`;
  /**
   * Percentage of the loading bar (overrides type)
   */
  percentage?: number;
}

/**
 * Loading bar animation
 * @param loop Repeat the animation indefinitely
 */
const Loading = ({ type = 'intermittent', percentage }: LoadingProps) => {
  return (
    <div className={styles.loading} data-testid="Loading">
      <div
        className={clsx({
          [styles.loadingBar]: true,
          [styles[`loadingBar__${type}`]]: !percentage,
        })}
        style={{ width: `${percentage}%`}}
      ></div>
    </div>
  );
};

export default Loading;
