import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import ProofPoint from './ProofPoint';

export default {
  title: 'UI/Content Blocks/Proof Points',
  component: ProofPoint,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as ComponentMeta<typeof ProofPoint>;

const Template: ComponentStory<typeof ProofPoint> = (args) => <ProofPoint {...args} />;

export const ProofPoints = Template.bind({});
ProofPoints.args = {
  tiles: [
    {
      headline: 'Save with Ampol',
      description: '10c/L discount on regular & Amplify premium fuels^.',
      image: {
        description: 'An image showing savings in hand',
        url: '/placeholder/ProofPoint/combine-and-save.svg',
      },
    },
    {
      headline: 'Sign up online',
      description: 'Make the switch with our simple online sign up.',
      image: {
        description: 'An image showing savings in hand',
        url: '/placeholder/ProofPoint/combine-and-save.svg',
      },
    },
    {
      headline: 'Easy payments',
      description: 'Pay your way with our range of payment options.',
      image: {
        description: 'An image showing phone and card payments',
        url: '/placeholder/ProofPoint/payments.svg',
      },
    },
    {
      headline: 'Simple and flexible',
      description: 'No exit fees and no lock in contracts.',
      image: {
        description: 'An image showing locked contract',
        url: '/placeholder/ProofPoint/no-lock-in.svg',
      },
    },
  ],
};

export const ProofPointsWithLinks = Template.bind({});
ProofPointsWithLinks.args = {
  tiles: [
    {
      headline: 'Save with Ampol',
      description: '10c/L discount on regular & Amplify premium fuels^.',
      image: {
        description: 'An image showing savings in hand',
        url: '/placeholder/ProofPoint/combine-and-save.svg',
      },
      link: {
        title: 'Go to Ampol',
        href: 'https://www.ampol.com.au',
      },
    },
    {
      headline: 'Sign up online',
      description: 'Make the switch with our simple online sign up.',
      image: {
        description: 'An image showing savings in hand',
        url: '/placeholder/ProofPoint/combine-and-save.svg',
      },
      link: {
        title: 'Sign up online',
        href: 'https://energy.ampol.com.au/sign-up/postcode',
      },
    },
    {
      headline: 'Easy payments',
      description: 'Pay your way with our range of payment options.',
      image: {
        description: 'An image showing phone and card payments',
        url: '/placeholder/ProofPoint/payments.svg',
      },
      link: {
        title: 'Payments',
        href: 'https://www.ampol.com.au',
      },
    },
    {
      headline: 'Simple and flexible',
      description: 'No exit fees and no lock in contracts.',
      image: {
        description: 'An image showing locked contract',
        url: '/placeholder/ProofPoint/no-lock-in.svg',
      },
      link: {
        title: '',
        href: '',
      },
    },
  ],
};