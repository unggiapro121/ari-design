import { Select } from 'antd';
import clsx from 'clsx';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { forwardRef, useEffect, useState } from 'react';

import Input from '../Input/Input';
import Loading from '../Loading/Loading';
import Typography from '../Typography/Typography';

import styles from './DropdownSearch.module.scss';

export interface DropDownSearchOptionInterface {
  label: string;
  value:
  | string
  | string[]
  | DropDownSearchOptionInterface
  | DropDownSearchOptionInterface[];
  disabled?: boolean;
}

export interface DropdownSearchProps {
  type?: 'dropdown' | 'search';
  filterOptions?: boolean;
  searchOptions?: boolean;
  placeholder?: string;
  data?: DropDownSearchOptionInterface[] | string[];
  value?: string;
  onSearch?: (value: string) => void;
  onChange?: (value?: string) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  isOpen?: boolean;
  error?: boolean;
  loading?: boolean;
  selectMultiple?: boolean;
  showFooter?: boolean;
  footerLabel?: string;
  footerActionLabel?: string;
  footerActionOnCLick?: () => void;
  textOverflow?: 'ellipsis' | 'normal';
  allowClear?: boolean;
}

const Option = Select.Option;
const OptGroup = Select.OptGroup;

/**
 * Dropdown component with search filter wrapper around antd Select. refer to https://ant.design/components/select for further documentation
 * @param type Determines the icon used, Dropdown chevron or Search magnifier
 * @param filterOptions Filter over existing dataset presenting the filtered list to select from
 * @param searchOptions Custom search functionality based on query.  When used must return new data
 * @param data The array of options to display.  Can be a string array, or array of Options {label; value;}
 * @param value Value to display when the component renders
 * @param onSearch Function emitted on each char entered
 * @param onChange Function emitted on option selected
 * @param onBlur Function emitted on blur of input
 * @param error Whether or not the dropdown has an error
 * @param loading Show loading animation
 * @param showFooter Show footer in options dropdown
 * @param footerLabel Label for footer
 * @param footerActionLabel Label for button in footer
 * @param footerActionOnCLick Event emitted for button in footer
 */
const DropdownSearch = forwardRef<HTMLDivElement, DropdownSearchProps>(
  (
    {
      type = 'dropdown',
      filterOptions,
      searchOptions,
      placeholder = 'Search to select',
      onSearch,
      data,
      value,
      onChange,
      onBlur,
      isOpen,
      loading,
      selectMultiple,
      showFooter,
      footerLabel,
      footerActionLabel,
      footerActionOnCLick,
      textOverflow = 'ellipsis',
      allowClear = true,
      ...props
    }: DropdownSearchProps,
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const showFooterPanel =
      (showFooter === undefined && selectMultiple) || showFooter;

    const getDataOptions: any = (
      data: DropDownSearchOptionInterface[] | string[],
      parent: string,
      hasParent: boolean,
      hasGrandParent: boolean,
    ) => {
      const isObjOption = typeof data?.[0] === 'object';

      const dataOptions = isObjOption ?
        (data as DropDownSearchOptionInterface[]) :
        [];
      const stringOptions =
        !isObjOption && Array.isArray(data) ? (data as string[]) : [];
      const optionClassName = clsx(
        hasParent && styles.dropdownsearchGroupItem,
        hasGrandParent && styles.dropdownsearchGroupItem__tier2,
      );
      const groupClassName = clsx(
        styles.dropdownsearchGroup,
        hasParent && styles.dropdownsearchGroup__tier2,
      );

      return isObjOption ?
        dataOptions.map((item: DropDownSearchOptionInterface) => {
          const { label, value, disabled } = item;
          const groupKey = `group${parent}${label.replaceAll(/\s*/g, '')}`;
          const hasChildren = Array.isArray(value);
          const otherChildren = hasChildren && getDataOptions(value, groupKey, true, hasParent);

          return hasChildren ? (
            <React.Fragment key={groupKey}>
              <OptGroup
                label={<span className={groupClassName}>{label}</span>}
              />{' '}
              {otherChildren}{' '}
            </React.Fragment>
          ) : (
            <Option
              className={optionClassName}
              key={`${parent}${typeof value === 'string' ? value.replaceAll(/\s*/g, '') : ''}`}
              value={value}
              disabled={disabled}
            >
              {label}
            </Option>
          );
        }) :
        stringOptions.map((value: string) => {
          return (
            <Option
              className={optionClassName}
              key={`${parent}${value.replaceAll(/\s*/g, '')}`}
              value={value}
            >
              {value}
            </Option>
          );
        });
    };

    const options = getDataOptions(data, '');

    const handleChange = (newValue?: string) => {
      setSelectedValue(newValue);
      onChange?.(newValue);
    };

    const handleSearch = (query: string) => {
      onSearch?.(query);
    };

    const getAllValues: any = (
      options: DropDownSearchOptionInterface[] | string[],
    ) => {
      return options?.map((option) =>
        typeof option === 'object' ?
          Array.isArray(option) ?
            getAllValues(
              option.value as DropDownSearchOptionInterface[] | string[],
            ) :
            option.value :
          option);
    };

    const handleSelectAll = () => {
      const allValues = getAllValues(data);

      setSelectedValue(allValues);

      footerActionOnCLick && footerActionOnCLick();
    };

    const getOptionFooter = () => {
      const label =
        footerLabel || selectMultiple ?
          `${selectedValue ? selectedValue?.length : 0} option(s) selected` :
          '[footerActionLabel not set]';
      const buttonLabel =
        footerActionLabel || selectMultiple ? 'Select All' : undefined;

      return (
        <div className={styles.dropdownsearchFooter}>
          <Typography component="p" style={{ margin: 0 }}>
            {label}
          </Typography>
          {buttonLabel && (
            <button
              className={styles.dropdownsearchButton}
              onClick={selectMultiple ? handleSelectAll : footerActionOnCLick}
            >
              <Typography component="p" style={{ margin: 0 }}>
                {buttonLabel}
              </Typography>
            </button>
          )}
        </div>
      );
    };

    useEffect(() => {
      // Reset back to initial state if selected value is set, but options have changed omitting selected value
      let doReset =
        typeof value === 'string' ?
          options?.some((x: any) => value === x.props.value) :
          false;

      // If any of the values are not included in the available options, reset this component
      typeof value !== 'string' &&
        !!value &&
        (value as Array<any>)?.every((val: any) => {
          if (!options.some((x: any) => val === x.props.value)) {
            doReset = true;

            return;
          }
        });

      if (doReset) {
        setSelectedValue(undefined);
      }
    }, [JSON.stringify(data)]);

    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const ClearIcon = (
      <button
        onMouseDown={() => handleChange('')}
        className={`${styles.dropdownsearchIcon} ${styles.dropdownsearchIcon__clear}`}
      />
    );

    const tagRender = (props: CustomTagProps) => {
      // eslint-disable-next-line react/prop-types
      const { label, closable, onClose } = props;
      const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
      };

      return (
        <div
          onMouseDown={onPreventMouseDown}
          style={{ marginRight: 3 }}
          className={styles.dropdownsearchTag}
        >
          <Typography component="span">
            {label}
          </Typography>
          {closable && <button onClick={onClose} />}
        </div>
      );
    };

    return (
      <div className={`${styles.dropdownsearch}`} ref={ref}>
        <Input
          error={props.error}
          containerClassName={clsx(styles.dropdownsearchInput, !selectMultiple && styles.dropdownsearchTextOverflow)}
          inputSuffix={
            (selectedValue && selectedValue.length > 0 && allowClear) ? (
              ClearIcon
            ) : (
              <div
                className={`${styles.dropdownsearchIcon} ${styles[`dropdownsearchIcon__${type}`]}`}
              />
            )
          }
          customInput={
            <>
              <Select
                value={selectedValue}
                bordered={false}
                placeholder={placeholder}
                showArrow={false}
                open={isOpen}
                notFoundContent={
                  (data?.length === 0 && !loading) && (
                    <div className={styles.dropdownsearchNoContent}>
                      No results found
                    </div>
                  )
                }
                showSearch={filterOptions || searchOptions}
                optionFilterProp={'children'}
                filterOption={filterOptions}
                onChange={handleChange}
                onSearch={handleSearch}
                onBlur={onBlur}
                mode={selectMultiple ? 'multiple' : undefined}
                allowClear={false}
                dropdownRender={(originNode) => (
                  <>
                    {originNode} {showFooterPanel && getOptionFooter()}
                  </>
                )}
                menuItemSelectedIcon={
                  <div className={styles.dropdownsearchSelectedIcon} />
                }
                // removeIcon={<div className={styles.dropdownsearchRemoveIcon} />}
                // clearIcon={<div className={`${styles.dropdownsearchRemoveIcon} ${styles.dropdownsearchRemoveIcon__clear}`} />}
                virtual={false}
                popupClassName={clsx(styles.antddropdownsearchSelectPopup, textOverflow === 'normal' && styles.antddropdownsearchSelectOptionsOverflowNormal)}
                tagRender={tagRender}
                {...props}
                className={styles.antddropdownsearchSelect}
              >
                {options}
              </Select>
              {loading && (
                <div className={styles.dropdownsearchLoading}>
                  <Loading type='indeterminate'  />
                </div>
              )}
            </>
          }
        />
      </div>
    );
  },
);

DropdownSearch.displayName = DropdownSearch.name;

export default DropdownSearch;
