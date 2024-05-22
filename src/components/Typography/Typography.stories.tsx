import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react';
import * as React from 'react';

import Stack from '../Stack/Stack';

import Typography, { TypographyKeys, TypographyProps } from './Typography';

export default {
  title: 'Ui/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

type ComponentTemplate = ComponentStory<typeof Typography>;

type TypographyListItemProps = TypographyProps<TypographyKeys>[];

const components: TypographyListItemProps = [
  {
    component: 'h1',
    children: 'Heading 1',
  },
  {
    component: 'h2',
    children: 'Heading 2',
  },
  {
    component: 'h3',
    children: 'Heading 3',
  },
  {
    component: 'h4',
    children: 'Heading 4',
  },
  {
    component: 'h5',
    children: 'Heading 5',
  },
  {
    component: 'h6',
    children: 'Heading 6',
  },
  {
    component: 'p',
    children: 'Paragraph',
  },
];

const variants: TypographyListItemProps = [
  {
    component: 'h1',
    children: 'Heading 1 (with H2 variant)',
    variant: 'h2',
  },
  {
    component: 'h2',
    children: 'Heading 2 (with H3 variant)',
    variant: 'h3',
  },
  {
    component: 'h3',
    children: 'Heading 3 (with H4 variant)',
    variant: 'h4',
  },
  {
    component: 'p',
    children: 'Paragraph (with small variant)',
    variant: 'small',
  },
];

const TypographyList = ({ items }: { items: TypographyListItemProps }) => (
  <>
    {items.map((props, i) => (
      <Typography key={i} {...props} />
    ))}
  </>
);

const decorator: ComponentTemplate['decorators'] = [
  (Story) => (
    <Stack direction='column'>
      <Story />
    </Stack>
  ),
];

const StandardTemplate: ComponentTemplate = () => (
  <TypographyList items={components} />
);
const VariantsTemplate: ComponentTemplate = () => (
  <TypographyList items={variants} />
);

export const Standard = StandardTemplate.bind({}) as ComponentTemplate;
export const Variants = VariantsTemplate.bind({}) as ComponentTemplate;

Standard.decorators = decorator;
Variants.decorators = decorator;
