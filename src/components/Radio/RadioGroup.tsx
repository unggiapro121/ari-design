import clsx from 'clsx';
import React, {
  Children,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import styles from './Radio.module.scss';

interface RadioGroupContextType {
  value?: any;
  name?: string;
  isButtonGroup?: boolean;
}

export const RadioGroupContext = React.createContext<RadioGroupContextType>({});

export interface RadioGroupProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * Name of the radio group, **not required if within a FormField**
   */
  name?: string;
  /**
   * Radio selection color
   */
  color: 'red' | 'blue' | 'black' | 'cobalt' | 'error';
  /**
   * Direction in which the radio button group will stack it's buttons
   */
  direction?: 'row' | 'column';
  /**
   * Force row to column in mobile when there are more than 2 children
   */
  overload?: boolean;
  /**
   * Visual indication of disabled button (prevents click events, does not clear value)
   */
  inactive?: boolean;
  /**
   * Callback function for when a radio button is selected
   */
  onChange?: (value: string) => void;
  /**
   * Callback function for when a radio group looses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Selected value of the radio button group
   */
  value?: string;
  /**
   * The display type of radio group
   */
  radioType?: 'button' | 'radio';
  /**
   * Direction in which radio label is displayed **only if radioType is radio**
   */
  radioLabelType?: 'left' | 'right';
  /**
   * Currently in error state
   */
  error?: boolean;
}

const Component = (
  {
    children,
    inactive = false,
    direction = 'row',
    overload = true,
    radioType = 'radio',
    color,
    error,
    className,
    name,
    style,
    onChange,
    onBlur,
    ...props
  }: PropsWithChildren<RadioGroupProps>,
  ref: React.LegacyRef<HTMLDivElement> | undefined,
) => {
  const [value, setValue] = useState<string | undefined>('');

  useEffect(() => {
    setValue(props.value);
  }, [props?.value]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  const isOverloaded = Children.count(children) > 2 && overload;
  const directionClass = `${radioType}Group__${
    direction === 'row' && isOverloaded ? 'overload' : direction
  }`;
  const colorClass = `${radioType}Group__${
    inactive ? 'inactive' : error ? 'error' : color
  }`;

  const context = { name, value, isButtonGroup: true };

  const isButton = radioType === 'button';

  const classNames = clsx(
    isButton ? styles.buttonGroup : styles.radioGroup,
    styles[directionClass],
    styles[colorClass],
    className,
  );

  return (
    <div
      className={classNames}
      style={style}
      onChange={onChangeHandler}
      onBlur={onBlur}
      ref={ref}
      data-testid="RadioGroup"
    >
      <RadioGroupContext.Provider value={context}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

/**
 * ENRG-147 Ampol Radio Group Component
 * @param children
 * @param name Name of the radio group, **not required if within a FormField**
 * @param color Radio selection color
 * @param direction Direction in which the radio group will stack it's buttons
 * @param overload Force row to column in mobile when there are more than 2 children
 * @param inactive Visual indication of disabled button (prevents click events, does not clear value)
 * @param onChange Callback function for when a radio button is selected
 * @param onBlur Callback function for when group looses focus
 * @param value Selected value of the radio group
 * @param radioType The display type of radio group
 * @param radioLabelType Direction in which radio label is displayed **only if radioType is radio**
 * @param style
 * @param className
 */
const RadioGroup = forwardRef<
  HTMLDivElement,
  PropsWithChildren<RadioGroupProps>
>(Component);

export default RadioGroup;
