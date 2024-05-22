import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { FocusScope, useDialog, useModal, usePreventScroll } from 'react-aria';

import Button, { ButtonVariant } from '../Button/Button';

import styles from './Modal.module.scss';
import { ModalProps } from './ModalProvider';

const Modal = ({
  content,
  hideCloseButton = false,
  variant = 'single',
  topActions,
  actions,
  title,
  color,
  subtitle,
  forceFullscreen = false,
  closeOnClickOutside = false,
  formId,
  style,
  onClose,
  alert,
  alertVisible,
  icon,
}: ModalProps) => {
  const onCloseHandler = () => {
    onClose?.();
  };

  const ref = useRef<HTMLDivElement>(null);

  usePreventScroll();
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog({}, ref);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!closeOnClickOutside) return;

      if (ref.current && !ref.current.contains(event.target)) {
        onCloseHandler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  // Can only have a maximum of 3 buttons in the actions panel
  const takeMaxActions = actions?.slice(0, 3);
  const buttonCount = takeMaxActions?.length || 0;

  const forwardButtons = takeMaxActions?.map((action, index) => (
    <Button
      key={index}
      label={action.label}
      color={action.color ?? color}
      formId={formId}
      onClick={action.onClick}
      inactive={action.inactive}
      type={action.type}
      style={
        action.variant === ButtonVariant.Tertiary || index === 2 ?
          { textTransform: 'unset' } :
          undefined
      }
      variant={
        action.variant ?
          action.variant :
          index === 2 ?
            ButtonVariant.Tertiary :
            index === 1 ?
              ButtonVariant.Secondary :
              ButtonVariant.Primary
      }
    />
  ));

  const backwardButtons = takeMaxActions
    ?.reverse()
    .map((action, index) => (
      <Button
        key={index}
        label={action.label}
        color={action.color ?? color}
        inactive={action.inactive}
        type={action.type}
        formId={formId}
        onClick={action.onClick}
        style={
          action.variant === ButtonVariant.Tertiary ||
          (buttonCount === 3 && index === 0) ?
            { textTransform: 'unset' } :
            undefined
        }
        variant={
          action.variant ?
            action.variant :
            index + 1 === buttonCount ?
              ButtonVariant.Primary :
              index + 1 === buttonCount - 1 ?
                ButtonVariant.Secondary :
                ButtonVariant.Tertiary
        }
      />
    ));

  const classNames = clsx(styles.modal, styles[`modal__${variant}`], {
    [styles['modal__forceFullScreen']]:
      variant !== 'fullscreen' && forceFullscreen,
  });

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        ref={ref}
        className={classNames}
        style={style}
        {...dialogProps}
        {...modalProps}
        data-testid="Modal"
      >
        {alert && (
          <div className={styles.modalAlert}>
            <div
              className={clsx(
                styles.modalAlertContent,
                alertVisible && styles.modalAlertContent__active,
              )}
            >
              {alert}
            </div>
          </div>
        )}
        <div className={styles.modalTop}>
          <div className={styles.modalTopSection}>
            <div>
              {subtitle && (
                <p className={styles.modalTopSubtitle}>{subtitle}</p>
              )}
              <div className={styles.modalTopContainer}>
                <h3 className={styles.modalTopTitle} {...titleProps}>
                  {title}
                </h3>
                {topActions && (
                  <div className={styles.modalTopActions}>
                    {topActions?.map((action, index) => (
                      <Button
                        key={index}
                        inactive={action.inactive}
                        color={action.color ?? color}
                        type={action.type}
                        variant={ButtonVariant.Secondary}
                        label={action.label}
                        onClick={action.onClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {icon && <div className={styles.modalIconBlock}>{icon}</div>}
          </div>
        </div>
        {!hideCloseButton && (
          <button
            className={styles.modalClose}
            onClick={onCloseHandler}
            aria-label="close dialogue"
          />
        )}
        <div className={styles.modalContent}>{content}</div>
        <div className={styles.modalActions}>
          {variant === 'triple' || variant === 'double' ?
            backwardButtons :
            forwardButtons}
        </div>
        <div className={styles.modalActionsMobile}>{forwardButtons}</div>
      </div>
    </FocusScope>
  );
};

export default Modal;
