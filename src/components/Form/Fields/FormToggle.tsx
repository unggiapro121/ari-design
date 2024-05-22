import React from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import Toggle, { ToggleProps } from '../../Toggle/Toggle';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormToggleExtraProps {
  // More props for FormToggle
}

export type FormToggleProps = Omit<FormToggleExtraProps & FormFieldProps & ToggleProps, 'onToggle' | 'onBlur' | 'checked' | 'render'>;

/**
 * Form toggle helper component
 */
const FormToggle = ({labelType = 'top', ...props} : FormToggleProps) => {
  return <FormField {...props} labelType={labelType} render={(onChange, onBlur, value, _error, ref) => <Toggle {...props} checked={value} onToggle={onChange} onBlur={onBlur} ref={ref}/>} data-testid="FormToggle"/>;
};

export default FormToggle;
