import * as React from 'react';

import CardIcon from './CardIcon';

export default {
  title: 'UI/CardIcon',
  component: CardIcon,
};

export const Primary = (args) => <CardIcon {...args} />;
Primary.args = {
  url: './../../../assets/placeholder/hero-birdseye.webp',
};