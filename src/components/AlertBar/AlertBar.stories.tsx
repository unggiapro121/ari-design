import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import AlertBar from './AlertBar';

export default {
  title: 'UI/AlertBars',
  component: AlertBar,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AlertBar>;

const Template: ComponentStory<typeof AlertBar> = (args) => <AlertBar {...args} />;

const RichtextMessage = () => <>
  <p>Outage alert: We are currently experiencing an outage. Our teams are working to restore services as soon as possible.  <a href="#">See more</a> </p>
</>;

export const Primary = Template.bind({});
Primary.args = {
  message: <RichtextMessage />,
  colour: 'red',
  // Generate a random ID, so that refresh can show the alert again
  id: Math.random().toString(16).slice(2),
};
