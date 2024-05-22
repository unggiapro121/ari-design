import { render } from '@testing-library/react';
import React from 'react';

import CallToAction, { CallToActionProps } from './CallToAction';
import { WithImage as Story } from './CallToAction.stories';

describe('ImageFeature component', () => {
  const props = Story.args as CallToActionProps;

  test('renders', () => {
    const cta = render(<CallToAction {...props} />);

    expect(cta.getByTestId('CallToAction')).toBeTruthy();
    expect(cta.getByRole('heading').textContent).toEqual(props.headline);
    expect(cta.getByRole('link').textContent).toEqual(props.link.title);
  });
});
