import { Meta, StoryObj } from '@storybook/react';

import Anchor from './Anchor';

const meta: Meta<typeof Anchor> = {
  title: 'Ui/Anchor',
  component: Anchor,
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Primary: Story = {
  args: {
    children: 'a link to somewhere',
    href: 'https://www.ampol.com.au',
  },
  argTypes: {
    variant: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    underline: {
      values: [
        {
          name: 'Hover',
          value: 'hover',
        },
        {
          name: 'Fixed',
          value: 'fixed',
        },
        {
          name: 'None',
          value: 'none',
        },
      ],
    },
  },
};
