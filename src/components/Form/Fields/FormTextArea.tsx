import React from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import TextArea from '../../TextArea/TextArea';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormTextAreaExtraProps {
  // More props for FormText
  rows?: number;
  cols?: number;
}

export type FormTextAreaProps = Omit<FormTextAreaExtraProps & FormFieldProps, 'onChange' | 'onBlur' | 'value' | 'error' | 'render'>;

/**
 * Form text area helper component
 */
const FormTextArea = (props: FormTextAreaProps) => {
  return <FormField {...props} render={(onChange, onBlur, value, error, ref) => <TextArea {...props} value={value} onChange={onChange} onBlur={onBlur} error={error} ref={ref}/> } data-testid="FormTextArea"/>;
};

export default FormTextArea;
