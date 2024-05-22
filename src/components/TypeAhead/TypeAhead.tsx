import { default as lodashDebounce } from 'lodash.debounce';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Autocomplete from '../Autocomplete/Autocomplete';
import Input, { InputProps } from '../Input/Input';
import Loading from '../Loading/Loading';

import styles from './TypeAhead.module.scss';

export interface TypeAheadItem {
  label: string;
  input?: string; // Optionally pass an alternate value to the input on select otherwise the label is used
  value: any;
}

export type TypeAheadItemRenderer = (
  itemLabel: string,
  key: number,
  onClick: () => void,
  isSelected: boolean
) => React.ReactNode;

interface TypeAheadExtraProps {
  /**
   * Time (in ms) before handler is run after typing
   */
  debounce?: number;
  /**
   * Number of character before handler is run
   */
  minBounce?: number;
  /**
   * Handle incoming and outgoing data
   */
  handler: (input?: string) => TypeAheadItem[];
  /**
   * Override how items are rendered
   */
  itemRenderer?: TypeAheadItemRenderer;
  /**
   * Override how no results are rendered
   */
  noResultRenderer?: React.ReactNode | string;
  /**
   * On item selected (item value)
   */
  onSelect?: (item: TypeAheadItem | undefined) => void;
  /**
   * Set selected item
   */
  selected?: TypeAheadItem;
  /**
   * Run when loading/calculating results from async calls
   */
  onLoading?: (isLoading: boolean) => void;
  /**
   * On input field change
   */
  onInputChange?: (input: string | undefined) => void;
  /**
   * Value of the input field
   */
  inputValue?: string;
  /**
   * On click no result item
   */
  onClickNoResult?: () => void;
  /**
   * Default Value
   */
  defaultValue?: TypeAheadItem;
  /**
   * Max amount of items to display at once
   */
  maxItems?: number;
  /**
   * Max height of dropdown. @default 325px
   */
  dropdownMaxHeight?: number;
}

const defaultItemRenderer: TypeAheadItemRenderer = (
  itemLabel,
  key,
  onClick,
  isSelected,
) => {
  return (
    <div
      key={key}
      onClick={onClick}
      className={`${styles.typeaheadItem} ${
        isSelected ? styles.typeaheadItem__selected : null
      }`}
    >
      {itemLabel}
    </div>
  );
};

export type TypeAheadProps = TypeAheadExtraProps &
  Omit<InputProps, 'onChange' | 'value' | 'name' | 'placeholder'>;

/**
 * ENRG-67 Ampol TypeAhead Component
 * @deprecated Use {@link Autocomplete} component instead
 * @param debounce Time (in ms) before handler is run after typing
 * @param minBounce Number of character before handler is run
 * @param handler Handle incoming and outgoing data
 * @param itemRenderer Override how items are rendered
 * @param noResultRenderer Override how no results are rendered
 * @param onSelect On item selected (item value)
 * @param selected Set selected item
 * @param onLoading Run when loading/calculating results from async calls
 * @param onInputChange On input field change
 * @param onClickNoResult On click no result item
 * @param onBlur On input focus lost
 * @param defaultValue Default Value
 * @param maxItems Max amount of items to display at once
 * @param maxHeight Max height of the dropdown @default 325px
 */
const TypeAhead = forwardRef<HTMLInputElement, TypeAheadProps>(({
  debounce,
  minBounce = 0,
  maxItems,
  handler,
  itemRenderer = defaultItemRenderer,
  noResultRenderer = 'No results found',
  defaultValue,
  inputValue,
  onInputChange,
  onSelect,
  onLoading,
  onClickNoResult,
  onBlur,
  dropdownMaxHeight: maxHeight = 325,
  ...props
}: TypeAheadProps, inputRef) => {
  const defaultSelectedValue = useMemo(() => {
    return defaultValue;
  }, [defaultValue]);

  const [results, setResults] = useState<TypeAheadItem[]>([]);
  const [selected, setSelected] =
    useState<TypeAheadItem | undefined>(defaultSelectedValue);
  const [localValue, setLocalValue] = useState<string | undefined>(
    defaultSelectedValue?.label,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, isLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  if (debounce) {
    const debounceResults = useCallback(
      lodashDebounce(async () => {
        await requestResults(localValue);
      }, debounce),
      [localValue],
    );

    useEffect(() => {
      if (localValue === undefined) return;

      setIsOpen(false); // TODO: is this needed?
      debounceResults();

      return () => {
        debounceResults.cancel();
      };
    }, [localValue]);
  }

  useEffect(() => {
    if (!props.selected) return;

    setLocalValue(
      props.selected.input ? props.selected.input : props.selected.label,
    );
    setSelected(props.selected);
  }, [props.selected]);

  useEffect(() => {
    if (typeof inputValue === 'undefined') return;

    setLocalValue(inputValue);
    onInputChange?.(inputValue);
  }, [inputValue]);

  const requestResults = async (input: string | undefined) => {
    if (selected) return;

    const definedInput = input ?? '';

    if (definedInput.length < minBounce) return;

    isLoading(true);
    onLoading?.(true);
    setResults(await handler(definedInput));
    isLoading(false);
    onLoading?.(false);
    open();
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    async (event) => {
      const input = event.target.value;

      onInputChange?.(input);

      // if the value changes when there is currently a selection, clear the selection
      if (selected) {
        setSelected(undefined);
        onSelect?.(undefined);
      }

      setLocalValue(input);
      debounce ?? (await requestResults(input));
    };

  const onItemClickHandler = async (item: TypeAheadItem) => {
    onSelect?.(item);
    setSelected(item);
    setLocalValue(item.input ? item.input : item.label);
    setResults(await handler(item.input ? item.input : item.label));
    close();
  };

  const onInputSelected = async () => {
    requestResults(localValue);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const renderResults = () => {
    if (loading) return;

    const slicedResults = maxItems ? results.slice(0, maxItems) : results;

    const items = !results.length ? (
      <div
        className={styles.typeaheadItem}
        onClick={() => {
          onClickNoResult?.();
          close();
        }}
      >
        {noResultRenderer}
      </div>
    ) : (
      slicedResults.map((item, index) =>
        itemRenderer(
          item.label,
          index,
          () => onItemClickHandler(item),
          item.label === selected?.label,
        ))
    );

    return (
      <div
        style={{ maxHeight: `${maxHeight}px` }}
        className={`${styles.typeaheadResults} ${
          isOpen ? styles.typeaheadResults__active : null
        }`}
      >
        {items}
      </div>
    );
  };

  return (
    <div
      className={styles.typeahead}
      ref={ref}
      onFocus={onInputSelected}
      data-testid="TypeAhead"
    >
      <div className={styles.typeAheadInput}>
        <Input
          onChange={inputOnChangeHandler}
          onBlur={onBlur}
          value={localValue}
          autoComplete={'off'}
          ref={inputRef}
          {...props}
        />
      </div>
      {loading ? (
        <div className={styles.typeaheadLoading}>
          <Loading />
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );
});

TypeAhead.displayName = TypeAhead.name;

export default TypeAhead;
