import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import primaryLogo from '../../images/logo-primary-full.png';
import justLogo from '../../images/logo-symbol-full-colour.png';
import Button, { ButtonColor, ButtonVariant } from '../Button/Button';

import Navigation, { NavigationProps } from './Navigation';

export default {
  title: 'Deprecated/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <div style={{ height: 1000 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Navigation>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: Story<typeof Navigation> = (args) => <Navigation {...args} />;

export const Energy = Template.bind({});

const energyDefaultState = {
  image: primaryLogo,
  style: { height: 100, padding: '10px 100px' },
  links: <>
    <li><Button label="NAV 1" variant={ButtonVariant.Tertiary} color={ButtonColor.Blue} /></li>
    <li><Button label="NAV 2" variant={ButtonVariant.Tertiary} color={ButtonColor.Blue} /></li>
    <li><Button label="NAV 3" variant={ButtonVariant.Tertiary} color={ButtonColor.Blue} /></li>
  </>,
  actions: <li><Button style={{ width: 160 }} label="Join" variant={ButtonVariant.Primary} color={ButtonColor.Blue} /></li>,
};

const energyStickyState = { ...energyDefaultState };

energyStickyState.image = justLogo;
energyStickyState.style = { height: 60, padding: '10px 50px' };

const energyProps: NavigationProps = {
  sticky: true,
  defaultState: energyDefaultState,
  stickyState: energyStickyState,
};

Energy.args = energyProps;
