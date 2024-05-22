import clsx from 'clsx';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import downArrowIcon from '@/images/icons/chevron-down.svg';
import minusIcon from '@/images/icons/icon-minus.svg';
import plusIcon from '@/images/icons/icon-plus.svg';

import styles from './Accordion.module.scss';

export enum AccordianVariant {
  Default = 'default',
  FAQ = 'FAQ',
}

export interface AccordionProps {
  /**
   * Content to be displayed when the accordion is open
   */
  children?: any;
  /**
   * ID of the accordion and aria controlledBy & labelledBy
   */
  id?: string;
  /**
   * Title of the accordion tab
   */
  title?: string;
  /**
   * Controls whether the accordion is open or not
   */
  open?: boolean;
  /**
   * Icon to be displayed in the accordion header for default Accordian
   */
  icon?: string;
  /**
   * @param onClick On click event handler
   */
  onClick?: () => void;
  /**
   * @param Display variant of the Accordian eg. Default / FAQ
   */
  variant?: AccordianVariant | `${AccordianVariant}`;
}

export interface AccordionRef {
  toggle: () => void;
}

/**
 * A collapsible accordion component
 * @see {@link AccordionProps} for available props
 */
const Accordion = forwardRef<AccordionRef, AccordionProps>(
  ({ children, title, open, icon, id = 'accordion', variant = AccordianVariant.Default, onClick }, ref) => {
    const [localOpen, setLocalOpen] = useState(false);
    // The hidden state manages hidding the body from the dom while considering animation length
    const [hidden, setHidden] = useState(true);
    const isFAQ = (variant === AccordianVariant.FAQ);

    // Manages the open state depending on if the accordion is controlled / uncontrolled
    useEffect(() => {
      if (open !== undefined) setLocalOpen(open);
    }, [open]);

    // Ensures the body is visible when initiating animations
    useEffect(() => {
      if (localOpen) setHidden(false);
    }, [localOpen]);

    // Exposes a toggle function to imperitively toggle the accordion ref
    useImperativeHandle(ref, () => ({
      toggle,
    }));

    const toggle = () => {
      onClick?.();
      setLocalOpen(!localOpen);
    };

    const handleTransitionEnd = () => {
      setHidden(!localOpen);
    };

    return (
      <div
        className={clsx(
          styles.accordion,
          isFAQ && styles.accordionFaq,
          localOpen ? styles.accordion__open : styles.accordion__closed,
          (isFAQ && localOpen) && styles.accordion__openFaq,
          icon && styles.accordion__withIcon,
        )}
        onTransitionEnd={handleTransitionEnd}
        data-testid={'Accordion'}
      >
        <h4 className={clsx(styles.accordionHeader)}>
          <button
            onClick={toggle}
            id={`${id}-header`}
            type="button"
            aria-expanded={localOpen}
            className={isFAQ ? styles.accordionHeaderFaqButton : styles.accordianHeaderButton}
            aria-controls={`${id}-panel`}
          >
            {!isFAQ && icon && (
              <img
                src={icon}
                className={styles.accordionHeaderIcon}
                aria-hidden="true"
              />
            )}
            {title}
            <img
              className={isFAQ ? styles.accordionHeaderSymbol : styles.accordionHeaderArrow}
              src={isFAQ ? (hidden ? plusIcon : minusIcon) : downArrowIcon}
              aria-hidden="true"
            />
          </button>
        </h4>
        <section
          className={clsx(styles.accordionPanel, isFAQ && styles.accordionPanelFaq)}
          id={`${id}-panel`}
          aria-labelledby={`${id}-header`}
          tabIndex={localOpen ? 0 : -1}
        >
          {!hidden && children}
        </section>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export default Accordion;
