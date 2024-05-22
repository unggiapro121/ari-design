import { StoryObj } from '@storybook/react';
import * as React from 'react';

import Loading from './Loading';

export default {
  title: 'UI/Loading',
  component: Loading,
};

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {
  args: {
    type: 'primary',
  },
  render: (args) => <Loading {...args} />,
};

export const Intermittent: Story = {
  args: {
    type: 'intermittent',
  },
  render: (args) => <Loading {...args} />,
};

export const Indeterminate: Story = {
  args: {
    type: 'indeterminate',
  },
  render: (args) => <Loading {...args} />,
};

export const CustomPercentage: Story = {
  args: {
    percentage: 50,
  },
  render: (args) => <Loading {...args} />,
};