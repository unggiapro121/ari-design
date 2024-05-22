import React from 'react';

import Checkbox, { CheckboxProps } from '../../Checkbox/Checkbox';
import FormField, { FormFieldProps } from '../../FormField/FormField';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormCheckboxExtraProps {
  // More props for FormCheckbox
}

export type FormCheckboxProps = Omit<FormCheckboxExtraProps & FormFieldProps & CheckboxProps, 'onChange' | 'onBlur' | 'checked' | 'error' | 'render'>;

/**
 * Form checkbox helper component
 */
const FormCheckbox = ({ labelType = 'right', ...props }: FormCheckboxProps) => {
  return <FormField {...props} labelType={labelType} render={(onChange, _, value, error, ref) => <Checkbox {...props} checked={value} onChange={onChange} error={error} ref={ref} />} disabledType={'checkbox'} data-testid="FormCheckbox"/>;
};

export default FormCheckbox;
