import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  items: [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Subpage',
      path: '/subpage',
    },
    {
      title: 'Nested page',
      path: '/subpage/nested-page',
    },
    {
      title: 'Current page',
    },
  ],
};
