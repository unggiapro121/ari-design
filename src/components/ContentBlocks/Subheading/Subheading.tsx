import clsx from 'clsx';
import React from 'react';

import styles from './Subheading.module.scss';

export interface SubheadingProps {
  /**
   * Headline text
   */
  text: string;
  /**
   * Optional description paragraph
   */
  description?: string,
  /**
   * Semantic level of the heading tag
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * Display with theme accent colour
   */
  showAccent?: boolean;
}

/**
 * Content module for simple subheadings. Default renders `<h2>` tag, or use props to override with semantic level.
 * @param text headline text
 * @param description (optional) description paragraph
 * @param level (optional) semantic heading level
 * @param showAccent (optional) display with accent colour
 */
const Subheading = ({ description, level = '2', showAccent, text }: SubheadingProps) => {
  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <section className={clsx(styles.block, showAccent && styles.block__accent)}>
      <div className={styles.subheading} data-testid="Subheading">
        <HeadingTag className={styles.subheadingHeadline}>{text}</HeadingTag>
        {description && <p className={styles.subheadingDescription}>{description}</p>}
      </div>
    </section>
  );
};

export default React.memo(Subheading);
