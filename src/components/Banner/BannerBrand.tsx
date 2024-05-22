import React from 'react';

import cn from '../../util/cn';

export interface BannerBrandProps {
  image: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Renders a banner brand component. Intended to be used with the Banner.Brands component.
 * Note: This component uses brightness-0 and hover:brightness-100 classes to handle image brightness.
 * @component
 */
const BannerBrand = (props: BannerBrandProps) => {
  return (
    <li className="ads-flex">
      <button
        onClick={props?.onClick}
        className={cn('ads-brightness-0 hover:ads-brightness-100', props.className)}
      >
        <img src={props.image} />
      </button>
    </li>
  );
};

BannerBrand.displayName = 'BannerBrand';

export default BannerBrand;
