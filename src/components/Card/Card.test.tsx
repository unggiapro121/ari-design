import React from 'react';
import renderer from 'react-test-renderer';

import Card from './Card';

describe('Card component', () => {
  test('does render correctly', () => {
    const component = renderer.create(<Card><h1> I'm a card! </h1></Card>).toJSON();

    expect(component).toMatchSnapshot();
  });
});
