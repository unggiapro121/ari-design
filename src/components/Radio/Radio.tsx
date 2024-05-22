import clsx from 'clsx';
import React from 'react';

import styles from './Radio.module.scss';
import { RadioGroupContext } from './RadioGroup';

export interface RadioProps {
  /**
   * Value of the radio eg. what data is being passed to the parent component on selection
   */
  value: string;
  /**
   * Optional label for the radio (used in RadioButtonGroup for display name)
   */
  label?: string | React.ReactNode;
  /**
   * Optional tooltip for the radio
   */
  tooltip?: string;
  disabled?: boolean;
}

const useRadioGroup = () => {
  const ctx = React.useContext(RadioGroupContext);

  if (!ctx)
    throw new Error(
      'Radio component must be used within RadioButtonGroup or RadioGroup',
    );

  return ctx;
};

/**
 * Sanitizes string to remove invalid characters.
 * @param value 
 * @returns 
 */
export function sanitize(value: string) {
  return value.replace(/[^a-z0-9.]+/gi, '');
}

/**
 * Ampol Style Radio (Controlled by RadioGroup)
 * @param value Value of the radio eg. what data is being passed to the parent component on selection
 * @param label Optional label for the radio (used in RadioButtonGroup for display name)
 */
const Radio = ({
  label,
  value,
  tooltip,
  children,
  disabled,
}: React.PropsWithChildren<RadioProps>) => {
  const ctx = useRadioGroup();

  const name = [ctx.name, sanitize(value)].join('-');

  const checked = ctx.value === value;

  return (
    <div className={styles.container} data-testid="Radio">
      <input
        type="radio"
        id={name}
        value={value}
        className={clsx(styles.radio, disabled && styles.radio__disabled)}
        readOnly
        checked={checked}
        disabled={disabled}
      />
      <div className={styles.radioLabelContainer}>
        <label htmlFor={name} className={styles.radioLabel}>
          {label}
          {tooltip && <span className={styles.radioTooltip}> {tooltip}</span>}
        </label>
        {children}
      </div>
    </div>
  );
};

export default Radio;
