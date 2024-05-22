import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import ImageFeature from './ImageFeature';

export default {
  title: 'UI/Content Blocks/Feature with Image',
  component: ImageFeature,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ImageFeature>;

const Template: ComponentStory<typeof ImageFeature> = (args) => <ImageFeature {...args} />;

export const ImageRightWithAccent = Template.bind({});
ImageRightWithAccent.args = {
  headline: 'Save 10c/L on fuel* with Ampol Energy',
  images: {
    square: {
      url: '/placeholder/Feature/pump-square.jpg',
      description: 'An image of AMP Charge electric vehicle recharge station, illuminated at night in glowing blue light',
    },
    wide: {
      url: '/placeholder/Feature/pump.webp',
      description: 'An image of AMP Charge electirc vehicle recharge station, illuminated at night in glowing blue light',
    },
  },
  content: <>
    <p>While we keep you powered at home, we'll also keep you moving on the road. Save 10c cents per litre on regular and premium Amplify fuels* at over 600 participating Ampol locations^, just for being an Ampol Energy customer. Valid for up to 1,500 litres per year. Make sure to login to the Ampol app with your Ampol Energy account email address.</p>
  </>,
  placeImage: 'right',
  showAccent: true,
};

export const ImageLeft = Template.bind({});
ImageLeft.args = {
  ...ImageRightWithAccent.args,
  placeImage: 'left',
  showAccent: false,
};

export const ImageLeftInset = Template.bind({});
ImageLeftInset.args = {
  ...ImageRightWithAccent.args,
  placeImage: 'left',
  showAccent: false,
  isInset: true,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  headline: 'Powering our lives with in-home electricity',
  images: {
    square: {
      url: '/placeholder/Feature/athome.jpg',
      description: 'People relaxing at home, using headphones and mobile, and the other using a tablet',
    },
    wide: {
      url: '/placeholder/Feature/athome.jpg',
      description: 'People relaxing at home, using headphone and mobile, and the other using a tablet',
    },
  },
  content: <>
    <p>For over 100 years, we've been powering journeys for our customers. And while fuel may be the foundation of our business, as our customers' needs change, we're changing too.</p>
    <p>We will continue to be the momentum behind every journey. But we're not just providing the highest performance fuels and lubricants — we are also powering the nation with Ampol Energy, Ampol AmpCharge and hydrogen solutions.</p>
    <p>Our Ampol Energy products enable you to power your way of life. We offer simplicity, ease and value that you have come to know from Ampol. Australia's own.</p>
    <p>Powering better journeys, today and tomorrow.</p>
  </>,
  showAccent: true,
  size: 'large',
};

export const LargeSizeInset = Template.bind({});
LargeSizeInset.args = {
  headline: 'Powering our lives with in-home electricity',
  images: {
    square: {
      url: '/placeholder/Feature/athome.jpg',
      description: 'People relaxing at home, using headphones and mobile, and the other using a tablet',
    },
    wide: {
      url: '/placeholder/Feature/athome.jpg',
      description: 'People relaxing at home, using headphone and mobile, and the other using a tablet',
    },
  },
  content: <>
    <p>For over 100 years, we've been powering journeys for our customers. And while fuel may be the foundation of our business, as our customers' needs change, we're changing too.</p>
    <p>We will continue to be the momentum behind every journey. But we're not just providing the highest performance fuels and lubricants — we are also powering the nation with Ampol Energy, Ampol AmpCharge and hydrogen solutions.</p>
    <p>Our Ampol Energy products enable you to power your way of life. We offer simplicity, ease and value that you have come to know from Ampol. Australia's own.</p>
    <p>Powering better journeys, today and tomorrow.</p>
  </>,
  showAccent: true,
  size: 'large',
  isInset: true,
};