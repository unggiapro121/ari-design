import { default as lodashDebounce } from 'lodash.debounce';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useKeyboard } from 'react-aria';

import useDetectClickOutside from '../../hooks/useDetectClickOutside';
import findNextFocusableElement from '../../util/findNextFocusableElement';
import Input, { InputProps } from '../Input/Input';
import Loading from '../Loading/Loading';

import styles from './Autocomplete.module.scss';

export interface AutocompleteItem {
  label: string;
  value: any;
}
/**
 * Default function to render dropdown items.
 */
const DefaultCustomDropdownItem = (props: ItemRendererProps) => {
  return (
    <p
      className={`${styles.defaultDropdownItem} ${
        props.isSelected ? styles.defaultDropdownItem__selected : ''
      }`}
    >
      {props.option.label}
    </p>
  );
};

/**
 * Default function to render a "No results found" message when no options are available.
 */
const DefaultCustomEmptyItem = () => {
  return <p className={styles.defaultDropdownItem}>No results found.</p>;
};

export interface AutocompleteProps<OptionType = AutocompleteItem> {
  /**
   * An array of options to display in the autocomplete dropdown
   */
  options: OptionType[];

  /**
   * A unique identifier for the component, used to associate input and listbox elements
   * for accessibility purposes
   */
  id: string;

  /**
   * The currently selected option in the component
   */
  value?: OptionType | null;

  /**
   * A callback function to be called when the selected option changes
   */
  onChange?: (option: AutocompleteItem | null) => void;

  /**
   * An optional custom search function to filter options asynchronously
   */
  customSearch?: (input: string) => Promise<OptionType[]>;

  /**
   * The current value of the input field
   */
  inputValue?: string;

  /**
   * A callback function to be called when the input value changes
   */
  onInputChange?: (input: string | undefined) => void;

  /**
   * An optional custom component to render dropdown items
   */
  customDropdownItem?: React.FC<ItemRendererProps<OptionType>>;

  /**
   * An optional custom filter function to filter options synchronously
   */
  customFilter?: (option: AutocompleteItem, input: string) => boolean;

  /**
   * A flag to indicate whether to show a custom empty item when no options are available
   */
  showEmptyItem?: boolean;

  /**
   * An optional custom component to render when no options are available
   * and showEmptyItem is true
   */
  customEmptyItem?: React.FC;

  /**
   * An optional custom component to render as the dropdown's footer
   */
  customFooter?: React.FC;

  /**
   * Optional additional props for the underlying Input component
   */
  inputProps?: Omit<InputProps, 'onChange' | 'onBlur' | 'onFocus'>;

  /**
   * The minimum length of the input value required to trigger searching
   * and displaying the dropdown
   */
  minSearchLength?: number;

  /**
   * A flag to indicate whether to hide the clear button for the input field
   */
  hideClearButton?: boolean;

  /**
   * An optional custom CSS class name to apply to the main autocomplete container
   */
  className?: string;

  /**
   * Optional custom CSS properties to apply to the main autocomplete container
   */
  style?: React.CSSProperties;

  /**
   * An optional custom CSS class name to apply to the dropdown container
   */
  dropdownClassName?: string;

  /**
   * Optional custom CSS properties to apply to the dropdown container
   */
  dropdownStyle?: React.CSSProperties;

  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * The properties for custom dropdown item rendering components.
 */
export interface ItemRendererProps<OptionType = AutocompleteItem> {
  option: OptionType;
  isSelected: boolean;
  isLast: boolean;
  isFirst: boolean;
}

/**
 * Autocomplete is a flexible and accessible type-ahead search component
 * that displays a dropdown list of options based on user input.
 *
 * A more simplistic, less error prone successor to the TypeAhead component.
 *
 * @see {@link AutocompleteProps} for available props & documentation
 */
const Autocomplete = forwardRef(
  <T extends AutocompleteItem>(
    {
      customEmptyItem = DefaultCustomEmptyItem,
      customDropdownItem = DefaultCustomDropdownItem,
      customFilter = (option, input) =>
        option.label.toLowerCase().includes(input.toLowerCase()),
      id,
      minSearchLength = 0,
      ...props
    }: AutocompleteProps<T>,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    // #region State
    const [openDropdown, setOpenDropdown] = React.useState(false);
    const [inputValue, setInputValue] = React.useState<string>(
      props.value?.label || props.inputValue || '',
    );
    const [value, setValue] = React.useState<
      AutocompleteItem | null | undefined
    >(props.value || undefined);
    const [renderOptions, setRenderOptions] = React.useState<T[]>(
      props.options,
    );
    const [loading, setLoading] = React.useState(false);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose the input element ref to parent components
    useImperativeHandle(ref, () => inputRef.current);

    // #endregion

    // #region Accessibility hooks

    // Accessibility keybinds in accordance with:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
    const { keyboardProps: inputKeyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (dropdownRef.current) {
            const firstItem = dropdownRef.current.querySelector('li');

            if (firstItem) firstItem.focus();
          }
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (dropdownRef.current) {
            const lastItem = dropdownRef.current.querySelector(
              'li:last-child',
            ) as HTMLElement;

            if (lastItem) lastItem.focus();
          }
        }

        // Focus next element after dropdown
        if (e.key === 'Tab') {
          const nextElement = findNextFocusableElement(autocompleteRef.current);

          if (nextElement) nextElement.focus();

          // Close dropdown
          setOpenDropdown(false);
        }
      },
    });

    const { keyboardProps: dropdownKeyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        const currentElement = e.target as HTMLElement;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (dropdownRef.current) {
            const nextItem = dropdownRef.current.querySelector(
              `[id="${currentElement.id}"] + li`,
            ) as HTMLElement;

            if (nextItem) nextItem.focus();
            else (dropdownRef.current.firstChild as HTMLElement).focus();
          }
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (dropdownRef.current) {
            const prevItem = currentElement.previousElementSibling as any;

            if (prevItem) prevItem.focus();
            else (dropdownRef.current.lastChild as HTMLElement).focus();
          }
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          currentElement.click();
        }
      },
    });

    // #endregion

    // #region Effects

    // Values that change to the correct value when the component is controlled/uncontrolled
    useEffect(() => {
      if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    // Values that change to the correct value when the component is controlled/uncontrolled
    useEffect(() => {
      if (props.inputValue !== undefined) setInputValue(props.inputValue);
    }, [props.inputValue]);

    useEffect(() => {
      if (inputValue === '') handleOnChange(null);
    }, [inputValue]);

    useEffect(() => {
      if (value) handleOnInputChange(value?.label ?? '');
      else if (value === null) handleOnInputChange('');
    }, [value]);

    // If we have a default value set on first render then we should activate search
    // This will help in situations where we input a default value or autofocus
    useEffect(() => {
      if (inputValue) search(inputValue);
    }, []);

    // Update our local options when the controlled props change
    useEffect(() => {
      setRenderOptions(props.options);
    }, [props.options]);

    // #endregion

    // #region Handlers

    /**
     * Function to filter options based on user input, using either the customSearch function
     * or the default customFilter function.
     */
    const search = async (input: string, openDropdownOnFinish = false) => {
      if (input.length < minSearchLength) return;

      setLoading(true);
      let currentOptions = props.options;

      if (props.customSearch)
        currentOptions = await props.customSearch?.(input);

      const filteredOptions = currentOptions.filter((option) =>
        customFilter(option, input));

      setRenderOptions(filteredOptions);
      setLoading(false);
      if (openDropdownOnFinish) setOpenDropdown(true);
    };

    /**
     * Debounced version of the search function. Automatically uses a 500ms delay when a customSearch function is provided.
     */
    const debouncedSearch = useCallback(
      lodashDebounce(search, props.customSearch ? 250 : 0),
      [],
    );

    const handleDebouncedInput: React.ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      handleOnInputChange(e.target.value);
      if (props.customSearch) setOpenDropdown(false); // Wait for search to finish before opening dropdown

      debouncedSearch(e.target.value, props.customSearch ? true : false);
    };

    const handleOnClickOutside = () => {
      setOpenDropdown(false);
      // Reset back to the selected value when the user clicks off the input
      if (value && inputValue !== value.label) handleOnInputChange(value.label);
    };

    // Our handleOnClickOutside function here will be called whenever the user clicks outside of the autocomplete component
    // `managedValue` here has been added here as a dependency so that the handleOnClickOutside function can update it's value
    useDetectClickOutside(handleOnClickOutside, autocompleteRef, [
      value,
      inputValue,
    ]);

    const handleOnInputChange = (input: string) => {
      setInputValue(input);
      props.onInputChange?.(input);
    };

    const handleOnChange = (option: AutocompleteItem | null) => {
      setValue(option);
      props.onChange?.(option);
    };

    const handleOnClickItem = (option: AutocompleteItem) => {
      handleOnChange(option);
      setOpenDropdown(false);
    };

    const handleOnFocusInput = () => {
      search(inputValue ?? '');
      setOpenDropdown(true);
    };

    const handleOnClickClear = () => {
      handleOnChange(null);
    };

    // #endregion

    const dropdownItems = renderOptions.map((option, index) => {
      const isSelected = JSON.stringify(option) === JSON.stringify(value);
      const isLast = index === renderOptions.length - 1;
      const isFirst = index === 0;

      return (
        <li
          {...dropdownKeyboardProps}
          role="option"
          id={`${id}-option-${index}`}
          key={index}
          tabIndex={0}
          aria-selected={isSelected}
          onClick={() => handleOnClickItem(option)}
          data-testid={`${id}-option-${index}`}
          className={styles.dropdownItem}
        >
          {customDropdownItem({
            option,
            isSelected,
            isFirst,
            isLast,
          })}
        </li>
      );
    });

    // Check if the dropdown should be displayed based on various conditions
    const shouldShowDropdown =
      openDropdown &&
      !loading && // not while loading
      (inputValue?.length ?? '') >= minSearchLength && // not while below the minimum search length
      (renderOptions.length > 0 || props.showEmptyItem); // not if there are no options

    return (
      <div
        className={`${styles.autocomplete} ${props.className}`}
        style={props.style}
        data-testid={`${id}-autocomplete`}
        ref={autocompleteRef}
        onBlur={props.onBlur}
      >
        <Input
          {...inputKeyboardProps}
          {...props.inputProps}
          value={inputValue}
          onFocus={handleOnFocusInput}
          onChange={handleDebouncedInput}
          inputSuffix={
            <>
              {value ? (
                <button
                  aria-label="Clear combo box"
                  onClick={handleOnClickClear}
                  className={styles.clearButton}
                />
              ) : (
                props.inputProps?.inputSuffix
              )}
            </>
          }
          id={id}
          autoComplete={'off'}
          role="combobox"
          aria-expanded={shouldShowDropdown}
          aria-autocomplete="list"
          aria-controls={`${id}-dropdown`}
          data-testid={`${id}-input`}
          ref={inputRef}
        />
        {loading && (
          <div className={styles.loading}>
            <Loading type="indeterminate" />
          </div>
        )}
        {shouldShowDropdown && (
          <>
            <div className={styles.dropdownContainer}>
              <ul
                role="listbox"
                id={`${id}-dropdown`}
                aria-label={`${id}-input`}
                className={`${styles.dropdown} ${props.dropdownClassName}`}
                style={props.dropdownStyle}
                data-testid={`${id}-dropdown`}
                ref={dropdownRef}
              >
                {dropdownItems}
                {renderOptions.length === 0 && props.showEmptyItem && (
                  <li className={styles.dropdownNotFound}>
                    {customEmptyItem({})}
                  </li>
                )}
              </ul>
              {props.customFooter && (
                <div className={styles.dropdownFooter}>
                  {props.customFooter({})}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
