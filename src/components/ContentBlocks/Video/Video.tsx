import React, { useState } from 'react';

import { ImgData } from '../contentstack.model';

import styles from './Video.module.scss';

export interface VideoProps {
  /**
   * Required image to be clicked on to play video as `{ url, description }`
   */
  image: ImgData;
  /**
   * Headline text
   */
  headline?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Required URL string
   */
  youtubeUrl: string;
}

/**
 * Describe Your Component
 * @param image image to be clicked on to play video
 * @param headline headline for the video
 * @param description description for the video
 * @param youtubeUrl youtube video URL
 */
const Video = ({ image, headline, description, youtubeUrl }: VideoProps) => {
  const [showImageOverlay, setShowImageOverlay] = useState(true);
  const hasCaption = !!(headline || description);
  const handlePlayClick = () => {
    setShowImageOverlay(false);
  };

  return (
    <div className={styles.feature} data-testid={'Video'}>
      <div className={styles.mediaContainer}>
        {showImageOverlay ? (
          <div onClick={handlePlayClick}>
            <img
              className={styles.stillImage}
              src={image?.url}
              alt={image?.description}
              width="1440"
              height="810"
              loading="lazy"
            />
            <button className={styles.playIconButton} aria-label={`Play ${headline} video`}>
              <figure className={styles.playIcon} aria-hidden />
            </button>
          </div>
        ) : (
          <iframe
            title="YouTube video player"
            src={`${youtubeUrl}?autoplay=1&rel=0`}
            className={styles.videoContainer}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
      {hasCaption &&
        <div className={styles.containerTextInner}>
          {headline?.length && <p className={styles.heading}>{headline}</p>}
          {description?.length && <div className={styles.description}>{description}</div>}
        </div>
      }
    </div>
  );
};

export default React.memo(Video);
