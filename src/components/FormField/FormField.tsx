import { DropDownSearchOptionInterface } from 'components/DropdownSearch/DropdownSearch';
import { isDayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, RefCallBack } from 'react-hook-form';

import { DropDownValueInterface } from '../Dropdown/Dropdown';
import { useFormContext } from '../Form/Form';
import ReadonlyField from '../ReadonlyInput/ReadonlyField';

import styles from './FormField.module.scss';

export interface FormFieldProps {
  label: string | React.ReactNode;
  name: string;
  subText?: string;
  labelType?: 'floating' | 'left' | 'right' | 'top' | 'hidden';
  ariaLabel?: string;
  forceFloating?: boolean;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  showOptionalLabel?: boolean;
  children?: any;
  placeholder?: string;
  render?: (
    onChange: (...event: any[]) => void,
    onBlur: () => void,
    value: any,
    error: any,
    ref: RefCallBack
  ) => any;
  disabled?: boolean;
  disabledType?: 'input' | 'dropdown' | 'checkbox' | 'radio';
  options?: DropDownValueInterface[];
  data?: DropDownSearchOptionInterface[];
}

/**
 * This component is to be used as a child to the Form component.
 * @param labelType Label type defines its style
 * @param forceFloating Force to floating at all times
 * @param props FormFieldProps
 */
const FormField = ({
  labelType = 'floating',
  forceFloating = false,
  ...props
}: FormFieldProps) => {
  const [selected, setSelected] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const componentId = `${props.name}-field`;

  const formContext = useFormContext();

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSelected(false);
      } else {
        setSelected(true);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  const watchValue = formContext?.watch && formContext?.watch(props.name);
  const actualValue = isDayjs(watchValue) ?
    watchValue.format('DD/MM/YYYY') :
    watchValue;
  const isLabelActive =
    watchValue ||
    selected ||
    props.placeholder ||
    forceFloating ||
    props.disabled;

  let labelStyles = '';

  switch (labelType) {
    case 'left':
      labelStyles = styles.formField__left;
      break;
    case 'right':
      labelStyles = styles.formField__right;
      break;
    case 'top':
      labelStyles = styles.formField__top;
      break;
    case 'hidden':
      labelStyles = styles.formField__hidden;
      break;
    case 'floating':
      labelStyles = styles.formField__floating;
      break;
    default:
      labelStyles = styles.formFieldLabel;
      break;
  }

  const getValue = () => {
    if (props.options) return props.options?.find((option: DropDownValueInterface) => option.value === watchValue)?.label;

    if (props.data) return props.data?.find((data: DropDownSearchOptionInterface) => data.value === watchValue)?.label;

    return actualValue;
  };

  return (
    <div
      className={`${styles.formField} ${
        props.className ? props.className : ''
      } ${formContext?.errors?.[props.name] ? styles['formField__error'] : ''}`}
      style={props.style}
      data-testid="FormField"
    >
      <div className={`${labelStyles}`}>
        <label
          id={`${componentId}-label`}
          data-testid={`${componentId}-label`}
          htmlFor={props.name}
          style={props.labelStyle}
          aria-label={props.ariaLabel}
          className={`${!!props.labelClassName ? props.labelClassName : ''} ${
            styles.formFieldLabel
          } ${isLabelActive ? styles.formFieldLabel__active : ''}`}
        >
          {props.label}{' '}
          {props.showOptionalLabel && (
            <span className={styles.formFieldLabel__optional}> Optional</span>
          )}
        </label>
        <div
          ref={inputRef}
          onFocus={() => setSelected(true)}
          onBlur={() => setSelected(false)}
          className={styles.formFieldInput}
        >
          {props.render && (
            <Controller
              control={formContext.control}
              shouldUnregister
              name={props.name}
              render={({ field: { onChange, onBlur, value, ref } }) =>
                (!props.disabled || props.disabledType === 'radio') ?
                  props.render?.(
                    onChange,
                    onBlur,
                    value,
                    !!formContext?.errors?.[props.name],
                    ref,
                  ) :   
                  <ReadonlyField
                    value={getValue()}
                    checked={watchValue}
                    type={props.disabledType}
                  />
              }
              
            />
          )}
        </div>
      </div>
      {(formContext?.errors?.[props.name]?.message || props.subText) && (
        <div id={`${componentId}-subText`} className={styles.formFieldSubtext}>
          {formContext?.errors?.[props.name]?.message || props.subText}
        </div>
      )}
    </div>
  );
};

export default FormField;
