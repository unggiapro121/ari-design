import { render } from '@testing-library/react';
import React from 'react';

import Alert, { AlertProps } from './Alert';
import { Info } from './Alert.stories';

describe('Alert component', () => {
  test('renders info alert', () => {
    const testProps = Info.args as AlertProps;
    const alertBar = render(<Alert {...testProps} />);

    expect(alertBar.getByTestId('Alert')).toBeTruthy();
  });
});
