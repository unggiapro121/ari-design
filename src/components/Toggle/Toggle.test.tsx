import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Toggle from './Toggle';

describe('Toggle component', () => {

  test('should be toggled false by default', () => {
    const toggle = render(<Toggle color='blue' name="test" />);
    const toggleCheckbox = toggle.getByTestId('test-toggle') as HTMLInputElement;

    expect(toggleCheckbox.checked).toBe(false);
  });

  test('shoud be toggled true on click', () => {
    const toggle = render(<Toggle color='blue' name="test" />);

    fireEvent.click(toggle.getByTestId('test-toggle'));
    const toggleCheckbox = toggle.getByTestId('test-toggle') as HTMLInputElement;

    expect(toggleCheckbox.checked).toBe(true);
  });
});
