import { render } from '@testing-library/react';
import React from 'react';

import { HeroContentPromotion, HeroContentQuicklinks, HeroFull, HeroHalf, HeroProps } from './Hero';
import { Full as StoryFull, FullWithQuickLinks as StoryFullQuickLinks, HalfWithPanel as StoryHalf, HalfWithQuickLinks as StoryHalfQuickLinks } from './Hero.stories';

describe('Hero component', () => {
  test('renders full hero', () => {
    const args = StoryFull.args as HeroProps;
    const hero = render(<HeroFull {...args} />);

    expect(hero.getByTestId('Hero')).toBeTruthy();
    expect(hero.getByRole('heading').textContent).toEqual(args.headline);
    expect(hero.getByRole('button').textContent).toEqual('Button Text');
  });

  test('renders half hero with panel', () => {
    const args = StoryHalf.args as HeroProps;
    const panelContent = args.panelContent as HeroContentPromotion;
    const hero = render(<HeroHalf {...args} />);
    const links = hero.getAllByRole('link');

    expect(hero.getByTestId('Hero')).toBeTruthy();

    expect(hero.getByText(panelContent.heading)).toBeTruthy();
    expect(links[links.length - 1].textContent).toEqual(panelContent.linkText);
  });

  test('renders half hero with quick links', () => {
    const args = StoryHalfQuickLinks.args as HeroProps;
    const panelContent = args.panelContent as HeroContentQuicklinks;
    const hero = render(<HeroHalf {...args} />);
    const lists = hero.getAllByRole('list');

    expect(hero.getByTestId('Hero')).toBeTruthy();
    expect(hero.getByText(panelContent.heading)).toBeTruthy();
    expect(lists.length).toBe(2);

    const panelList = lists[1];

    expect(panelList.childElementCount).toBe(panelContent.links.length);
    expect(panelList.firstElementChild?.textContent).toEqual(panelContent.links[0].linkText);
  });

  test('renders full hero with quick links', () => {
    const args = StoryFullQuickLinks.args as HeroProps;
    const panelContent = args.panelContent as HeroContentQuicklinks;
    const hero = render(<HeroHalf {...args} />);

    expect(hero.getByTestId('Hero')).toBeTruthy();

    expect(hero.getByText(panelContent.heading)).toBeTruthy();
    expect(hero.getAllByRole('listitem').length).toBe(panelContent.links.length);
    expect(hero.getAllByRole('listitem')[0].textContent).toEqual(panelContent.links[0].linkText);
  });
});
