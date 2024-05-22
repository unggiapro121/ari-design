import React, { forwardRef } from 'react';

import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  /**
   * Color of the checkbox
   */
  color: 'blue' | 'red' | 'black' | 'cobalt';
  /**
   * Name of input and ID
   */
  name: string;
  /**
   * Event on checkbox check
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Event on onBlur
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Checked state
   */
  checked?: boolean;
  /**
   * Error state
   */
  error?: boolean;

  /**
   * Invert when checkbox has dark background, similar to the color of the checkbox
   */
  inverted?: boolean;
}

/**
 * Ampol Style Checkbox
 * @param children JSX children
 * @param color Color of the checkbox
 * @param name Name of input and ID
 * @param onChange Event on checkbox check
 * @param onBlur Event on checkbox focus lost
 * @param checked Checked state
 * @param error Error state
 * @param inverted Invert color
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ color, onChange, onBlur, name, checked = false, error, inverted}: CheckboxProps, ref) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
  };

  return <input
    className={`${styles.checkbox} ${styles[`checkbox__${error ? 'error' : inverted ? `${color}Inverted` : color }`]}`}
    type="checkbox"
    ref={ref}
    onChange={onChangeHandler}
    onBlur={onBlur}
    checked={checked}
    id={name}
    name={name}
    data-testid="Checkbox"/>;
});

Checkbox.displayName = Checkbox.name;

export default Checkbox;
