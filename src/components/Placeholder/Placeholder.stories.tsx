import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Placeholder from './Placeholder';

export default {
  title: 'Utility/Placeholders',
  component: Placeholder,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Placeholder>;

const Template: Story<typeof Placeholder> = (args) => <Placeholder {...args} />;

export const Primary = Template.bind({});
Primary.args = { label: 'Placeholder' };
