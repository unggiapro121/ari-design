import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Alert from './Alert';

export default {
  title: 'UI/Alerts',
  component: Alert,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  message: 'Your request has been received and will be processed during business hours.',
  type: 'info',
};

export const Error = Template.bind({});
Error.args = {
  message: 'There was an error processing your request. Please try again or call xxx-xxx',
  type: 'error',
};
