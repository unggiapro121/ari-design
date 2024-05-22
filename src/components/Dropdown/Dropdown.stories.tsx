import { Meta, Story, StoryObj } from '@storybook/react';
import * as React from 'react';

import Dropdown, { DropdownProps } from './Dropdown';

export default {
  title: 'Inputs/Dropdown',
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Dropdown>;

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
];

type Story = StoryObj<DropdownProps>;

export const Primary : Story = {
  render: (args : DropdownProps) => <Dropdown {...args} />,
  args: { 
    options: options,
    name: 'color',
    placeHolder: 'Choose your color...',
  },
};

const optionslong = [
  { label: 'React Vue Angular Svelt Dart - 123456789', value: 'React' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
];

export const OptionsFullTextDisplay : Story = {
  render: (args : DropdownProps) => <Dropdown {...args} />,
  args: { 
    options: optionslong,
    name: 'color',
    placeHolder: 'Choose your color...',
    textOverflow: 'normal',
  },
};