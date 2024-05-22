import React from 'react';
import renderer from 'react-test-renderer';

import CardIcon from './CardIcon';

describe('CardIcon component', () => {
  test('does render correctly', () => {
    const component = renderer.create(<CardIcon url={'./../../../assets/placeholder/hero-birdseye.webp'}/>).toJSON();

    expect(component).toMatchSnapshot();
  });

});
