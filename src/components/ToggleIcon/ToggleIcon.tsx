import React, { useEffect, useState } from 'react';

import styles from './ToggleIcon.module.scss';

export interface ToggleIconProps {
  enabledImage: string;
  disabledImage: string;
  enabledText: string;
  disabledText: string;
  size?: number;
  onToggle?: (toggled: boolean) => void;
  isToggled?: boolean;
}

/**
 * A basic toggle that switched between two images
 * @param enabledImage image shown when enabled
 * @param disabledImage image shown when disabled
 * @param enabledText text for screen readers when enabled
 * @param disabledText text for screen readers when enabled
 * @param size width and height in px
 * @param onToggle callback when button is clicked
 * @param isToggled (optional) Define if menu is toggled
 */
const ToggleIcon = ({
  enabledImage,
  disabledImage,
  enabledText,
  disabledText,
  onToggle,
  size = 25,
  isToggled,
}: ToggleIconProps) => {
  const [toggled, setToggled] = useState(isToggled);

  const onToggleHandler = () => {
    setToggled(!toggled);
    onToggle && onToggle(!toggled);
  };

  const imageSrc = toggled ? enabledImage : disabledImage;
  const altText = toggled ? enabledText : disabledText;

  useEffect(()=> {
    setToggled(isToggled);
  }, [isToggled]);

  return (
    <button
      type={'button'}
      className={styles.toggleicon}
      onClick={onToggleHandler}
      style={{ width: size, height: size }}
      data-testid="ToggleIcon"
    >
      <img src={imageSrc} alt={altText} />
    </button>
  );
};

export default ToggleIcon;
