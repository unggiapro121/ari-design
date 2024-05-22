import { render } from '@testing-library/react';
import React from 'react';

import { CardsWithArrows } from './Carousel.stories';

describe('Carousel component', () => {
  test('renders story', () => {
    const story = render(<CardsWithArrows options={{ type: 'slide' }} />);

    expect(story.getByTestId('Carousel')).toBeTruthy();
    expect(story.getAllByRole('tabpanel').length).toEqual(4);
    expect(story.getAllByRole('heading')[2].textContent).toEqual('Card 3');
  });

  test('snapshot of story', () => {
    const story = render(<CardsWithArrows />);

    expect(story).toMatchSnapshot();
  });

  test('has prev/next buttons', () => {
    const story = render(<CardsWithArrows />);
    const btnNext = story.getByLabelText('Next slide');
    const btnPrev = story.getByLabelText('Go to last slide');

    expect(btnNext).toBeTruthy();
    expect(btnNext?.tagName).toEqual('BUTTON');
    expect(btnPrev).toBeTruthy();
    expect(btnPrev?.tagName).toEqual('BUTTON');
  });

  test('has slide indicators', () => {
    const story = render(<CardsWithArrows />);
    const indicators = story.getByRole('tablist');
    const btns = story.getAllByRole('tab');

    expect(indicators).toBeTruthy();
    expect(btns).toBeTruthy();
    expect(btns[0].tagName).toEqual('BUTTON');
    expect(btns[0].hasAttribute('aria-selected')).toBeTruthy();
  });
});
