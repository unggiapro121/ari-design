import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import { vi } from 'vitest';

import Autocomplete, { AutocompleteItem } from './Autocomplete';

describe('Autocomplete', () => {
  const testOptions: AutocompleteItem[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Cherry', value: 3 },
    { label: 'Date', value: 4 },
    { label: 'Fig', value: 5 },
  ];

  it('renders without crashing', () => {
    render(<Autocomplete id="autocomplete-test" options={testOptions} />);
  });

  it('filters options based on input value', async () => {
    const { findByRole, getByRole, getByTestId } = render(
      <Autocomplete id="autocomplete-test" options={testOptions} />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });

    const dropdown = await findByRole('listbox');

    expect(dropdown).toBeInTheDocument();

    // Wait for the list items to update
    await waitFor(() => {
      const items = getByTestId(
        'autocomplete-test-autocomplete',
      ).querySelectorAll('li');

      expect(items.length).toBe(3); // Apple, Banana, Date
    });
  });

  it('selects an option and updates the input value', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete id="autocomplete-test" options={testOptions} />,
    );

    const input = getByRole('combobox') as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });

    const dropdown = getByRole('listbox');

    expect(dropdown).toBeInTheDocument();

    // Select an option from the dropdown
    const optionToSelect = getByText('Apple');

    fireEvent.click(optionToSelect);

    // Check if the input value has been updated
    expect(input.value).toBe('Apple');
  });

  it('allows clearing the selected value', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete id="autocomplete-test" options={testOptions} />,
    );

    const input = getByRole('combobox') as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });

    const dropdown = getByRole('listbox');

    expect(dropdown).toBeInTheDocument();

    // Select an option from the dropdown
    const optionToSelect = getByText('Apple');

    fireEvent.click(optionToSelect);

    // Clear the selected value
    fireEvent.change(input, { target: { value: '' } });

    // Check if the input value has been cleared
    expect(input.value).toBe('');
  });

  it('supports ref forwarding', () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Autocomplete id="autocomplete-test" options={testOptions} ref={ref} />,
    );
    expect(ref.current).not.toBeNull();
  });

  it('displays a custom footer when provided', () => {
    const CustomFooter = () => <div>Custom Footer</div>;

    const { getByRole, getByText } = render(
      <Autocomplete
        id="autocomplete-test"
        options={testOptions}
        customFooter={CustomFooter}
      />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });

    expect(getByText('Custom Footer')).toBeInTheDocument();
  });

  it('displays a custom empty item when no options are available', async () => {
    const CustomEmptyItem = () => <div>No results to display</div>;

    const { getByRole, findByText } = render(
      <Autocomplete
        id="autocomplete-test"
        options={testOptions}
        customEmptyItem={CustomEmptyItem}
        showEmptyItem
      />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'xyz' } });

    expect(await findByText('No results to display')).toBeInTheDocument();
  });

  it('calls onInputChange and onChange prop functions', async () => {
    const handleInputChange = vi.fn();
    const handleChange = vi.fn();

    const { getByRole, getByText } = render(
      <Autocomplete
        id="autocomplete-test"
        options={testOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });

    expect(handleInputChange).toHaveBeenCalled();

    const optionToSelect = getByText('Apple');

    fireEvent.click(optionToSelect);

    expect(handleChange).toHaveBeenCalled();
  });

  it('respects the minSearchLength prop', async () => {
    const { getByRole, queryByRole } = render(
      <Autocomplete
        id="autocomplete-test"
        options={testOptions}
        minSearchLength={3}
      />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ap' } });

    expect(queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'app' } });

    expect(queryByRole('listbox')).toBeInTheDocument();
  });

  it('navigates options using arrow keys', async () => {
    const { getByRole, getByTestId } = render(
      <Autocomplete id="autocomplete" options={testOptions} />,
    );

    const input = getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });

    const dropdown = getByRole('listbox');

    expect(dropdown).toBeInTheDocument();

    const appleOption = getByTestId('autocomplete-option-0');

    expect(appleOption).not.toHaveFocus();

    // Navigate using arrow down key
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(appleOption).toHaveFocus();
  });
});
