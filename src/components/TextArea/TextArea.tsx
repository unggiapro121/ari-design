import React, { forwardRef, useEffect, useRef, useState } from 'react';

import styles from './TextArea.module.scss';

export interface TextAreaProps {
  /**
   * The name of the input
   */
  name?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
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
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Callback for when the input focus is lost
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Rows to render (effects default height)
   */
  rows?: number;
  /**
   * Columns to render (effects default width)
   */
  cols?: number;
  /**
   * If true, will auto adjust visual height based off the content
   */
  autoResize?: boolean;
}

/**
 * Textarea input component
 * @param name Name of the input
 * @param placeholder Placeholder text
 * @param value Value of the input
 * @param error Whether the input has an error
 * @param onChange Callback for when the input changes
 * @param onBlur Callback for when the input focus is lost
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  name,
  error,
  placeholder,
  onChange,
  onBlur,
  rows,
  cols,
  autoResize,
  ...props
}: TextAreaProps, ref) => {
  const [value, setValue] = useState(props.value || '');
  const [height, setHeight] = useState(0);

  const internalRef: any = ref || useRef(null);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useEffect(() => {
    if (autoResize) {
      setHeight(internalRef.current.scrollHeight);
    }
  }, [value, autoResize]);

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={styles.textarea} data-testid="TextArea">
      <textarea
        data-testid={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
        rows={rows ? rows : 1}
        cols={cols}
        aria-invalid={error}
        aria-labelledby={`${name}-label ${name}-subText`}
        ref={internalRef}
        style={autoResize ? { height } : {}}
      />
    </div>
  );
});

TextArea.displayName = TextArea.name;

export default TextArea;
