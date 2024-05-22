import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Dropdown from './Dropdown';

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
];

describe('Dropdown component', () => {
  test('does render', () => {
    const icon = render(<Dropdown options={options} name={'color'} placeHolder={'Select a color'} />);

    expect(icon.getByTestId('color-dropdown-native')).toBeTruthy();
    expect(icon.getByTestId('color-dropdown-custom')).toBeTruthy();
  });

  test('has correct amount of options including default option', () => {
    const icon = render(<Dropdown options={options} name={'color'} />);

    expect(icon.getByTestId('color-dropdown-native').children.length).toEqual(6);
  });

  test('has no default option once option is selected', () => {
    const icon = render(<Dropdown options={options} name={'color'} />);

    expect(icon.getByTestId('color-dropdown-native').children.length).toEqual(6);

    fireEvent.change(icon.getByTestId('color-dropdown-native'), { target: { label: 'Red', value: 'red' } });

    expect(icon.getByTestId('color-dropdown-native').children.length).toEqual(5);
  });

  test('has selected value synced between native and custom component', () => {
    const { getByTestId } = render(<Dropdown options={options} name={'color'} />);

    fireEvent.change(getByTestId('color-dropdown-native'), { target: { label: 'Green', value: 'green' } });

    const ops = getByTestId('color-dropdown-native').children;
    const customTrigger = getByTestId('color-dropdown-custom-trigger');

    expect((ops[2] as HTMLOptionElement).selected).toBe(true);
    expect(customTrigger.textContent).toEqual('Green');
  });
});
