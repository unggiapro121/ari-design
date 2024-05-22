import clsx from 'clsx';
import React from 'react';

import VisibleIcon from './../../../assets/icons/icons-eye-visible.png';
import styles from './CardIcon.module.scss';

export interface CardIconProps {
  url: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  loadLazy?: boolean;
}

/**
 * Describe Your Component
 * @param children JSX children
 */
const CardIcon = ({ url, onClick, className = '', style, loadLazy }: CardIconProps) => {

  return (
    <div className={clsx(styles.cardIconBlock, className && className, loadLazy && styles.card__loadLazy)} style={style} data-testid={'card-Icon'} onClick={()=> onClick?.()}>
      <img src={url} alt="modal icon" className={styles.cardIcon} width={'100'} height={'100'} loading="lazy" />
      <div className={styles.cardIconOverlay}>
        <img src={VisibleIcon} alt="hover icon" width={'24'} height={'24'} loading="lazy" />
      </div>
    </div>
  );
};

export default CardIcon;