import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import iconAlert from '@/images/icons/icon-alert-white.svg';
import iconClose from '@/images/icons/icon-close-white.svg';

import { isClient } from '../../util/env';
import Icon from '../Icon/Icon';

import styles from './AlertBar.module.scss';

export interface AlertBarProps {
  /**
   * Required rich text alert message
   */
  message: React.ReactNode;
  /**
   * Required unique ID to store client side dismissed state
   */
  id: string;
  /**
   * Alert message background colour
   */
  colour?: 'red' | 'blue';
  /**
   * Override for initial visibilily
   */
  defaultHidden?: boolean;
  /**
   * Flag to allow alerts to be inactive (not rendered)
   */
  isActive?: boolean;
}

const cookieName = 'alert-dismissed';

/**
 * Dismissable site alert bar for user-related messages that prominantly appear above everything else on the page
 * @param message rich text alert message
 * @param id unique alert ID
 * @param colour (optional) `red` or `blue`, default: `red`
 * @param defaultHidden (optional) override for initial visibility, default: `true`
 * @param isActive prevent alert rendering when inactive
 */
const AlertBar = ({ message, id, colour = 'red', defaultHidden = true, isActive = true }: AlertBarProps) => {
  if (!isActive) return null;

  // SSG/SSR compat: must always start as same state or will cause hydration error
  const [isHidden, setIsHidden] = useState(defaultHidden);

  const handleClose = () => {
    setIsHidden(true);

    const oneDay = 24 * 60 * 60 * 1000;
    const expireTime = new Date(Date.now() + oneDay).toUTCString();

    document.cookie = `${cookieName}=${id}; expires=${expireTime}; path=/`;
  };

  useEffect(() => {
    if (isClient) {
      const hasCookie = document.cookie.includes(`${cookieName}=${id}`);

      setIsHidden(hasCookie);
    }
  }, []);

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={clsx(
        styles.alertbar,
        styles[`alertbar__${colour}`],
        isHidden && styles.alertbar__hidden,
      )}
      data-testid="AlertBar"
    >
      <div className={styles.alertbarInner}>
        <Icon className={styles.alertbarIcon} size={24} url={iconAlert} />
        <div className={styles.alertbarMessage}>{message}</div>
        <button
          onClick={handleClose}
          aria-label="close alert notification"
          className={styles.alertbarBtnClose}
          type="button"
        >
          <Icon size={24} url={iconClose} />
        </button>
      </div>
    </div>
  );
};

export default AlertBar;
