import { Options, Splide, SplideProps, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import clsx from 'clsx';
import React from 'react';

import iconChevronRight from '@/images/icons/icon-chevron-right.svg';

import Icon from '../Icon/Icon';

import '@splidejs/react-splide/css/core';
import styles from './Carousel.module.scss';

export interface CarouselProps {
  /**
   * Toggle back/forward arrow visibility
   */
  showArrows?: boolean;
  /**
   * Automatically progress through slides. Default interval is `5000` (milliseconds).
   * Use `options` key `interval` to override.
   */
  autoPlay?: boolean;
  /**
   * Splide configuration object - default settings include
   * `autoWidth: true`, `focus: 'center'`, `type: 'loop'`.
   * For all options see documentation https://splidejs.com/guides/options/#options
   */
  options?: SplideProps['options'];
  /**
   * Custom html element tag for the carousel container
   */
  tag?: SplideProps['tag'];
  /**
   * Child elemements are rendered into the carousel slides
   */
  children: SplideProps['children'];
}

/**
 * Unopinionated Carousel wrapper component, supporting fully responsive child elements as slides.
 * Carousel should be automatically sized based on the size of the child items.
 * Plugin: Splide JS - splidejs.com
 */
const Carousel = ({ children, options, showArrows = true, autoPlay = false }: CarouselProps) => {
  const defaultOptions: Options = {
    autoplay: autoPlay,
    autoWidth: true,
    focus: 'center',
    type: 'loop',
    perPage: 1,
    flickMaxPages: 1,
    updateOnMove: true,
  };

  const Slides = () => {
    if (!children) return null;

    return <SplideTrack>{
      React.Children.toArray(children)
        .map((item, key) => (
          <SplideSlide key={key}>
            {item}
          </SplideSlide>
        ))
    }</SplideTrack>;
  };

  const Arrows = () => {
    return (
      <div className={clsx(styles.arrowContainer, !showArrows && styles.arrowContainer__noShow, 'splide__arrows')}>
        <button className={clsx(styles.arrowPrev, 'splide__arrow', 'splide__arrow--prev')}>
          <Icon size={24} url={iconChevronRight} aria-hidden />
        </button>
        <button className={clsx(styles.arrowNext, 'splide__arrow', 'splide__arrow--next')}>
          <Icon size={24} url={iconChevronRight} aria-hidden />
        </button>
      </div>
    );
  };

  return (
    <div data-testid="Carousel">
      <Splide hasTrack={false} className={styles.carousel} options={{
        ...defaultOptions,
        ...options,
      }}>
        <Slides />
        <Arrows />
      </Splide>
    </div>
  );
};

export default Carousel;
