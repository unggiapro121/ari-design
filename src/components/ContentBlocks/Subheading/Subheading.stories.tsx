import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Subheading from './Subheading';

export default {
  title: 'UI/Content Blocks/Subheading',
  component: Subheading,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Subheading>;

const Template: ComponentStory<typeof Subheading> = (args) => <Subheading {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  text: 'Subheading example',
  level: '2',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...Simple.args,
  description: 'While we keep you powered at home, we\'ll also keep you moving on the road. Save 10 cents per litre on fuel* as an Ampol Energy customer, redeemable for up to 1,500 litres a year',
};

export const AccentColour = Template.bind({});
AccentColour.args = {
  ...WithDescription.args,
  showAccent: true,
};

// export const WithDivider = Template.bind({});
// WithDivider.args = {
//   ...WithoutDivider.args,
//   divider: true,
// };
