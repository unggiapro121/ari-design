import clsx from 'clsx';
import React from 'react';

import type Button from '../../Button/Button';
import type { ImgData } from '../contentstack.model';
import helpers from '../helpers';

import styles from './FeatureTiles.module.scss';

interface FeatureTile {
  headline: string;
  description?: string;
  ctaButton?: React.ReactElement<typeof Button>;
  images: {
    square?: ImgData;
    wide?: ImgData;
  };
}

export interface FeatureTilesProps {
  /**
   * Tile data `{ headline, description, ctaButton, images }`
   */
  tiles: FeatureTile[];
  /**
   * Layout format for tiles - `default` (default, under the content) or `overlay`
   */
  layout: 'default' | 'overlay';
}

/**
 * Describe Your Component
 * @param tiles array of tiles data
 */
const FeatureTiles = ({ tiles, layout = 'default' }: FeatureTilesProps) => {
  const maxSize = 5;
  const firstNTiles = tiles.slice(0, maxSize);
  const tilesCount = firstNTiles.length;

  return (
    <div className={styles.featureTilesOuter} data-testid="FeatureTiles">
      <div className={clsx(styles.featureTiles, styles[`featureTiles__${layout}`], styles[`featureTiles__x${tilesCount}`])}>
        {firstNTiles.map((tile, i) => {
          const { ctaButton, description, headline, images } = tile;

          return (
            <div className={styles.tile} style={helpers.cssVarsObjFromImages('bg-image', images)} key={i}>
              <div className={styles.tileImage} />
              <div className={styles.tileLayout}>
                <div className={styles.tileContent}>
                  <p className={styles.tileHeadline}>{headline}</p>
                  {description && <p className={styles.tileDescription}>{description}</p>}
                  {ctaButton && <div className={styles.tileCta}>{ctaButton}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(FeatureTiles);
