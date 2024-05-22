import clsx from 'clsx';
import React from 'react';

import Accordion, { AccordianVariant } from '../../Accordian/Accordion';
import Button from '../../Button/Button';
import { ContentstackLink } from '../contentstack.model';

import styles from './AccordionBlock.module.scss';

export interface AccordionBlockProps {
  /**
   * Array of accordion items
   */
  items: {
    /**
     * Required accordion heading
     */
    heading: string;
    /**
      * Required accordion content as JSX for richtext
      */
    description: React.ReactNode;
  }[];
  /**
   * Inset to match content area
   * @default false
   */
  inset?: boolean;
  /**
   * @param Display variant of the Accordian eg. Default / FAQ
   */
  variant?: AccordianVariant | `${AccordianVariant}`;
  /**
   * The CTA link details as `{ title, href }`
   */
  link?: ContentstackLink;
}

/**
 * Describe Your Component
 * @param items Array of accordion items
 * @param inset inset to match content
 */
const AccordionBlock = ({ items, inset, variant = AccordianVariant.Default, link }: AccordionBlockProps) => {
  return (
    <div 
      className={clsx(styles.accordion, inset && styles.accordion__inset, variant === AccordianVariant.FAQ && styles.accordion__faq)} 
      data-testid={variant === AccordianVariant.FAQ ? 'AccordionFAQBlock' : 'AccordionContentBlock'}>
      <div className={styles.content}>
        <div className={styles.list}>
          {items.map((item, index) => <Accordion key={index} title={item.heading} variant={variant}>{item.description}</Accordion>)}
        </div>
        {variant === AccordianVariant.FAQ && link?.href &&
          <Button label={link.title} type='link' variant='tertiary' href={link.href} color='blue' />
        }
      </div>
    </div>
  );
};

export default React.memo(AccordionBlock);
