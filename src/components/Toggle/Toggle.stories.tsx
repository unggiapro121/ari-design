import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Toggle from './Toggle';

export default {
  title: 'Inputs/Toggles',
  component: Toggle,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Toggle>;

const Template: Story<typeof Toggle> = (args) => <Toggle {...args} />;

export const Off = Template.bind({});
Off.args = { name: 'Example', color: 'blue' };

export const On = Template.bind({});
On.args = { name: 'Example', color: 'blue', defaultValue: true };

export const cobalt = Template.bind({});
On.args = { name: 'Example', color: 'cobalt', defaultValue: true };