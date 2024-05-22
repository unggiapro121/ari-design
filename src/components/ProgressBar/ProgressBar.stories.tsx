import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import ProgressBar from './ProgressBar';

export default {
  title: 'UI/ProgressBars',
  component: ProgressBar,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const TwoSteps = Template.bind({});
TwoSteps.args = { steps: ['Step 1', 'Step 2'], activeIndex: 0 };

export const ThreeSteps = Template.bind({});
ThreeSteps.args = { steps: ['Step 1', 'Step 2', 'Step 3'], activeIndex: 0 };

export const FourSteps = Template.bind({});
FourSteps.args = {
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  activeIndex: 1,
};

export const FiveSteps = Template.bind({});
FiveSteps.args = {
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
  activeIndex: 2,
};
