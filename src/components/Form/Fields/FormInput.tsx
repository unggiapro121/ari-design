import React from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import Input, { InputProps } from '../../Input/Input';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormTextExtraProps {
  // More props for FormText
}

export type FormTextProps = Omit<FormTextExtraProps & FormFieldProps & InputProps, 'onChange' | 'onBlur' | 'value' | 'error' | 'render'>;

/**
 * Form input helper component
 */
const FormInput = (props: FormTextProps) => {

  return <FormField {...props}
    render={(onChange, onBlur, value, error, ref) => <Input {...props} value={value} onChange={onChange} onBlur={onBlur} error={error} ref={ref}/>} data-testid="FormInput"/>;
};

export default FormInput;
