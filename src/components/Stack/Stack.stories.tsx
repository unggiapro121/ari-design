import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Stack from './Stack';

export default {
  title: 'Layout/Stacks',
  component: Stack,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as ComponentMeta<typeof Stack>;

const Block = ({
  backgroundColor,
}: Pick<React.CSSProperties, 'backgroundColor'>) => (
  <div style={{ width: 100, height: 100, backgroundColor }} />
);

const children = ['red', 'blue', 'green'].map((backgroundColor) =>
  React.createElement(Block, { backgroundColor }));

const divider = React.createElement('div', {}, '🚀');

const Template: ComponentStory<typeof Stack> = (args) => <Stack {...args} />;

// Gap
export const Gap = Template.bind({});
Gap.args = {
  gap: 'm',
  children,
};

// Horizontal
export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'row',
  children,
};

// Vertical
export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'column',
  children,
};

// Responsive
export const Responsive = Template.bind({});
Responsive.args = {
  ...Gap.args,
  direction: {
    xs: 'column',
    md: 'row',
  },
};

// Divider
export const Divider = Template.bind({});
Divider.args = {
  ...Gap.args,
  direction: {
    xs: 'column',
    md: 'row',
  },
  children,
  alignItems: 'center',
  divider,
};
