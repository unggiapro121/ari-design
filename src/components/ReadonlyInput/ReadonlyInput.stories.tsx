import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import range from '../../util/range';
import Stack from '../Stack/Stack';

import ReadonlyField from './ReadonlyField';

const meta: Meta<typeof ReadonlyField> = {
  title: 'Inputs/Disabled',
  component: ReadonlyField,
};

export default meta;

type Story = StoryObj<typeof ReadonlyField>;

export const Input: Story = {
  render: (args) => (
    <Stack direction="column" gap="s">
      <ReadonlyField {...args} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(auto, 30ch))',
          gap: '12px',
        }}
      >
        {range(4).map((i) => (
          <ReadonlyField key={i} {...args} />
        ))}
      </div>
    </Stack>
  ),
  args: {
    value:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta nulla qui recusandae consectetur, tempora sunt sequi facere. Minus ex odio atque, consequuntur id corrupti officiis. Illum et minima qui blanditiis.',
  },
};

export const Dropdown: Story = {
  render: (args) => (
    <Stack direction="column" gap="s">
      <ReadonlyField {...args} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(auto, 30ch))',
          gap: '12px',
        }}
      >
        {range(4).map((i) => (
          <ReadonlyField key={i} {...args} />
        ))}
      </div>
    </Stack>
  ),
  args: { value: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta nulla qui recusandae consectetur, tempora sunt sequi facere. Minus ex odio atque,', type: 'dropdown' },
};

export const Checkbox: Story = {
  args: { type: 'checkbox' },
};

export const Radio: Story = {
  args: { type: 'radio', checked: true },
};
