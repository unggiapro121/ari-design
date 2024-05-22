import React from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import Radio from '../../Radio/Radio';
import RadioGroup, { RadioGroupProps } from '../../Radio/RadioGroup';

type RadioOptions = {
  label: string | React.ReactNode;
  value: string;
  tooltip?: string;
  children?: React.ReactNode;
}[];

export interface FormRadioGroupExtraProps {
  values: RadioOptions | string[];
}

export type FormRadioGroupProps = Omit<
  FormRadioGroupExtraProps & FormFieldProps & RadioGroupProps,
  'onChange' | 'onBlur' | 'value' | 'error' | 'render'
>;

/**
 * Form radio group helper component
 * @param values Radio options
 */
const FormRadioGroup = ({
  values,
  labelType = 'top',
  ...props
}: FormRadioGroupProps) => {

  return (
    <FormField
      {...props}
      labelType={labelType}
      render={(onChange, onBlur, value, error, ref) => (
        <RadioGroup
          {...props}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          ref={ref}
        >
          {values.map((val, i) => (
            <Radio
              key={i}
              disabled={props.disabled}
              {...(typeof val === 'string' ? { label: val, value: val } : val)}
            />
          ))}
        </RadioGroup>
      )}
      data-testid="FormRadioGroup"
    />
  );
};

export default FormRadioGroup;
