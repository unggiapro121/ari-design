import clsx from 'clsx';
import React from 'react';

import Button from '../../Button/Button';
import { ContentstackLink, ImgData } from '../contentstack.model';

import styles from './CallToAction.module.scss';

export interface CallToActionProps {
  /**
   * Heading text
   */
  headline: string;
  /**
   * Optional description paragraph
   */
  description?: string;
  /**
   * The CTA link details as `{ title, href }`
   */
  link: ContentstackLink;
  /**
   * Colour scheme: controls background colour for CTA without images
   */
  theme?: 'red' | 'blue' | 'cobalt';
  /**
   * Toggle the appearance to inverse text
   */
  inverseTheme?: boolean;
  /**
   * Image for stacked content (small screen) as `{ url, description }`
   */
  smallImage?: ImgData;
  /**
   * Background image for large breakpoints as `{ url, description }`
   */
  wideImage?: ImgData;
  /**
   * Default (1 column) or 2col layout for desktop only`
   */
  layout?: 'default' | '2col';
  /**
   * Position of button in relation to text content
   */
  ctaOrder?: 'before' | 'after';
}

/**
 * Describe Your Component
 * @param headline heading text
 * @param description (optional) paragraph text
 * @param link cta link
 * @param theme (optional) sets colour scheme
 * @param inverseTheme inverse appearance
 * @param smallImage (optional) image for small breakpoints
 * @param layout (optional) default (1 column) or 2col layout for desktop only
 * @param ctaOrder (optional) Button position 'after' (default) or 'before' text content
 * @param wideImage (optional) background image for large breakpoints
 */
const CallToAction = ({
  description,
  headline,
  inverseTheme = false,
  link,
  smallImage,
  theme = 'blue',
  wideImage,
  layout = 'default',
  ctaOrder = 'after',
}: CallToActionProps) => {
  const blockClasses = clsx(
    styles.block,
    inverseTheme && [styles.block__white, styles[`block__bg${theme[0].toLocaleUpperCase()}${theme.slice(1)}`]],
    wideImage && styles.block__bgImage,
  );
  const blockStyle = (wideImage && ({ '--bg-img-url': `url(${wideImage.url})` } as React.CSSProperties)) ?? undefined;
  const btnColour = inverseTheme ? 'white' : theme;
  const btnVariant = inverseTheme ? 'secondary' : 'primary';

  return (
    <section className={blockClasses} style={blockStyle} data-testid="CallToAction">
      <div className={clsx(styles.cta, styles[`cta${layout}`], styles[`cta__${ctaOrder}`])}>
        <div className={styles.ctaContent}>
          {smallImage && (
            <img
              className={styles.ctaImage}
              src={smallImage.url}
              alt={smallImage.description}
              width="360"
              height="360"
              loading="lazy"
            />
          )}
          <h2 className={styles.ctaHeading}>{headline}</h2>
          {description && <p className={styles.ctaDescription}>{description}</p>}
        </div>
        <div className={styles.ctaButton}>
          <Button label={link.title} type="link" variant={btnVariant} href={link.href} color={btnColour} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(CallToAction);
