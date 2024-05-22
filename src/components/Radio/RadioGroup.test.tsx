import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Radio, { sanitize } from './Radio';
import RadioGroup from './RadioGroup';

describe('Radio component', () => {
  test('should change value on click', () => {
    const testValue = 'D123$1`325lkasC#%^!';
    let value = '';

    render(
      <RadioGroup name={'test'} color={'red'} onChange={(v) => (value = v)}>
        <Radio value={'test1'} />
        <Radio value={testValue} />
      </RadioGroup>,
    );

    const label = document.querySelectorAll('label')[1];

    fireEvent.click(screen.getAllByRole('radio')[1]);

    expect(label).toHaveAttribute('for', expect.stringContaining(sanitize(testValue)));
    expect(value).toBe(testValue);
  });

  test('renders with overload', () => {
    const range = [...Array(3).keys()];

    render(
      <RadioGroup name={'test'} color={'red'}>
        {range.map((num) => (
          <Radio key={num} value={`${num}`} />
        ))}
      </RadioGroup>,
    );

    expect(screen.getByTestId('RadioGroup')).toHaveAttribute(
      'class',
      expect.stringContaining('overload'),
    );
  });
});
