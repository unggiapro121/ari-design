import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon/Icon';

import Input from './Input';

export default {
  title: 'Inputs/Inputs',
  component: Input,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Input>;

const Template: Story<typeof Input> = (args) => <Input {...args} />;
const MultiInputTemplate: Story<typeof Input> = (args) => (
  <div>
    <Input name={'test1'} maxLength={3} id={'test1'} focusIDOnMaxLength={'test2'} {...args} />
    <Input name={'test2'} maxLength={3} id={'test2'} focusIDOnMaxLength={'test3'} focusIDOnEmpty={'test1'} {...args} />
    <Input name={'test3'} maxLength={3} id={'test3'} focusIDOnEmpty={'test2'} {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'test',
  type: 'text',
  placeholder: 'Placeholder text here...',
};

export const PrefixAndSuffix = Template.bind({});
PrefixAndSuffix.args = {
  name: 'test',
  type: 'text',
  prefix: 'www.',
  suffix: '.com',
  placeholder: 'Placeholder text here...',
  hasFocus: true,
};

export const InputSuffixAndPrefix = Template.bind({});
InputSuffixAndPrefix.args = {
  name: 'test',
  type: 'text',
  inputPrefix: <Icon url="https://i.imgur.com/drIqvV8.png" />,
  placeholder: 'Placeholder text here...',
  inputSuffix: <button>Search</button>,
};

export const OnMaxFocus = MultiInputTemplate.bind({});
OnMaxFocus.args = {
  type: 'text',
  placeholder: 'Placeholder text here...',
};

export const MinAndMax = Template.bind({});
MinAndMax.args = {
  name: 'test',
  type: 'number',
  placeholder: 'Placeholder text here...',
  min: 10,
  max: 100,
};