import React, { forwardRef, useEffect, useState } from 'react';

import styles from './Toggle.module.scss';

export interface ToggleProps {
  /**
   * Input name and id
   */
  name?: string,
  /**
   * Toggle colors
   */
  color: 'red' | 'blue' | 'black' | 'cobalt',
  /**
   * Callback when toggled is clicked
   */
  onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * Callback when toggled looses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  /**
   * Set toggle value
   */
  checked?: boolean,
}

/**
 * Ampol toggle on/off component
 * @param name Input name and id
 * @param color Toggle colors
 * @param onToggle Callback when toggled is clicked
 * @param onBlur Callback when toggled looses focus
 * @param checked Set toggle value
 */
const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({ name, onToggle, onBlur, checked = false, color }: ToggleProps, ref) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setToggled(checked);
  }, [checked]);

  const onToggleHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setToggled(event.target.checked);
    onToggle?.(event);
  };

  return <div className={styles.toggle} data-testid="Toggle">
    <input
      type="checkbox"
      data-testid={`${name}-toggle`}
      className={styles[`toggleCheckbox__${color}`]}
      id={name}
      name={name}
      checked={toggled}
      onChange={onToggleHandler}
      onBlur={onBlur}
      ref={ref}
    />
  </div>;
});

Toggle.displayName = Toggle.name;

export default Toggle;
