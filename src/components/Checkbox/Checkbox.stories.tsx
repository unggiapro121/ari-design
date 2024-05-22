import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'Inputs/Checkboxs',
  component: Checkbox,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Checkbox>;

const Template: Story<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = { color: 'cobalt' };