import { render } from '@testing-library/react';
import React from 'react';

import Icon from './Icon';

describe('Icon component', () => {
  const name = 'chevron-bottom';

  test('does render', () => {
    const icon = render(<Icon name={name} />);

    expect(icon.getByTestId(`${name}-icon`)).toBeTruthy();
  });
});
