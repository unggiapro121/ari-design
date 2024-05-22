import React from 'react';

import cn from '../../util/cn';

export interface NavLogoProps {
  src: string;
  alt?: string;
  onClick?: React.MouseEventHandler;
  className?: string;
}

/**
 * Renders a logo for the navigation bar.
 * @component
 */
const NavLogo = (props: NavLogoProps) => {
  return (
    <img
      src={props.src}
      onClick={props.onClick}
      alt={props.alt}
      className={cn(
        `ads-max-w-full ads-max-h-full ads-object-contain ads-box-border ads-mr-auto ${props.onClick ? 'ads-cursor-pointer' : ''}`,
        props.className,
      )}
    />
  );
};

NavLogo.displayName = 'NavLogo';

export default NavLogo;