import React from 'react';

import DropdownSearch, { DropdownSearchProps } from '../../DropdownSearch/DropdownSearch';
import FormField, { FormFieldProps } from '../../FormField/FormField';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormDropdownSearchExtraProps extends FormFieldProps {
  // More props for DropdownSearch
}

export type FormDropdownSearchProps = Omit<FormDropdownSearchExtraProps & FormFieldProps & DropdownSearchProps, 'onChange' | 'onBlur' | 'value' | 'render' | 'error'>;

/**
 * Form dropdown search helper component
 */
const FormDropdownSearch = (props : FormDropdownSearchProps) => {
  return <FormField {...props} forceFloating render={(onChange, onBlur, value, error, ref) => <DropdownSearch {...props} value={value} onChange={onChange} onBlur={onBlur} error={error} ref={ref} />} disabledType={'dropdown'} data-testid="FormDropDown"/>;
};

export default FormDropdownSearch;
