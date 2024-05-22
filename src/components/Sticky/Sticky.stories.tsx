import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Card from '../Card/Card';

import Sticky from './Sticky';

export default {
  title: 'Utility/Stickys',
  component: Sticky,
  decorators: [
    (story: any) => <div style={{ height: '1000px' }}>{story()}</div>,
  ],
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof Sticky>;

const Template: Story<typeof Sticky> = (args) => <div>
  <Sticky {...args}>
    <Card>Title 1</Card>
  </Sticky>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, </p>
  <Sticky {...args}>
    <Card>Card 3</Card>
  </Sticky>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, </p>
</div>;

export const Primary = Template.bind({});
Primary.args = {};