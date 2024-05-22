import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import PromoMobileApp from './PromoMobileApp';

export default {
  title: 'UI/Content Blocks/Mobile App Promotion',
  component: PromoMobileApp,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PromoMobileApp>;

const Template: ComponentStory<typeof PromoMobileApp> = (args) => <PromoMobileApp {...args} />;

const RichtexDesc = () => <>
  <p>Download the app and save 10c/L on regular and Amplify premium fuels* at over <a href="#">600 participating locations^</a> when you pay using FuelPay via the Ampol app.</p>
</>;

export const MobileAppPromotion = Template.bind({});
MobileAppPromotion.args = {
  headline: 'Save on fuel at Ampol',
  description: <RichtexDesc />,
  appIcon: {
    title: 'Ampol logo',
    description: 'Ampol logo',
    url: '/placeholder/PromoMobileApp/promo-appicon.webp',
  },
  links: {
    appStore: { title: 'App store app URL', href: '#' },
    playStore: { title: 'Play store app URL', href: '#' },
  },
  images: {
    square: {
      description: 'Save 10c per litre with Ampol energy',
      url: '/placeholder/PromoMobileApp/promo-mobile.png',
    },
    wide: {
      description: 'Save 10c per litre with Ampol energy',
      url: '/placeholder/PromoMobileApp/promo-desktop.png',
    },
  },
  theme: 'cobalt',
};
