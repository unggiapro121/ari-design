import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button from '../../Button/Button';

import CarouselBlock from './CarouselBlock';

export default {
  title: 'UI/Content Blocks/Carousel',
  component: CarouselBlock,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CarouselBlock>;

const ShortDescription = () => <p>Lorem ipsum nulla vitae elit libero, etcetera.</p>;
const LongDescription = () => <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>;
const LinkButton = () => <Button label="Click here" color="black" variant="secondary" bgFill={false} type="link" />;
const carouselItems = (desc: React.ReactElement) => [
  {
    title: 'Descriptive title 1',
    description: desc,
    image: {
      url: '/assets/placeholder/Tile/Bondi-Summ-Square.jpg',
      description: 'image description',
    },
    link: <LinkButton />,
  },
  {
    title: 'Descriptive title 2',
    description: desc,
    image: {
      url: '/assets/placeholder/Tile/Foodary-Square.jpg',
      description: 'image description',
    },
    link: <LinkButton />,
  },
  {
    title: 'Descriptive title 3',
    description: desc,
    image: {
      url: '/assets/placeholder/Tile/Dog-Square.jpg',
      description: 'image description',
    },
    link: <LinkButton />,
  },
  {
    title: 'Descriptive title 4',
    description: desc,
    image: {
      url: '/assets/placeholder/Tile/AmpCharge-Square.jpg',
      description: 'image description',
    },
    link: <LinkButton />,
  },
];

const Template: ComponentStory<typeof CarouselBlock> = (args) => <CarouselBlock {...args} />;

export const Small = Template.bind({});
Small.args = {
  items: carouselItems(<ShortDescription />),
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  items: carouselItems(<LongDescription />),
  size: 'large',
};
