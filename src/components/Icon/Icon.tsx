import React from 'react';

type FilteredImageAttrs = Pick<
  React.ComponentPropsWithoutRef<'img'>,
  'alt' | 'aria-hidden' | 'className' | 'style' | 'width' | 'height'
>;

export interface IconProps extends FilteredImageAttrs {
  name?: string;
  url?: string;
  size?: number;
}

/**
 * Render svg icon from assets or cloud
 * @param name The icon to be rendered
 * @param url The url path for the icon
 * @param size Size of the icon (Default: 22)
 * @param width Size of the icon (Default: 22)
 * @param height Size of the icon (Default: 22)
 * @param alt Alt text for the icon if needed
 * @param className CSS class to add extra styling
 * @param style Css properties
 */
export const Icon = ({ alt = '', name, url, size = 22, width, height, ...props }: IconProps) => {
  const path = '/icons';

  const iconSrc = !!url ? url : `${path}/icon-${name}.svg`;
  const dataTestId = name ? `${name}-icon` : null;

  return (
    <img
      {...props}
      src={iconSrc}
      width={width ?? size}
      height={height ?? size}
      alt={alt}
      data-testid={dataTestId}
    />
  );
};

export default Icon;
