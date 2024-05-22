import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import Typography from '../Typography/Typography';

import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'ui/Toast',
  component: Toast,
  render: (args) => <Toast {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

const ChildComponent = () => <Typography component="p">Toast</Typography>;

export const Variants: Story = {
  decorators: [
    (Story, { args }) => (
      <div
        style={{
          position: 'relative',
          height: args.portal ? '200vh' : '95vh',
          border: args.portal ? 'none' : '1px solid #eee',
          backgroundColor: args.portal ? 'azure' : 'transparent',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    portal: false,
    open: true,
    variant: 'neutral',
    x: 'left',
    y: 'bottom',
    children: <ChildComponent />,
  },
};
