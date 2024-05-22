import clsx from 'clsx';
import React from 'react';

import LogoAppStore from '../../Logos/LogoAppStore';
import LogoPlayStore from '../../Logos/LogoPlayStore';
import { ContentstackLink, ImgData } from '../contentstack.model';

import styles from './PromoMobileApp.module.scss';

export interface PromoMobileAppProps {
  /**
   * Heading text
   */
  headline: string;
  /**
   * Description richtext
   */
  description: React.ReactNode;
  /**
   * Icon to be displayed on top of heading as `{ url, description }`
   */
  appIcon: ImgData;
  /**
   * Link to the app in App Store as as `{ title, href }`
   * Link to the app in Play Store as as `{ title, href }`
   */
  links: {
    appStore: ContentstackLink;
    playStore: ContentstackLink;
  };
  /**
   * Image square for small screen, wide for large breakpoints as `{ url, description }`
   */
  images: {
    square: ImgData;
    wide: ImgData;
  };
  /**
   * Colour scheme: controls background colour for promotion
   */
  theme?: 'blue' | 'cobalt';
}

const MobileAppLinks = (props: { appStore: ContentstackLink; playStore: ContentstackLink }) => {
  const { appStore, playStore } = props;

  return (
    <div className={styles.downloads}>
      <a href={appStore.href} title={appStore.title} className={styles.downloadsLink}>
        <LogoAppStore className={styles.downloadsBadge} />
      </a>
      <a href={playStore.href} title={playStore.title} className={styles.downloadsLink}>
        <LogoPlayStore className={styles.downloadsBadge} />
      </a>
    </div>
  );
};

/**
 * Promotion for Mobile Apps download content block
 * @param headline heading text
 * @param description richtext
 * @param appIcon icon image
 * @param links links to mobile applications on store
 * @param images images for small and large breakpoints
 * @param theme (optional) sets colour scheme 'blue' (default) or 'cobalt'
 */
const PromoMobileApp = ({ headline, description, appIcon, links, images, theme = 'blue' }: PromoMobileAppProps) => {
  const blockClasses = clsx(
    styles.block,
    [styles.block__white, styles[`block__bg${theme[0].toLocaleUpperCase()}${theme.slice(1)}`]],
    images.wide && styles.block__bgImage,
  );
  const blockStyle =
    (images.wide && ({ '--bg-img-url': `url(${images.wide.url})` } as React.CSSProperties)) ?? undefined;

  return (
    <section className={blockClasses} style={blockStyle} data-testid={'PromoMobileApp'}>
      <span role="img" aria-label={images.wide?.description} />
      <div className={styles.app}>
        <img className={styles.appIcon} src={appIcon?.url} alt={appIcon?.description} width="100" height="100" />
        <h2 className={styles.appHeading}>{headline}</h2>
        {description && <div className={styles.appDescription}>{description}</div>}
        <MobileAppLinks {...links} />
      </div>
      {images.square && (
        <div className={styles.appImageWrapper}>
          <img
            className={styles.appImage}
            src={images.square.url}
            alt={images.square.description}
            width="390"
            height="390"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default React.memo(PromoMobileApp);
