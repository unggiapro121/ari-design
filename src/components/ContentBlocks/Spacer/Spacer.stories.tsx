import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Placeholder from '../../Placeholder/Placeholder';

import Spacer from './Spacer';

export default {
  title: 'UI/Content Blocks/Vertical Space',
  component: Spacer,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
  args: {
    size: 'md',
  },
} as ComponentMeta<typeof Spacer>;

const Template: ComponentStory<typeof Spacer> = (args) => <>
  <Placeholder status='ABOVE' label="" />
  <Spacer {...args} />
  <Placeholder status="BELOW" label="" />
</>;

export const VerticalSpace = Template.bind({});
