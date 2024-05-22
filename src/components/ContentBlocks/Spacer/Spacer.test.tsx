import { render } from '@testing-library/react';
import React from 'react';

import Spacer, { SpacerProps } from './Spacer';
import { VerticalSpace as Story } from './Spacer.stories';

describe('ImageFeature component', () => {
  const props = Story.args as SpacerProps;

  test('renders', () => {
    const spacer = render(<Spacer {...props} />);

    expect(spacer.getByTestId('Spacer')).toBeTruthy();
  });
});
