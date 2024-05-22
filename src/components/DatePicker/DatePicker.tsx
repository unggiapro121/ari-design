import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { forwardRef, useEffect, useState } from 'react';

import Input, { InputProps } from '../Input/Input';

import styles from './DatePicker.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DatePickerExtraProps {
  // Additional props for Antd DatePicker
  onChange?: (date: string | null) => void;
  value?: Dayjs | string;
  format?: string;
  disabledDate?: (current: Dayjs) => boolean;
}

export type DatePickerProps = Omit<
  AntDatePickerProps,
  'onChange' | 'allowClear' | 'clearIcon' | 'disabledDate'
> &
  DatePickerExtraProps &
  Omit<InputProps, 'onChange'>;

/**
 * ENRG-130 Ampol style date picker field using Ant Design DatePicker
 * refer to https://ant.design/components/date-picker/ for further documentation
 */
const DatePicker = forwardRef<any, DatePickerProps>(
  (
    {
      format = 'D/M/YYYY',
      onChange,
      onBlur,
      placeholder = '',
      value,
      disabledDate,
      ...props
    }: DatePickerProps,
    ref,
  ) => {
    const [localValue, setLocalValue] = useState<Dayjs | null>(null);

    useEffect(() => {
      setLocalValue(formatValue(value ?? null));
    }, [value]);

    const onChangeHandler = (date: Dayjs | null) => {
      onChange?.(date?.format(format) ?? null);
      setLocalValue(date);
    };

    const formatValue = (inputValue: Dayjs | string | null) => {
      if (typeof inputValue === 'string') return dayjs(inputValue, format);
      else return inputValue as Dayjs;
    };

    // Augments the antd input to automatically select valid dates
    // without the need to press enter to confirm them, as well as
    // automatically formatting DD/MM/YYYY dates to the format specified
    const handleInputChangeProps = (
      props: React.InputHTMLAttributes<HTMLInputElement>,
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      // Trigger props delegate from ANT DatePicker
      props.onChange?.(e);

      let parsedDate = dayjs(e.target.value, 'DD/MM/YYYY', true);

      // Check if the value is a valid DD/MM/YYYY date
      if (!parsedDate.isValid()) {
        parsedDate = dayjs(e.target.value, format, true);
      }

      // Check if the value is a valid date in general and if it passes disabledDate rules
      if (parsedDate.isValid() && !disabledDate?.(parsedDate)) {
        onChangeHandler(parsedDate);
      }
    };

    return (
      <div className={`${styles.datepicker}`} data-testid="DatePicker">
        <Input
          inputSuffix={
            localValue ? (
              <button
                onClick={() => onChangeHandler(null)}
                className={styles.antDatePickerClear}
              />
            ) : (
              <></>
            )
          }
          customInput={
            <AntDatePicker
              onChange={onChangeHandler}
              onBlur={onBlur}
              suffixIcon={<div />}
              dropdownClassName={styles.antDatePickerDropdown}
              getPopupContainer={(trigger: HTMLElement) => trigger.parentElement as HTMLElement}
              inputRender={(props) => (
                <input
                  {...props}
                  onChange={(e) => handleInputChangeProps(props, e)}
                  ref={ref}
                />
              )}
              disabledDate={disabledDate}
              format={format}
              value={localValue}
              allowClear={false}
              placeholder={placeholder}
              name={props.name}
              {...props}
              className={styles.antDatePicker}
            />
          }
          {...props}
        />
      </div>
    );
  },
);

DatePicker.displayName = DatePicker.name;

export default DatePicker;
