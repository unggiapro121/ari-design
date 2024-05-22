import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Card from './Card';

export default {
  title: 'In Progress/Cards',
  component: Card,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Card>;

const Template: Story<typeof Card> = (args) => <Card {...args}>
  <h1>Title</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
    doloremque. Quaerat provident commodi consectetur veniam similique ad
    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore </p>
</Card>;

export const Primary = Template.bind({});
Primary.args = { };