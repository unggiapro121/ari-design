import { render } from '@testing-library/react';
import React from 'react';

import AlertBar, { AlertBarProps } from './AlertBar';
import { Primary } from './AlertBar.stories';

describe('AlertBar component', () => {
  test('renders alert bar', () => {
    const testProps = Primary.args as AlertBarProps;
    const alertBar = render(<AlertBar {...testProps} />);

    expect(alertBar.getByTestId('AlertBar')).toBeTruthy();
  });
});
