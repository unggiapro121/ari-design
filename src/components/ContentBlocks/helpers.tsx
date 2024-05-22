import React from 'react';

import type { ImgData } from './contentstack.model';

/**
 * @param prefix css variable prefix
 * @param images object of `ImgData`
 * @returns style object to set css variables for each image path
 */
export const cssVarsObjFromImages = (prefix: string, images: Record<string, ImgData>) => {
  return Object.entries(images).reduce((acc, img) => {
    if (img[1]?.url) return { ...acc, [`--${prefix}-${img[0]}`]: `url(${img[1].url})` };

    return acc;
  }, {}) as React.CSSProperties;
};

/**
 * separate out multiline text content to JSX
 */
export function mapMultilineText(data: string, tag?: keyof JSX.IntrinsicElements) {
  const Tag = tag || 'p';

  return (
    <>
      {data.split('\n').map((txt, k) => (
        <Tag key={k}>{txt}</Tag>
      ))}
    </>
  );
}

export default { cssVarsObjFromImages, mapMultilineText };
