import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Toast.module.scss';

export enum ToastVariant {
  NEUTRAL = 'neutral',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum ToastAlignment {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

type VerticalAlignment = Extract<
  ToastAlignment,
  ToastAlignment.BOTTOM | ToastAlignment.TOP
>;
type HorizontalAlignment = Extract<
  ToastAlignment,
  ToastAlignment.CENTER | ToastAlignment.LEFT | ToastAlignment.RIGHT
>;

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The Toast Variant
   * @default 'neutral'
   */
  variant?: ToastVariant | `${ToastVariant}`;
  /**
   * Open/Closed state
   */
  open?: boolean;
  /**
   * The child node
   */
  children?: React.ReactNode;
  /**
   * Spawns the component outside of the React Tree
   * @link https://react.dev/reference/react-dom/createPortal
   */
  portal?: boolean;
  /**
   * Alignment of the Component on the X Axis
   * @default 'left'
   */
  x?: HorizontalAlignment | `${HorizontalAlignment}`;
  /**
   * Alignment of the Component on the Y Axis
   * @default 'top'
   */
  y?: VerticalAlignment | `${VerticalAlignment}`;
}

const toast = cva([styles.toast], {
  variants: {
    variant: {
      neutral: styles['toastVariant__neutral'],
      success: styles['toastVariant__success'],
      error: styles['toastVariant__error'],
    },
    x: {
      left: styles['toastAlign__left'],
      right: styles['toastAlign__right'],
      center: styles['toastAlign__center'],
    },
    y: {
      top: styles['toastAlign__top'],
      bottom: styles['toastAlign__bottom'],
    },
  },
});

const Component = ({
  x = 'left',
  y = 'bottom',
  variant = 'neutral',
  className,
  portal,
  children,
  ...props
}: ToastProps) => {
  return (
    <div
      role="alertdialog"
      className={toast({
        variant,
        x,
        y,
        className: clsx(
          {
            [styles['toastPosition__absolute']]: !portal,
            [styles['toastPosition__fixed']]: portal,
          },
          className,
        ),
      })}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Component primarily used to give feedback after an action has taken place.
 */
const Toast = ({ open, portal = true, ...props }: ToastProps) => {
  return open ? (
    portal ? (
      createPortal(<Component {...props} portal={portal} />, document.body)
    ) : (
      <Component {...props} />
    )
  ) : null;
};

export default Toast;
