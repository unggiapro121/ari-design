import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button from '../../Button/Button';

import { HeroFull, HeroHalf, HeroLanding } from './Hero';

export default {
  title: 'UI/Content Blocks/Hero',
  component: HeroHalf,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
  argTypes: {
    ctaButton: {
      control: 'none',
    },
  },
} as ComponentMeta<typeof HeroHalf>;

const TemplateLanding: ComponentStory<typeof HeroLanding> = (args) => <HeroLanding {...args} />;
const TemplateHalf: ComponentStory<typeof HeroHalf> = (args) => <HeroHalf {...args} />;
const TemplateFull: ComponentStory<typeof HeroFull> = (args) => <HeroFull {...args} />;

export const Landing = TemplateLanding.bind({});
Landing.args = {
  headline: 'Join Ampol Energy today and save on fuel',
  description: 'Save 10c/L on eligible fuels* for up to 1,500L per year, at over 600 participating Ampol locations^ as an Ampol Energy customer. See how to redeem below.',
  images: {
    default: {
      description: 'image description',
      url: '/placeholder/FCHero/hero-retouch.webp',
    },
    square: {
      description: 'image description',
      url: '/placeholder/FCHeroMobile/hero-retouch-mobile.webp',
    },
  },
  ctaButton: <Button variant="primary" label="Button Text" color="red" />,
  overlayTextColour: 'black',
};

export const Half = TemplateHalf.bind({});
Half.args = {
  headline: 'Powering your daily journey with the Ampol app',
  description: 'Sample description paragraph that sits in the hero.',
  images: {
    default: {
      description: 'image description',
      url: '/placeholder/HalfHero/Half_Hero_L_M.jpg',
    },
    wide: {
      description: 'image description',
      url: '/placeholder/HalfHero/Half_Hero_XL_L.jpg',
    },
  },
  ctaButton: undefined,
  breadcrumbs: [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Electricity',
      path: '/electricity',
    },
    {
      title: 'App and Fuel Discount',
    },
  ],
};

export const HalfInset = TemplateHalf.bind({});
HalfInset.args = {
  ...Half.args,
  description: undefined,
  inset: true,
};

// export const HalfWithLongContent = TemplateHalf.bind({});
// HalfWithLongContent.args = {
//   ...Half.args,
//   headline: 'Compliments and complaints',
//   description: <p>Long content</p>,
// };

export const HalfWithPanel = TemplateHalf.bind({});
HalfWithPanel.args = {
  ...Half.args,
  panelContent: {
    heading: 'Latest promotion aside',
    linkText: 'Find more info',
    linkUrl: '#',
  },
};

export const HalfWithQuickLinks = TemplateHalf.bind({});
HalfWithQuickLinks.args = {
  ...Half.args,
  panelContent: {
    heading: 'Quick links',
    links: [
      { linkText: 'Key fact description 1', linkUrl: '#' },
      { linkText: 'Key fact description 2', linkUrl: '#' },
      { linkText: 'Key fact description 3', linkUrl: '#' },
    ],
  },
};

export const Full = TemplateFull.bind({});
Full.args = {
  headline: Half.args.headline,
  description: Half.args.description,
  images: {
    default: {
      description: 'image description',
      url: '/placeholder/hero-birdseye.webp',
    },
  },
  ctaButton: <Button variant="primary" label="Button Text" color="red" />,
};

export const FullWithPanel = TemplateFull.bind({});
FullWithPanel.args = {
  ...Full.args,
  panelContent: HalfWithPanel.args.panelContent,
};

export const FullWithQuickLinks = TemplateFull.bind({});
FullWithQuickLinks.args = {
  ...Full.args,
  panelContent: {
    heading: 'Quick links',
    links: [
      { linkText: 'Key fact description 1', linkUrl: '#' },
      { linkText: 'Key fact description 2', linkUrl: '#' },
      { linkText: 'Key fact description 3', linkUrl: '#' },
      { linkText: 'Key fact description 4', linkUrl: '#' },
      { linkText: 'Key fact description 5', linkUrl: '#' },
      { linkText: 'Key fact description 6', linkUrl: '#' },
    ],
  },
};
