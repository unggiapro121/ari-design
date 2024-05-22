import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import VideoBlock from './Video';

export default {
  title: 'UI/Content Blocks/Video',
  component: VideoBlock,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VideoBlock>;

const Template: ComponentStory<typeof VideoBlock> = (args) => <VideoBlock {...args} />;

export const Video = Template.bind({});
Video.args = {
  image: {
    description: 'An image showing pump, pay and you\'re on your way',
    url: '/placeholder/Video/video-overlay.webp',
  },
  headline: 'How to redeem your fuel discount',
  description: 'Learn more about how to pay for fuel with the Ampol app.',
  youtubeUrl: 'https://www.youtube.com/embed/glpmJ_p8Ohw',
};
