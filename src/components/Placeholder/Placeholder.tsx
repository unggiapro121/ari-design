import React from 'react';

import styles from './Placeholder.module.scss';

export interface PlaceholderProps {
  label: string,
  status?: string,
}

/**
 * A simple placeholder for incomplete components
 * @param label component label
 * @param status component status
 */
const Placeholder = ({ label, status = 'WIP' }: PlaceholderProps) => {

  return <>
    <div className={styles['placeholder']}>
      <div className={styles.placeholderStatus}>
        {status}
      </div>
      {label}
    </div>
  </>;
};

export default Placeholder;