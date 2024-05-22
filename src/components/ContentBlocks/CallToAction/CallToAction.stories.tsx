import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import CallToAction from './CallToAction';

export default {
  title: 'UI/Content Blocks/Call To Action',
  component: CallToAction,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CallToAction>;

const Template: ComponentStory<typeof CallToAction> = (args) => <CallToAction {...args} />;

export const Plain = Template.bind({});
Plain.args = {
  headline: 'Using the ampol app',
  description: 'Learn about more features of the Ampol app including exclusive shop deals and how to collect Everyday Rewards points on fuel purchases through the app.',
  link: {
    title: 'Click me',
    href: '#',
  },
  theme: 'cobalt',
  layout: 'default',
  ctaOrder: 'after',
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Plain.args,
  inverseTheme: true,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Plain.args,
  headline: 'Sign up to Ampol Energy',
  description: 'Want to become an Ampol Energy customer? Simply add your details to our waitlist and we\'ll make sure you\'re the first to know when we can supply energy to your postcode.',
  smallImage: {
    description: 'An illustration of a two-level family home with many different rooms and people living in it',
    url: '/placeholder/CallToAction/house@2x.png',
  },
  wideImage: {
    description: 'cta image',
    url: '/placeholder/CallToAction/bg.png',
  },
};

export const WithTwoColumns = Template.bind({});
WithTwoColumns.args = {
  headline: 'Promotion headline',
  description: 'Learn about more features of the Ampol app including exclusive shop deals and how to collect Everyday Rewards points on fuel purchases through the app.',
  wideImage: {
    description: 'cta image',
    url: '/placeholder/CallToAction/rectangle.webp',
  },
  link: {
    title: 'BUTTON LABEL',
    href: '#',
  },
  inverseTheme: true,
  theme: 'cobalt',
  layout: '2col',
  ctaOrder: 'after',
};
