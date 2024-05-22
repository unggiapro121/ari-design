import { render } from '@testing-library/react';
import React from 'react';

import { Large } from './CarouselBlock.stories';

describe('Carousel content block component', () => {
  test('renders story', () => {
    const story = render(<Large {...Large.args} />);

    expect(story.getByTestId('CarouselContentBlock')).toBeTruthy();
    expect(story.getAllByRole('tabpanel').length).toEqual(12);
    expect(story.getAllByRole('heading')[2].textContent).toEqual('Descriptive title 3');
  });
});
