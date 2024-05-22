import clsx from 'clsx';
import React from 'react';

import { breakpoints } from '../../../util/breakpoints';
import type Button from '../../Button/Button';
import type { ImgData } from '../contentstack.model';

import styles from './ImageFeature.module.scss';

export interface ImageFeatureProps {
  /**
   * Headline text
   */
  headline: string;
  /**
   * Multi-paragraph content
   */
  content?: React.ReactNode;
  /**
   * Image details for square and wide feature aspect ratios as `{ url, description }`
   */
  images: {
    square: ImgData;
    wide: ImgData;
  };
  /**
   * Place image `left` or `right` for alternating layout
   * @default right
   */
  placeImage?: 'right' | 'left';
  /**
   * Expects ADS `<Button>`
   */
  ctaLink?: React.ReactElement<typeof Button>;
  /**
   * Layout size
   */
  size?: 'default' | 'large';
  /**
   * Display with theme accent colour
   */
  showAccent?: boolean;
  /**
   * Inset layout
   */
  isInset?: boolean;
}

/**
 * Feature content block for displaying text and image, alternate left/right. Full-bleed layout.
 * @param headline headline text
 * @param content content paragraphs as jsx
 * @param images image data `square` and `wide`: {url, description}
 * @param placeImage (optional) position of the content/image columns on larger breakpoints
 * @param ctaLink (optional) cta, expects ADS `<Button>`
 * @param size (optional) layout size `default` or `large`
 * @param showAccent (optional) toggle heading accent colour
 * @param isInset (optional) inset layout
 */
const ImageFeature = ({
  content,
  ctaLink,
  headline,
  images,
  placeImage = 'right',
  showAccent,
  size = 'default',
  isInset = false,
}: ImageFeatureProps) => {
  const isLarge = size === 'large';
  const { square: imgSquare, wide: imgWide } = images;
  const Picture = () => {
    const Sources = () =>
      isLarge ? (
        <source srcSet={imgWide?.url} media={`(min-width: ${breakpoints.md})`} />
      ) : (
        <>
          <source srcSet={imgWide?.url} media={`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`} />
          <source srcSet={imgWide?.url} media={`(min-width: ${breakpoints.xl})`} />
        </>
      );

    return (
      <picture>
        <Sources />
        <img src={imgSquare?.url} alt={imgSquare?.description} width="500" height="500" loading="lazy" />
      </picture>
    );
  };

  return (
    <section
      className={clsx(
        styles.feature,
        isLarge ? styles.feature__large : styles[`feature__${placeImage}`],
        showAccent && styles.feature__accent,
        isInset && styles.feature__inset,
      )}
      data-testid="ImageFeature"
    >
      <div className={styles.containerImage}>
        <Picture />
      </div>
      <div className={styles.containerText}>
        <div className={styles.containerTextInner}>
          <div className={styles.containerHeading}>
            <h2 className={styles.heading}>{headline}</h2>
          </div>
          <div className={styles.description}>
            {content && content}
            {ctaLink && <div className={styles.ctaLink}>{ctaLink}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ImageFeature);
