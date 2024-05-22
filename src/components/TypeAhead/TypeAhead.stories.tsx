import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import TypeAhead from './TypeAhead';

export default {
  title: 'Deprecated/TypeAheads',
  component: TypeAhead,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof TypeAhead>;

const Template: Story<typeof TypeAhead> = (args) => <TypeAhead {...args} />;

const data = [
  { label: 'google', input: 'goog', value: 1 },
  { label: 'amazon', value: 2 },
  { label: 'ebay', value: 3 },
  { label: 'facebook', value: 4 },
  { label: 'twitter', value: 5 },
  { label: 'instagram', value: 6 },
  { label: 'youtube', value: 7 },
  { label: 'linkedin', value: 8 },
  { label: 'pinterest', value: 9 },
  { label: 'reddit', value: 10 },
  { label: 'tumblr', value: 11 },
];

const testHandler = (input: string) => {
  return data.filter(({label}) => label.includes(input));
};

const testAsyncHandler = async (input: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return await data.filter(({label}) => label.includes(input));
};

export const Primary = Template.bind({});
Primary.args = { handler: testHandler, prefix: 'www.', suffix: '.com' };

export const Async = Template.bind({});
Async.args = { handler: testAsyncHandler, prefix: 'www.', suffix: '.com', debounce: 300 };
