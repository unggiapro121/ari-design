import React, { useState } from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import TypeAhead, { TypeAheadProps } from '../../TypeAhead/TypeAhead';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormTypeAheadExtraProps {
  // extra props here
}

type FormTypeAheadProps = Omit<FormTypeAheadExtraProps & TypeAheadProps & FormFieldProps, 'error' | 'onBlur' | 'onSelect' | 'selected' | 'value' | 'render'>;

/**
 * Form type ahead helper component
 */
const FormTypeAhead = ({...props} : FormTypeAheadProps) => {
  const [ inputValue, setInputValue ] = useState<string | undefined>('');

  return <FormField {...props} forceFloating={inputValue ? true : false} render={(onChange, onBlur, value, error, ref) => <TypeAhead {...props} onInputChange={(v) => {setInputValue(v); props.onInputChange?.(v);}} error={error} onSelect={onChange} onBlur={onBlur} selected={value} ref={ref} />} data-testid="FormTypeAhead"/>;
};

export default FormTypeAhead;
