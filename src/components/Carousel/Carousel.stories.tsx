import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Card from '../Card/Card';

import Carousel from './Carousel';

export default {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    backgrounds: {
      default: 'light',
    },
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Carousel>;

const ExampleCard = ({ children }: any) => (
  <div style={{ width: 640, maxWidth: '100vw' }}>
    <Card>
      <h1>{children}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, </p>
    </Card>
  </div>
);

const TemplateWithCards: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <ExampleCard>Card 1</ExampleCard>
    <ExampleCard>Card 2</ExampleCard>
    <ExampleCard>Card 3</ExampleCard>
    <ExampleCard>Card 4</ExampleCard>
  </Carousel>
);

export const CardsWithArrows = TemplateWithCards.bind({});

export const CardsWithoutArrows = TemplateWithCards.bind({});
CardsWithoutArrows.args = {
  showArrows: false,
};

const TemplateColourBlocks: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <div style={{ width: 500, height: 500, backgroundColor: '#18249c' }} />
    <div style={{ width: 500, height: 500, backgroundColor: '#c90a05' }} />
    <div style={{ width: 500, height: 500, backgroundColor: '#e7e9f5' }} />
    <div style={{ width: 500, height: 500, backgroundColor: '#004bff' }} />
  </Carousel>
);

export const AutoPlay = TemplateColourBlocks.bind({});
AutoPlay.args = {
  ...CardsWithoutArrows.args,
  autoPlay: true,
};
