import React from 'react';

import cn from '../../util/cn';

export interface BannerActionProps {
  title: string;
  className?: string;
  icon?: string;
  onClick?: () => void;
}

/**
 * Renders a banner action button. Intended to be used with the Banner.Actions component.
 * Can also be re-used in MobileMenu.SubActions component.
 * @component
 */
const BannerAction = (props: BannerActionProps) => {
  return (
    <li>
      <button
        className={cn(
          'ads-flex ads-justify-center ads-items-start ads-text-[14px]',
          props.className,
        )}
        onClick={props?.onClick}
      >
        {props.title.toUpperCase()}
        {props.icon && (
          <img src={props.icon} alt="banner-icon" className="ads-h-[20px] ads-ml-xs" />
        )}
      </button>
    </li>
  );
};

BannerAction.displayName = 'BannerAction';

export default BannerAction;
