import React from 'react';

import cn from '../../util/cn';

import BannerAction from './BannerAction';
import BannerActions from './BannerActions';
import BannerBrand from './BannerBrand';
import BannerBrands from './BannerBrands';
import BannerContainer from './BannerContainer';

export interface BannerProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a banner component. Intended to be used at the top of the page above the Nav component.
 * Note: This component is hidden on mobile.
 * @component
 */
const BannerComponent = (props: BannerProps) => {
  return (
    <div className="preflight">
      <div
        className={cn(
          'ads-w-full ads-h-[50px] ads-justify-center ads-items-center ads-bg-background-light ads-hidden tablet:ads-flex',
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

BannerComponent.displayName = 'Banner';

// We use this sub-component syntax to remain typesafe
const Banner = Object.assign(BannerComponent, {
  Brands: BannerBrands,
  Brand: BannerBrand,
  Actions: BannerActions,
  Action: BannerAction,
  Container: BannerContainer,
});

export default Banner;
