import React from 'react';

import FormField, { FormFieldProps } from '../../FormField/FormField';
import Scroll, { ScrollProps } from '../../Scroll/Scroll';

export type FormScrollProps = Omit<FormFieldProps & ScrollProps, 'onScrollBottom' | 'render'>;

/**
 * Form component used for validating if a scroll box has been read
 * @param children JSX children
 */
const FormScroll = ({ labelType = 'hidden', style, ...props }: FormFieldProps) => {
  return (
    <FormField
      labelType={labelType}
      {...props}
      render={(onChange, _onBlur, _value, _error, ref) => (
        <Scroll onScroll={(isAtBottom: boolean) => isAtBottom ? onChange(true) : undefined} style={style} ref={ref}>
          {props.children}
        </Scroll>
      )}
      data-testid="FormScroll"
    />
  );
};

export default FormScroll;
