import { render, screen } from '@testing-library/react';
import React from 'react';

import ReadonlyField, { ReadonlyInputProps } from './ReadonlyField';

type InputType = ReadonlyInputProps['type'];
type Override = { type: InputType; expected: string; checked?: boolean };

describe('ReadOnlyField', () => {
  const overrides: Override[] = [
    { type: 'dropdown', expected: 'Dropdown' },
    { type: 'radio', expected: 'Radiobutton', checked: true },
    { type: 'checkbox', expected: 'Checkbox', checked: true },
  ];

  test('renders', () => {
    render(<ReadonlyField value='Test' />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test.each<InputType>(['checkbox', 'radio'])(
    'does not render for type: %s',
    (type) => {
      render(<ReadonlyField type={type} />);

      const { childElementCount } = screen.getByTestId('ReadonlyField');

      expect(childElementCount).toEqual(0);
    },
  );

  test.each<Override>(overrides)(
    'applies style overrides by type: $type',
    ({ expected, ...props }) => {
      render(<ReadonlyField {...props} />);

      const el = screen.getByTestId('ReadonlyField');

      if (props.checked) {
        expect(el).toHaveAttribute(
          'class',
          expect.stringContaining('__checked'),
        );
      }

      expect(el).toHaveAttribute('class', expect.stringContaining(expected));
    },
  );
});
