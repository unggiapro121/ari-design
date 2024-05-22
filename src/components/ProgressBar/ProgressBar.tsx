import clsx from 'clsx';
import React from 'react';

import styles from './ProgressBar.module.scss';

export interface ProgressBarProps {
  steps: string[];
  activeIndex: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Progress indicator for multi step forms
 * @param {string[]} steps Array of steps
 * @param {number} activeIndex Index of Active step
 * @param {string} className Customise root element using class name (eg width, margins)
 * @param {React.CSSProperties} style Customise root element using styles (eg width, margins)
 */
const ProgressBar = ({
  steps,
  activeIndex,
  className,
  style,
}: ProgressBarProps) => {
  // guard against indexes out of range
  activeIndex =
    activeIndex < 0 ?
      0 :
      activeIndex < steps.length ?
        activeIndex :
        steps.length - 1;

  return (
    <div
      className={clsx(styles.progressbar, className)}
      style={style}
      data-testid='ProgressBar'
    >
      <div
        className={styles.progressbarFiller}
        style={{
          width: `${Math.abs((activeIndex + 1) / steps.length) * 100}%`,
        }}
      ></div>
      <ol className={styles.progressbarSteps}>
        {steps.map((step, index) => {
          return (
            <li
              key={index}
              className={clsx(
                styles.progressbarStep,
                index === activeIndex && styles.progressbarStep__active,
              )}
            >
              <div className={styles.progressbarStepContain}>
                {index <= activeIndex && (
                  <span className={styles.visuallyHidden}>
                    {index === activeIndex ? 'Current' : 'Completed'}:{' '}
                  </span>
                )}
                {step}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressBar;
