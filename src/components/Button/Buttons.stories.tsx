import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon/Icon';

import Button, { ButtonColor, ButtonProps, ButtonType, ButtonVariant } from './Button';

export default {
  title: 'UI/Buttons',
  component: Button,
  parameters: {
    zeplinLink: [
      {
        name: 'Primary',
        link: 'https://app.zeplin.io/styleguide/6180631f214952a779c2ea9d/components?coid=6182072f33764d816dadf423',
      },
      {
        name: 'Secondary',
        link: 'https://app.zeplin.io/styleguide/6180631f214952a779c2ea9d/components?coid=618207304d672681da268944',
      },
      {
        name: 'Tertiary',
        link: 'https://app.zeplin.io/styleguide/6180631f214952a779c2ea9d/components?coid=618207302daed67f7781bde9',
      },
    ],
  },
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { label: 'Button Label', variant: ButtonVariant.Primary, color: ButtonColor.Red };
export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = { label: 'Connect', variant: ButtonVariant.Primary, color: ButtonColor.Red, iconSuffix: <Icon url={'../../images/icons/icon-external-link.svg'} /> };
export const Secondary = Template.bind({});
Secondary.args = { label: 'Button Label', variant: ButtonVariant.Secondary, color: ButtonColor.Red };
export const Tertiary = Template.bind({});
Tertiary.args = { label: 'Button Label', variant: ButtonVariant.Tertiary, color: ButtonColor.Red };
export const ButtonAsLink = Template.bind({});
ButtonAsLink.args = {
  type: ButtonType.Link,
  label: 'Anchor Tag Button',
  href: 'https://ampol.com.au',
  variant: ButtonVariant.Primary,
  color: ButtonColor.Cobalt,
  onClick: undefined,
};
