import React from 'react';

import Dropdown, { DropdownProps } from '../../Dropdown/Dropdown';
import FormField, { FormFieldProps } from '../../FormField/FormField';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormDropdownExtraProps {
  // Extra props for FormDropdown
}

export type FormDropdownProps = Omit<FormDropdownExtraProps & FormFieldProps & DropdownProps, 'onChange' | 'onBlur' | 'option' | 'render'>;

/**
 * Form dropdown helper component
 */
const FormDropDown = ({ labelType = 'top', ...props }: FormDropdownProps) => {
  return <FormField {...props} labelType={labelType} render={(onChange, onBlur, value, error, ref) => <Dropdown {...props} option={value} onChange={onChange} onBlur={onBlur} error={error} ref={ref} />} disabledType={'dropdown'} data-testid="FormDropDown"/>;
};

export default FormDropDown;
