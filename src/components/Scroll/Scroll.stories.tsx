import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Scroll from './Scroll';

export default {
  title: 'UI/Scrolls',
  component: Scroll,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Scroll>;

const Template: Story<typeof Scroll> = (args) => <Scroll {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  style: {
    height: 300,
  },
  // eslint-disable-next-line no-console
  onScroll: (isAtBottom : boolean) => console.info('onScrollBottom', isAtBottom),
  children: (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
      cupiditate a atque. Porro explicabo sunt culpa quidem distinctio
      voluptatem, corporis similique commodi mollitia velit minus sequi natus
      officiis ut maiores. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Veniam fugit provident, minima natus quisquam expedita. Fuga quos
      expedita reprehenderit aut enim! Autem dicta dolor ut id unde accusantium.
      Quo, corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Provident, libero possimus? Veniam, tenetur modi earum sapiente
      reprehenderit animi nostrum sint odio iusto laborum numquam eligendi velit
      eius! Fugit, beatae doloribus.
    </p>
  ),
};
