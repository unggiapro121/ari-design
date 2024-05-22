import clsx from 'clsx';
import React from 'react';

import type Button from '../../Button/Button';
import Carousel from '../../Carousel/Carousel';
import { ImgData } from '../contentstack.model';
import helpers from '../helpers';

import styles from './CarouselBlock.module.scss';

interface ItemProps {
  /**
   * Title of carousel item
   */
  title: string;
  /**
   * Item description text rendered to jsx
   */
  description: React.ReactElement;
  /**
   * Background image for item as `{ url, description }`
   */
  image: ImgData;
  /**
   * Item link as ADS button
   */
  link?: React.ReactElement<typeof Button>;
}

type Sizes = 'small' | 'large';

export interface CarouselBlockProps {
  /**
   * Array of carousel items
   */
  items: ItemProps[];
  /**
   * Size `small` or `large`
   * @default small
   */
  size?: Sizes;
}

const Item = ({ image, title, description, link }: ItemProps) => (
  <div className={styles.carouselItem} style={helpers.cssVarsObjFromImages('bg-image', { sm: image })}>
    <div className={styles.carouselItemOverlay}>
      <h2 className={styles.carouselItemTitle}>{title}</h2>
      <div className={styles.carouselItemDescription}>
        {description}
      </div>
      <div className={styles.carouselItemLink}>
        {link}
      </div>
    </div>
  </div>
);

/**
 * The CarouselBlock streamlines the rendering of cms content into the ADS Carousel
 * @param items Array of carousel items
 * @param size Size of carousel
 */
const CarouselBlock = ({ items, size = 'small' }: CarouselBlockProps) => {
  return (
    <div className={clsx(styles.carousel, styles[`carousel__${size}`])} data-testid="CarouselContentBlock">
      <Carousel showArrows={false}>
        {items.map((item, key) => <Item {...item} key={key} />)}
      </Carousel>
    </div>
  );
};

export default React.memo(CarouselBlock);
