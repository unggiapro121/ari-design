import clsx from 'clsx';
import React from 'react';

import styles from './Alert.module.scss';

export interface AlertProps {
  /**
   * Required rich text alert message
   */
  message: React.ReactNode;
  /**
   * Required type of alert
   */
  type: 'info' | 'error';
  /**
   * Optional let user dismiss alert
   */
  dismissible?: boolean;
  /**
   * Optional event triggered when close button is clicked.
   */
  onClose?: () => void;
}

/**
 * An inline alert to present info or warnings
 * @see {@Link AlertProps} for available props
 */
const Alert = ({ message, type, dismissible, onClose }: AlertProps) => {
  return <>
    <div
      aria-atomic={true}
      aria-live={'polite'}
      className={clsx(
        styles.alert,
        styles[`alert__${type}`],
      )} data-testid={'Alert'}>
      {message}
      {dismissible &&
        <button type={'button'} className={styles.alertDismiss} aria-label={'dismiss alert'} onClick={onClose} />
      }
    </div>
  </>;
};

export default Alert;
