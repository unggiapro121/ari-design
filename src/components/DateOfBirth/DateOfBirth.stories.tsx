import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import DateOfBirth from './DateOfBirth';

export default {
  title: 'Inputs/DateOfBirth',
  component: DateOfBirth,
} as ComponentMeta<typeof DateOfBirth>;

type Story = ComponentStory<typeof DateOfBirth>;

const Template: Story = (args) => <DateOfBirth {...args} />;

export const Default = Template.bind({}) as Story;
export const Overrides = Template.bind({}) as Story;
export const Error = Template.bind({}) as Story;

Default.args = {
  error: false,
  value: new Date('2022-03-02'),
};

Overrides.args = {
  error: false,
  inputProps: {
    day: {
      placeholder: 'Day',
    },
    month: {
      placeholder: 'Month',
    },
    year: {
      placeholder: 'Year',
    },
  },
};

Error.args = {
  error: true,
};
