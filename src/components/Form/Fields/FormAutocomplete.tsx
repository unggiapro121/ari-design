import React, { useState } from 'react';

import Autocomplete, {
  AutocompleteProps,
} from '../../Autocomplete/Autocomplete';
import FormField, { FormFieldProps } from '../../FormField/FormField';

/**
 * Form type ahead helper component
 */
const FormAutocomplete = ({ ...props }: Omit<AutocompleteProps & FormFieldProps, 'value'>) => {
  const [inputValue, setInputValue] = useState<string | undefined>('');

  return (
    <FormField
      {...props}
      forceFloating={inputValue ? true : false}
      render={(onChange, onBlur, value, error, ref) => (
        <Autocomplete
          {...props}
          inputProps={{
            ...props.inputProps,
            error: error,
          }}
          onInputChange={(v) => {
            props.onInputChange?.(v);
            setInputValue(v);
          }}
          onChange={(v) => {
            onChange(v);
            props.onChange?.(v);
          }}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
      )}
      data-testid="FormAutocomplete"
    />
  );
};

export default FormAutocomplete;
