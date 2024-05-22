import clsx from 'clsx';
import React from 'react';

import styles from './ReadonlyInput.module.scss';

export interface ReadonlyInputProps {
  /** Value of the input  */
  value?: string;
  /** Checked state for `radio` and `checkbox` types. */
  checked?: boolean;
  /** The `FormField` type. */
  type?: 'input' | 'dropdown' | 'checkbox' | 'radio';
}

/**
 * Element used to render out disabled input
 */
const ReadonlyField = ({
  value,
  checked,
  type = 'input',
}: ReadonlyInputProps) => {
  /** Style overrides by `type` */
  const overrides = clsx({
    [styles.readonlyFieldDropdown]: type === 'dropdown',
    [clsx(
      styles.readonlyFieldRadiobutton,
      checked && styles.readonlyFieldRadiobutton__checked,
    )]: type === 'radio',
    [clsx(
      styles.readonlyFieldCheckbox,
      checked && styles.readonlyFieldCheckbox__checked,
    )]: type === 'checkbox',
  });

  return (
    <div
      data-testid="ReadonlyField"
      className={clsx(styles.readonlyField, overrides)}
    >
      {!['checkbox', 'radio'].includes(type) && (
        <span className={styles.readonlyFieldValue}>{value}</span>
      )}
    </div>
  );
};

export default ReadonlyField;
