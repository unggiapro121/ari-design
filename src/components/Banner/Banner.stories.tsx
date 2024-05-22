import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import chatIcon from '../../images/icons/icon-chat.svg';
import userIcon from '../../images/icons/icon-user.svg';

import Banner from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Layout/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  render: () => (
    <Banner>
      <Banner.Container>
        <Banner.Brands>
          <Banner.Brand image="https://www.ampol.com.au/-/media/images/logos/ampcharge_small_blue.ashx%22" />
          <Banner.Brand image="https://www.ampol.com.au/-/media/images/logos/ampenergy_small_blue.ashx%22" />
        </Banner.Brands>
        <Banner.Actions>
          <Banner.Action title="Support" icon={chatIcon} />
          <Banner.Action title="Sustainability" />
          <Banner.Action title="Login" icon={userIcon} />
        </Banner.Actions>
      </Banner.Container>
    </Banner>
  ),
};
