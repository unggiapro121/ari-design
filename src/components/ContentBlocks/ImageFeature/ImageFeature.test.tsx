import { render } from '@testing-library/react';
import React from 'react';

import Feature, { ImageFeatureProps } from './ImageFeature';
import { ImageRightWithAccent as Story } from './ImageFeature.stories';

describe('ImageFeature component', () => {
  const props = Story.args as ImageFeatureProps;

  test('renders', () => {
    const hero = render(<Feature {...props} />);

    expect(hero.getByTestId('ImageFeature')).toBeTruthy();
    expect(hero.getByRole('heading').textContent).toEqual(props.headline);
  });
});
