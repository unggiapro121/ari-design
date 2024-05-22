import { observer } from 'mobx-react-lite';
import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { OverlayContainer, OverlayProvider } from 'react-aria';

import Alert from '../Alert/Alert';
import { ButtonColor, ButtonType, ButtonVariant } from '../Button/Button';

import Modal from './_Modal';
import { ModalContext, modalStore } from './_ModalStore';
import styles from './Modal.module.scss';

export interface ModalButtonProps {
  /**
   * Label of the button
   */
  label: string;
  /**
   * Action on click event
   */
  onClick?: React.MouseEventHandler;
  /**
   * Overrides the base color of the modal (otherwise defaults to modal's color) !! only set if nessisary
   */
  color?: ButtonColor;
  /**
   * Sets button to inactive
   */
  inactive?: boolean;
  /**
   * Sets button type
   */
  type?: ButtonType;
  /**
   * Overrides default button variant
   */
  variant?: ButtonVariant;
}

export interface ModalProps {
  /**
   * A unique string identifier for each modal,
   * if you have modals extremely similar to each other, you might want to set this
   */
  id?: string;
  /**
   * Color of all action buttons
   */
  color: ButtonColor;
  /**
   * Switched between different modal sizes:
   * - `single`: set width of 350px and max height of 350px
   * - `double`: set width of 650px and max height of 500px (fullscreen on mobile)
   * - `triple`: set width of 1200px and max height of 800px (fullscreen on mobile)
   * - `dynamic`: fits the modal to the width and height of its content
   */
  variant?: 'single' | 'double' | 'triple' | 'fullscreen' | 'dynamic';
  /**
   * Defines the content inside of the modal. Can either be JSX or a function which returns the close function
   */
  content?: ReactNode;
  /**
   * The subtitle above the top title
   */
  subtitle?: string;
  /**
   * The top title of the modal
   */
  title?: string;
  /**
   * Defines the labels of each action button. 1st button will always be primary, the rest; secondary
   */
  actions?: ModalButtonProps[];
  /**
   * Same as actions but for the top bar beside the title
   */
  topActions?: ModalButtonProps[];
  /**
   * Forces the modal to fullscreen on mobile even if variant is set to `single`
   */
  forceFullscreen?: boolean;
  /**
   * Whether to hide the X in the top right
   */
  hideCloseButton?: boolean;
  /**
   * Closes the modal when clicked outside
   */
  closeOnClickOutside?: boolean;
  /**
   * Called when the modal is closed (including closeOnClickOutside, closeButton, and any close() function)
   */
  onClose?: () => void;
  /**
   * Form id for every action button
   */
  formId?: string;
  /**
   * Function to evoke prior to closing the modal (eg open a confirmation modal)
   */
  preCloseFn?: () => void;
  /**
   * Override inbuilt close function to handle close of modal manually
   */
  manualClose?: boolean;
  /**
   * Optional alert to display; must use alertVisible prop in conjunction with alert prop
   */
  alert?: ReactElement<typeof Alert>;
  /**
   * Optional show/hide alert
   */
  alertVisible?: boolean;
  style?: React.CSSProperties;
  /**
 * Optional icon to display(located at top right before close icon); must use iconVisible prop in conjunction with icon prop
 */
  icon?: ReactElement;

}

const ModalProvider = observer(({ children }: { children: ReactNode }) => {
  const modalsRef = useRef<HTMLDivElement>(null);

  /**
   * Sets the --vh css variable to the current window height
   * This is used to fix the mobile keyboard/navbar overlapping the modal
   */
  useEffect(() => {
    handleResize();
    function handleResize() {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight}px`,
      );
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const modals = modalStore.renderStack.map(({ props: modal }, index) => (
    <Modal
      {...(modal as any)}
      content={modal?.content}
      key={index}
      style={{
        display: index === modalStore.renderStack.length - 1 ? 'flex' : 'none',
        visibility:
          index === modalStore.renderStack.length - 1 ? 'unset' : 'hidden',
      }}
      onClose={() => {
        modal?.preCloseFn?.();

        if (!modal?.manualClose) {
          modalStore.pop();
          modal?.onClose?.();
        }
      }}
    />
  ));

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
  });

  return (
    <ModalContext.Provider value={modalStore}>
      <OverlayProvider>
        <div>{children}</div>
        {modals.length !== 0 && (
          <OverlayContainer>
            <div className={styles.container} ref={modalsRef}>
              <div className={styles.modalBackdrop} tabIndex={-1} />
              {modals}
            </div>
          </OverlayContainer>
        )}
      </OverlayProvider>
    </ModalContext.Provider>
  );
});

export default ModalProvider;
