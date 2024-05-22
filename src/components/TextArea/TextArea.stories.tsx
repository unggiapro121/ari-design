import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import TextArea from './TextArea';

export default {
  title: 'Inputs/TextArea',
  component: TextArea,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof TextArea>;

const Template: Story<typeof TextArea> = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
Primary.args = { };