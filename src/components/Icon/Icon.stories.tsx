import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Icon from './Icon';

export default {
  title: 'UI/Icons',
  component: Icon,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Icon>;

const Template: Story<typeof Icon> = (args) => <Icon {...args} />;

export const ChevronBottom = Template.bind({});
ChevronBottom.args = { name: 'chevron-bottom' };
