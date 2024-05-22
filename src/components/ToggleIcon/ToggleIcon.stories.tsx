import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import hamburger from '../../images/hamburger.png';
import close from '../../images/icons-close@3x.png';

import ToggleIcon from './ToggleIcon';

export default {
  title: 'UI/ToggleIcons',
  component: ToggleIcon,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof ToggleIcon>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: Story<typeof ToggleIcon> = (args) => <ToggleIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  enabledImage: close,
  disabledImage: hamburger,
  enabledText: 'Close Menu',
  disabledText: 'Open Menu',
  size: 50,
};
