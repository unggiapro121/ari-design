import React from 'react';

import cn from '../../util/cn';

export interface BannerBrandsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a list of brands for the banner component. Intended to have Nav.Brand components as children.
 * @component
 */
const BannerBrands = (props: BannerBrandsProps) => {
  return (
    <ul
      className={cn(
        'ads-flex ads-space-x-m',
        props.className,
      )}
    >
      {props.children}
    </ul>
  );
};

BannerBrands.displayName = 'BannerBrands';

export default BannerBrands;
