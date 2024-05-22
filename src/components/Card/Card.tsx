import React, { CSSProperties } from 'react';

import styles from './Card.module.scss';

export interface CardProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * Basic Card component
 * @param children
 * @param style
 * @param className
 */
const Card = ({ children, style, className }: CardProps) => {
  return (
    <div className={`${styles['card']} ${className}`} style={style} data-testid="Card">
      {children}
    </div>
  );
};

export default Card;
