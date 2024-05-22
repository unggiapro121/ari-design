import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import styles from './Input.module.scss';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /**
   * The type of data that is being input
   */
  inputType?: InputType | `${InputType}`;
  /**
   * The name and id of the input
   */
  name?: string;
  /**
   * The placeholder text
   */
  placeholder?: string;
  /**
   * Values before inputed text (visual only)
   */
  prefix?: string | ReactNode;
  /**
   * Values after inputed text (visual only)
   */
  suffix?: string | ReactNode;
  /**
   * Content prefixed inside the input eg. icon / button
   */
  inputPrefix?: string | ReactNode;
  /**
   * Content suffixed inside the input eg. icon / button
   */
  inputSuffix?: string | ReactNode;
  /**
   * The value of the input
   */
  value?: string;
  /**
   * Whether the input has an error
   */
  error?: boolean;
  /**
   * Callback for when the input changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback for when focus moves away from input
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Tooltip text
   */
  tooltip?: string;
  /**
   * Replace input with custom input implementation
   */
  customInput?: ReactNode;
  /**
   * Display read only text instead of input
   */
  disabled?: boolean;
  /**
   * Set focus to the input element if true;  Warning: If you set this to multiple Inputs, the last one will take precedence
   */
  hasFocus?: boolean;
  /**
   * Set custom styles on container
   */
  containerClassName?: string;
  /**
   * Focus ID on max length
   */
  focusIDOnMaxLength?: string;
  /**
   * Focus ID on empty
   */
  focusIDOnEmpty?: string;
  /**
   * Min value
   */
  min?: string;
  /**
   * Max value
   */
  max?: string;
}

export enum InputType {
  text = 'text',
  number = 'number',
  email = 'email',
  password = 'password',
  phone = 'tel',
  time = 'time',
  date = 'date',
  textarea = 'textarea',
  checkbox = 'checkbox',
  radio = 'radio',
  select = 'select',
}

/**
 * Ampol input component
 * @param inputType The type of data that is being input
 * @param name The name and id of the input
 * @param placeholder The placeholder text
 * @param prefix Values before inputed text (visual only)
 * @param suffix Values after inputed text (visual only)
 * @param inputPrefix Content prefixed inside the input eg. icon / button
 * @param inputSuffix Content suffixed inside the input eg. icon / button
 * @param value The value of the input
 * @param error Whether the input has an error
 * @param onChange Callback for when the input changes
 * @param onBlur Callback for when focus leaves the input
 * @param tooltip Tooltip text
 */
const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      inputType,
      name,
      placeholder,
      prefix,
      suffix,
      inputSuffix,
      inputPrefix,
      value,
      error,
      onChange,
      onBlur,
      tooltip,
      customInput,
      hasFocus,
      focusIDOnMaxLength,
      focusIDOnEmpty,
      min, 
      max,
      ...props
    }: InputProps,
    ref,
  ) => {
    const [localValue, setLocalValue] = React.useState(value || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    /**
     * Focus next input on backspace/delete if input is empty (which onchange wouldn't capture)
     */
    useEffect(() => {
      if (!focusIDOnEmpty) return;

      // Check for backspace and delete events
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          if (document.activeElement !== inputRef.current) return;

          if (!inputRef.current?.value.length) {
            const nextInput = document.getElementById(focusIDOnEmpty);

            if (nextInput) nextInput.focus();
          }
        }
      };

      document.addEventListener('keydown', onKeyDown);

      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }, []);

    useEffect(() => {
      setLocalValue(value ?? '');
    }, [value]);

    useEffect(() => {
      if (hasFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [hasFocus, inputRef.current]);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      if (focusIDOnMaxLength && props.maxLength) {
        if (event.target.value.length >= props.maxLength) {
          event.stopPropagation();
          const nextInput = document.getElementById(focusIDOnMaxLength);

          if (nextInput) nextInput.focus();
        }
      }

      if (focusIDOnEmpty && event.target.value.length <= 0) {
        const nextInput = document.getElementById(focusIDOnEmpty);

        event.stopPropagation();
        if (nextInput) nextInput.focus();
      }

      // This will fix maxLength not working when type is number
      if (props.maxLength && event.target.value.length > props.maxLength) {
        event.stopPropagation();
      } else {
        setLocalValue(event.target.value);
        onChange?.(event);
      }
    };

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
      event,
    ) => {
      onBlur?.(event);
    };

    return (
      <div
        className={`${styles.input} ${error ? styles.input__error : ''}`}
        onClick={() => inputRef.current?.focus()}
        data-testid="Input"
      >
        {prefix && <div className={styles.inputPrefix}>{prefix}</div>}
        <div
          className={`${styles.inputContainer} ${
            props.containerClassName ? props.containerClassName : ''
          } ${customInput ? styles.inputContainer__customInput : ''}`}
        >
          {inputPrefix}
          {customInput ?? (
            <input
              data-testid={name}
              ref={inputRef}
              id={name}
              type={inputType}
              name={name}
              className={styles.inputElement}
              value={localValue}
              placeholder={placeholder}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              aria-invalid={error}
              aria-labelledby={`${name}-label ${name}-subText`}
              min={min}
              max={max}
              {...props}
            />
          )}
          {inputSuffix}
        </div>
        {suffix && <div className={styles.inputSuffix}>{suffix}</div>}
        {tooltip && (
          <div className={styles.tooltip}>
            <div className={styles.tooltipTriangle} />
            <div className={styles.tooltipBox}>{tooltip}</div>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = Input.name;

export default Input;
