import clsx from 'clsx';
import React from 'react';

import Breadcrumbs, { BreadcrumbsItems } from '../../Breadcrumbs/Breadcrumbs';
import Button from '../../Button/Button';
import type { ImgData } from '../contentstack.model';
import helpers from '../helpers';

import styles from './Hero.module.scss';

export type HeroHeights = 'half' | 'full';

export type HeroContentPromotion = {
  heading: string;
  linkText: string;
  linkUrl: string;
};

export type HeroContentQuicklinks = {
  heading: string;
  links: { linkText: string; linkUrl: string }[];
};

export interface HeroProps {
  /**
   * Required page heading content `<h1>`
   */
  headline: string;
  /**
   * Optional hero description paragraph content or JSX for richtext
   */
  description?: string | React.ReactNode;
  /**
   * Background images for `default`, `small` for landing page variant, `wide` aspect for half-height as `{ url, description }`
   */
  images: {
    default: ImgData;
    square?: ImgData;
    wide?: ImgData;
  };
  /**
   * Optional hero CTA button, should always be ADS `<Button>`
   */
  ctaButton?: React.ReactElement<typeof Button>;
  /**
   * Inset and centre overlay to match content area
   */
  inset?: boolean;
  /**
   * Optional content panel for promo or quicklinks
   */
  panelContent?: HeroContentPromotion | HeroContentQuicklinks;
  /**
   * Optional breadcrumbs data
   */
  breadcrumbs?: BreadcrumbsItems;
}

const OverlayContent = (props: Pick<HeroProps, 'description' | 'ctaButton'>) => {
  const { ctaButton, description } = props;

  if (!ctaButton && !description) return null;

  return (
    <>
      {description && typeof description === 'string' ? (
        <p className={styles.description}>{description}</p>
      ) : (
        <div className={styles.richtext}>{description}</div>
      )}
      {ctaButton && <div className={styles.buttonContainer}>{ctaButton}</div>}
    </>
  );
};

const PanelPromotion = (props: HeroContentPromotion) => (
  <div className={clsx(styles.panel, styles.panel__promo)}>
    <p className={styles.panel__promoHeading}>{props.heading}</p>
    <div>
      <Button label={props.linkText} type="link" href={props.linkUrl} variant="tertiary" color="white" />
    </div>
  </div>
);

const PanelQuicklinks = (props: HeroContentQuicklinks & { height: HeroHeights }) => {
  const { heading, links, height } = props;

  return (
    <div className={clsx(styles.panel, styles.panel__quicklinks, styles[`panel__quicklinks__${height}`])}>
      <p className={styles.panel__quicklinksHeading}>{heading}</p>
      <ul className={styles.panel__quicklinksList}>
        {links.map((link) => (
          <li
            key={link.linkText}
            className={clsx(styles.panel__quicklinksListItem, styles[`panel__quicklinksListItem__${height}`])}
          >
            <a className={styles.panel__quicklinks__link} href={link.linkUrl}>
              {link.linkText}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Hero = (props: HeroProps & { height: HeroHeights }) => {
  const { breadcrumbs, ctaButton, description, height, images, inset, panelContent } = props;
  const PrimaryOverlay = () => {
    const { headline } = props;

    return (
      <div className={clsx(styles.overlay, styles[`overlay__${height}`])}>
        <h1 className={styles.heading}>{headline}</h1>
        <OverlayContent description={description} ctaButton={ctaButton} />
        {breadcrumbs && <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />}
      </div>
    );
  };

  const hasPanel = !!panelContent;
  const SecondaryOverlay = () => {
    if (inset || !hasPanel) return null;

    // quicklinks panel
    if ('links' in panelContent) {
      return <PanelQuicklinks {...(panelContent as HeroContentQuicklinks)} height={height} />;
    }

    // else promo panel
    return <PanelPromotion {...(panelContent as HeroContentPromotion)} />;
  };

  return (
    <section className={clsx(styles.hero, styles[`hero__${height}`], inset && styles.hero__inset)} data-testid="Hero">
      <div className={styles.heroBackground} style={helpers.cssVarsObjFromImages('bg-img-url', images)} />
      <div
        className={clsx(
          styles.overlayContainer,
          hasPanel && styles.overlayContainer__withPanel,
          inset && breadcrumbs && styles.overlayContainer__insetWithBreadcrumbs,
          !inset && breadcrumbs && styles.overlayContainer__withBreadcrumbs,
        )}
      >
        <PrimaryOverlay />
        <SecondaryOverlay />
      </div>
    </section>
  );
};

/**
 * The Hero component is used as the first content block on a page and includes the `<h1>` heading,
 * feature image, and optional: desciption, CTA button, promotion panel or quicklinks panel.
 * @param headline the `<h1>` page heading
 * @param description (optional) paragraph or JSX
 * @param images image data for default and (optional) wide aspect
 * @param ctaButton (optional) an ADS button to render as the CTA
 * @param inset inset and centre overlat to match content
 */
export const HeroHalf = React.memo((props: HeroProps) => <Hero height="half" {...props} />);
/**
 * The Hero component is used as the first content block on a page and includes the `<h1>` heading,
 * feature image, and optional: desciption, CTA button, promotion panel or quicklinks panel.
 * @param headline the `<h1>` page heading
 * @param description (optional) paragraph or JSX
 * @param images image data for default and (optional) wide aspect
 * @param ctaButton (optional) an ADS button to render as the CTA
 * @param inset inset and centre overlat to match content
 */
export const HeroFull = React.memo((props: HeroProps) => <Hero height="full" {...props} />);

export type HeroLandingProps = Omit<HeroProps, 'inset' | 'panelContent' | 'breadcrumbs'> & {
  /**
   * Set colour of overlay text to contrast with background image
   * @default black
   */
  overlayTextColour?: 'black' | 'white';
};

const LandingHero = (props: HeroLandingProps) => {
  const { ctaButton, description, headline, images, overlayTextColour = 'black' } = props;

  return (
    <section
      className={styles.landingHero}
      style={helpers.cssVarsObjFromImages('bg-img-url', images)}
      data-testid="Hero"
    >
      <div className={clsx(styles.landingHeroOverlay, styles[`landingHeroOverlay__${overlayTextColour}`])}>
        <h1 className={styles.heading}>{headline}</h1>
        <OverlayContent description={description} ctaButton={ctaButton} />
      </div>
      <div className={styles.landingHeroInlineImage} />
    </section>
  );
};

/**
 * The Hero component is used as the first content block on a page and includes the `<h1>` heading,
 * feature image, and optional: desciption, CTA button.
 * @param headline the `<h1>` page heading
 * @param overlayTextColour foreground colour of text to contrast with background image
 * @param description (optional) paragraph or JSX
 * @param images image data for default and (optional) wide aspect
 * @param ctaButton (optional) an ADS button to render as the CTA
 */
export const HeroLanding = React.memo((props: HeroLandingProps) => <LandingHero {...props} />);

export default React.memo(Hero);
