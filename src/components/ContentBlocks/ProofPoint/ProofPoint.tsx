import React from 'react';

import Typography from '../../Typography/Typography';
import { ContentstackLink, ImgData } from '../contentstack.model';

import styles from './ProofPoint.module.scss';

interface ProofPointTile {
  /**
   * Image for tile as `{ url, description }`
   */
  image: ImgData;
  /**
   * Single line headline
   */
  headline: string;
  /**
   * Single line description
   */
  description: string;
  /**
   * Optional Link
   */
  link?: ContentstackLink;
}

export interface ProofPointProps {
  /**
   * Array of 2-4 Proof Point objects
   * { image:  SVG image for tile as `{ url, description }`; headline: string; description: string; link: ContentstackLink}
   */
  tiles: ProofPointTile[];
}

/**
 * Describe Your Component
 * @param tiles Array of Proof Point objects
 */
const ProofPoint = ({ tiles }: ProofPointProps) => {
  const Tiles = () => <>{
    tiles.map((tile, index) => (
      <li key={index} className={styles.proofpointItem}>
        {
          <div className={styles.proofpointContainer}>
            {tile.image && (
              <img
                className={styles.proofpointImage}
                src={tile.image.url}
                width="96"
                height="96"
                aria-hidden
                loading="lazy"
                alt={tile.image.description}
                title={tile.image.description}
              />
            )}
            <Typography 
              className={tile.link?.href ? styles.proofpointHeadingLink : styles.proofpointHeading} 
              component= {tile.link?.href ? 'a' : 'p'}
              variant='p' 
              href={tile.link?.href ?? undefined}
              tabIndex={tile.link?.href ? 0 : undefined}
              title={tile.link?.title ?? undefined}>
              {tile.headline}
            </Typography>
            {tile.description && 
              <Typography component='p' className={styles.proofpointDescription}>{tile.description}</Typography>
            }
          </div>
        }
      </li>
    ))
  }</>;

  return (
    <section className={styles.block} data-testid="ProofPoint">
      <ul className={styles.proofpoint}>
        <Tiles />
      </ul>
    </section>
  );
};

export default React.memo(ProofPoint);
