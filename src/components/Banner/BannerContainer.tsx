import React from 'react';

import cn from '../../util/cn';
export interface BannerContainerProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Renders a container for the Banner component. Centers the banner items with a max width of 1240px.
 * @component
 */
const BannerContainer = (props: BannerContainerProps) => {
  return (
    <div
      className={cn(
        'ads-w-full ads-h-full ads-max-w-[1240px] ads-flex ads-justify-between ads-items-center ads-m-xl',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

BannerContainer.displayName = 'BannerContainer';

export default BannerContainer;
