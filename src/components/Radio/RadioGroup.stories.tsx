import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Button, { ButtonColor, ButtonVariant } from '../Button/Button';
import Input from '../Input/Input';

import Radio from './Radio';
import RadioGroup from './RadioGroup';

export default {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof RadioGroup>;

const TripleButton: Story<typeof RadioGroup> = (args) => <form>
  <RadioGroup {...args}>
    <Radio label="YES" value="YES" />
    <Radio label="MAYBE" value="MAYBE" tooltip={'This option is for plebs!'} />
    <Radio label="NO" value="NO" tooltip={'Explain why below'}><Input placeholder={'Please explain'} /></Radio>
  </RadioGroup>
</form>;

const DoubleButton: Story<typeof RadioGroup> = (args) => <form>
  <RadioGroup {...args}>
    <Radio label="YES" value="YES" />
    <Radio label="NO" value="NO" />
  </RadioGroup>
</form>;

const ChangeButtonSelectionDemo: Story<typeof RadioGroup> = (args) => {
  const [value, setValue] = React.useState('');

  return <form>
    <div style={{ display: 'flex', gap: 10 }}>
      <Button label="Set YES" color={ButtonColor.Blue} variant={ButtonVariant.Secondary} onClick={() => setValue('YES')} />
      <Button label="Set NO" color={ButtonColor.Red} variant={ButtonVariant.Secondary} onClick={() => setValue('NO')} />
    </div>
    <p>Current Value: {value}</p>
    <RadioGroup {...args} value={value} onChange={v => setValue(v)} >
      <Radio label="YES" value="YES" />
      <Radio label="NO" value="NO" />
    </RadioGroup>
  </form>;
};

export const double = DoubleButton.bind({});
double.args = {
  name: 'radio-button-test',
  color: 'blue',
};
export const doubleMobile = DoubleButton.bind({});
doubleMobile.args = {
  name: 'radio-button-test',
  color: 'blue',
};
doubleMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone5',
  },
};

export const triple = TripleButton.bind({});
triple.args = {
  name: 'radio-button-test',
  color: 'blue',
};
export const tripleMobile = TripleButton.bind({});
tripleMobile.args = {
  name: 'radio-button-test',
  color: 'blue',
};
tripleMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone5',
  },
};

export const column = TripleButton.bind({});
column.args = {
  name: 'radio-button-test',
  direction: 'column',
};

export const selectionDemo = ChangeButtonSelectionDemo.bind({});
selectionDemo.args = {
  name: 'radio-button-test',
};

export const Red = TripleButton.bind({});
Red.args = { color: 'red', value: 'MAYBE', name: 'radio-button-test' };
export const Blue = TripleButton.bind({});
Blue.args = { color: 'blue', value: 'MAYBE', name: 'radio-button-test' };
export const Black = TripleButton.bind({});
Black.args = { color: 'black', value: 'MAYBE', name: 'radio-button-test' };
export const Cobalt = TripleButton.bind({});
Cobalt.args = { color: 'cobalt', value: 'MAYBE', name: 'radio-button-test' };
export const Error = TripleButton.bind({});
Error.args = { color: 'error', name: 'radio-button-test' };
