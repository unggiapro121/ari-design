import clsx from 'clsx';
import React from 'react';

import type Button from '../../Button/Button';
import type { ImgData } from '../contentstack.model';

import styles from './Richtext.module.scss';

export interface RichtextProps {
  /**
   * content as jsx
   */
  children: React.ReactNode;
  /**
   * optional text for a top colour-block header
   */
  heading?: string;
  /**
   * Colour scheme for the colour-block header
   */
  headingTheme?: 'red' | 'blue' | 'cobalt';
  /**
   * Images `square`, and `wide` or `tall` aspect depending on block layout as `{ url, description }`
   */
  images?: Partial<{
    square: ImgData;
    tall: ImgData;
    wide: ImgData;
  }>;
  /**
   * Place image `left` or `right` or `behind` or `above`
   */
  placeImage?: 'right' | 'left' | 'behind' | 'above';
  /**
   * Inset layout
   */
  isInset?: boolean;
  /**
   * Expects ADS `<Button>`
   */
  ctaLink?: React.ReactElement<typeof Button>;
}

/* Reference: *Content Stack*
  Inset: Add tall image when the content has Inset Width (not full-width)
  Background: Add wide image to a full-width layout (not Inset Width)
  placeImage > left/right : Tall (Inset) Square (else), above/behind: Wide (w/o Inset)
*/
const Image = (imageData: {url?: string, description?: string}) => {
  return (
    <div className={styles.image}>
      {imageData &&
        <img src={imageData?.url} alt={imageData?.description} width="500" height="500" />
      }
    </div>
  );
};

/**
 * The Richtext component is used to render CMS Long Content blocks
 * @param children content JSX
 * @param heading emphasis colour heading, not for use with images
 * @param headingTheme emphasis heading colour scheme
 * @param images triggers layout with images
 * @param placeImage `right` or `left` or `behind` or `above`
 * @param isInset (optional) inset layout,
 * @param ctaLink (optional) cta, expects ADS `<Button>`
 */
const Richtext = ({
  children,
  heading,
  headingTheme = 'blue',
  images,
  isInset = true,
  placeImage = 'right',
  ctaLink,
}: RichtextProps) => {
  const placeImageBehind = placeImage === 'behind';
  const placeImageAbove = placeImage === 'above';
  const imageWide = placeImageAbove || placeImageBehind;
  const blockClasses = clsx(
    styles.block,
    placeImageBehind && images?.wide && styles.block__bgImage,
    placeImageAbove && images?.wide && styles.block__topImage,
    isInset ? 
      (imageWide ? 
        styles.block__bgImageInset : styles.block__inset) :
      styles.block__full,
    images && styles.block__image,
  );
  const imageStyle =
    (images?.wide && ({ '--bg-img-url': `url(${images?.wide.url})` } as React.CSSProperties)) ?? undefined;

  const imageData = imageWide ? images?.wide : isInset ? images?.tall : images?.square;

  return (
    <section className={blockClasses} style={imageStyle} data-testid="Richtext">
      <div className={clsx(styles.container, images && styles[`container__${placeImage}Image`])}>
        {images && imageWide && <Image {...imageData}  />}
        {heading && !images &&
          <div className={clsx(styles.container, styles.heading, styles[`heading__${headingTheme}`])}>
            <h2 className={styles.headingTitle}>{heading}</h2>
          </div>
        }
        {images && placeImage === 'left' && <Image {...imageData} />}
        <div className={styles.richtext}>
          {children}
          {ctaLink && <div className={styles.ctaLink}>{ctaLink}</div>}
        </div>
        {images && placeImage === 'right' && <Image {...imageData} />}
      </div>
    </section>
  );
};

export default React.memo(Richtext);
