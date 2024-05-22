import clsx from 'clsx';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import styles from './Dropdown.module.scss';

export interface DropDownValueInterface {
  label: string;
  value: string;
}

export interface DropdownProps {
  name: string;
  options?: DropDownValueInterface[];
  /**
   * @deprecated Use defaultValue instead
   */
  defaultOption?: DropDownValueInterface;
  defaultValue?: string;
  placeHolder?: string;
  option?: DropDownValueInterface;
  onChange?: any;
  onBlur?: any;
  error?: boolean;
  textOverflow?: 'ellipsis' | 'normal';
}

/**
 * Ampol dropdown input
 * @param name Unique identifier
 * @param options Array of DropDownOptionInterface
 * @param defaultOption [Deprecated: use defaultValue instead] Default selected option
 * @param defaultValue Default selected value
 * @param placeHolder Placeholder text for dropdown
 * @param onChange Event triggered when dropdown selection changes
 * @param onBlur Event triggered when dropdown focus is lost
 * @param option Currently selected option
 * @param error Whether or not the dropdown has an error
 */
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  name,
  options,
  defaultOption,
  defaultValue,
  onChange,
  onBlur,
  error,
  placeHolder,
  option,
  textOverflow = 'ellipsis',
}: DropdownProps, forwardedRef) => {
  interface StateInterface {
    selectedValue: string;
    selectedLabel: string;
  }

  const selectedOption: DropDownValueInterface | string | undefined =
    defaultOption ?? defaultValue ?? option;

  // Set default option if value is passed in as str or object
  const defaultSelectedOption = useMemo(
    () =>
      !!selectedOption && typeof selectedOption === 'string' ?
        options?.find((opt) => opt.value === selectedOption) :
        (selectedOption as DropDownValueInterface | undefined),
    [defaultOption, defaultValue, option],
  );

  const initialState = {
    selectedValue: defaultSelectedOption?.value ?? '',
    selectedLabel:
      defaultSelectedOption?.label ?? placeHolder ?? 'Please Select...',
  };

  const [state, setState] = useState<StateInterface>(initialState);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);
  const componentId = `${name}-dropdown`;

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleClick = () => {
    setOpen(!open);
    document.getElementById(`${componentId}-dropdown-options`)?.focus();
  };

  const handleChange = () => {
    onChange?.({ target: { value: state.selectedValue } });
  };

  const handleCustomChange = (e: any) => {
    const selectedOption = e.target;

    setState({
      selectedLabel: selectedOption.innerText,
      selectedValue: selectedOption.getAttribute('data-value'),
    });
    setOpen(false);
  };

  const handleNativeChange = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    setState({
      selectedLabel: selectedOption.text,
      selectedValue: e.target.value,
    });
    setOpen(false);
  };

  const handleBlur = (e: any) => {
    setOpen(false);
    onBlur?.(e);
  };

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    handleChange();
  }, [state.selectedValue]);

  useEffect(() => {
    // Reset back to initial state if selected value is set, but options have changed omitting selected value
    if (
      !!state.selectedValue &&
      !options?.some((x) => x.value === state.selectedValue)
    ) {
      setState(initialState);
    }
  }, [options]);

  useEffect(() => {
    setState(initialState);
  }, [defaultSelectedOption]);

  return (
    <div
      className={`${styles.dropdown} ${error && styles.dropdown__error}`}
      ref={ref}
      onBlur={() => handleBlur}
      data-testid="Dropdown"
    >
      <select
        id={componentId}
        data-testid={`${componentId}-native`}
        className={styles.dropdownNative}
        value={state.selectedValue}
        onChange={handleNativeChange}
        onBlur={handleBlur}
      >
        {!state.selectedValue && (
          <option value="">{state.selectedLabel}</option>
        )}
        {options?.map((option: any, index: number) => {
          return (
            <option key={`${componentId}-native-${index}`} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <div
        data-testid={`${componentId}-custom`}
        className={`${styles.dropdownCustom} ${
          open ? styles.dropdownCustom__active : ''
        }`}
        aria-hidden={true}
      >
        <div
          data-testid={`${componentId}-custom-trigger`}
          className={styles.dropdownTrigger}
          onClick={handleClick}
        >
          <span className={styles.dropdownValue}>{state.selectedLabel}</span>
        </div>
        <div
          id={`${componentId}-dropdown-options`}
          className={styles.dropdownOptions}
          tabIndex={-1}
          aria-hidden={true}
        >
          {options?.map((option: any, index: number) => {
            return (
              <div
                key={`${componentId}-custom-${index}`}
                className= {clsx(styles.dropdownOption, state.selectedLabel === option.label && styles.dropdownOption__active, textOverflow === 'normal' && styles.dropdownOption__overflowNormal)}
                data-value={option.value}
                onClick={(e) => handleCustomChange(e)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

Dropdown.displayName = Dropdown.name;

export default Dropdown;
