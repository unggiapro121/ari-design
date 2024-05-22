import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Accordion, { AccordianVariant } from './Accordion';

export default {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <>
    <Accordion {...args} />
    <Accordion {...args} />
    <Accordion {...args} />
    <Accordion {...args} />
  </>
);

export const Simple = Template.bind({});
Simple.args = {
  title: 'Accordion Title',
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Expedita, ratione
      fugit? Quaerat perspiciatis nostrum tempora ex nobis praesentium soluta?
      Odio, aperiam corporis voluptates ratione quod optio perferendis ullam aut
      omnis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
      debitis adipisci id ea, voluptates numquam hic vitae tenetur, unde laborum
      quas, rerum maiores consequuntur incidunt deleniti ullam nam. Saepe,
      dolores!
    </p>
  ),
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'Accordion Title',
  children: (
    <small>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Expedita, ratione
      fugit? Quaerat perspiciatis nostrum tempora ex nobis praesentium soluta?
      Odio, aperiam corporis voluptates ratione quod optio perferendis ullam aut
      omnis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
      debitis adipisci id ea, voluptates numquam hic vitae tenetur, unde laborum
      quas, rerum maiores consequuntur incidunt deleniti ullam nam. Saepe,
      dolores!
    </small>
  ),
  icon: 'icons/unlock.svg',
};

export const FAQ = Template.bind({});
FAQ.args = {
  title: 'FAQ Question',
  icon: 'icons/unlock.svg',
  children: (
    <small>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Expedita, ratione
      fugit? Quaerat perspiciatis nostrum tempora ex nobis praesentium soluta?
      Odio, aperiam corporis voluptates ratione quod optio perferendis ullam aut
      omnis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
      debitis adipisci id ea, voluptates numquam hic vitae tenetur, unde laborum
      quas, rerum maiores consequuntur incidunt deleniti ullam nam. Saepe,
      dolores!
    </small>
  ),
  variant: AccordianVariant.FAQ,
};