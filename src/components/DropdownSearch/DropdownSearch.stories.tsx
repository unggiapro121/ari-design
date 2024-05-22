import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { Countries } from '../../util/constants';
import Form from '../Form/Form';

import DropdownSearch, { DropDownSearchOptionInterface } from './DropdownSearch';

export default {
  title: 'Inputs/Dropdown Search',
  component: DropdownSearch,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof DropdownSearch>;

const groupedData: DropDownSearchOptionInterface[] = [
  {
    label: 'TEST',
    value: ['React', 'Vue', 'Angular', 'Svelt', 'Dart'],
  },
  {
    label: 'Grand Parent',
    value: [
      {
        label: 'Parent 001',
        value: [{label: 'green', value: 'gr23'}, {label: 'red', value: 'red'}],
      },
    ],
  },{
    label: 'Grander Parent',
    value: [
      {
        label: 'Parent 002',
        value: [{label: 'blue', value: 'blue'}, {label: 'yellow', value: 'yellow'}],
      },
    ],
  },
];

const Template: Story<typeof DropdownSearch> = (args) => <DropdownSearch {...args} />;

export const Filter = Template.bind({});
Filter.args = {
  type: 'search',
  data: Countries,
  filterOptions: true,
  onSearch: () => { /* handle query */ },
};

export const Search = Template.bind({});
Search.args = {
  type: 'search',
  data: undefined,
  searchOptions: true,
  onSearch: () => { /* handle query */ },
  loading: false,
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  data: ['React', 'Vue', 'Angular', 'Svelt', 'Dart'],
  type: 'dropdown',
  filterOptions: false,
};

export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
  data: groupedData,
};

export const SelectMultiple = Template.bind({});
SelectMultiple.args = {
  type: 'filter',
  data: [{label: 'React', value: 'React', disabled: true}, {label: 'Vue', value: 'Vue'}, {label: 'Angular', value: 'Angular'}, {label: 'Svelt', value: 'Svelt'}, {label: 'Dart', value: 'Dart'}],
  filterOptions: true,
  selectMultiple: true,
  showFooter: true,
  onSearch: () => { /* handle query */ },
};

const FormTemplate: Story<typeof Form> = (args) => <Form {...args} >
  <Form.DropdownSearch label={'How many?'} name={'testValue'} data={['one', 'two', 'three']} />
</Form>;

export const FormDropdown = FormTemplate.bind({});
FormDropdown.args = {};

const FormSearchTemplate: Story<typeof Form> = (args) => <Form {...args} >
  <Form.DropdownSearch label={'How many?'} name={'testValue'} data={['one', 'two', 'three']} filterOptions type={'search'} />
</Form>;

export const FormDropdownSearch = FormSearchTemplate.bind({});
FormDropdownSearch.args = {};

export const Loading = Template.bind({});
Loading.args = {
  type: 'search',
  data: [],
  searchOptions: true,
  onSearch: () => { /* handle query */ },
  loading: true,
};

export const OptionsFullTextDisplay = Template.bind({});
OptionsFullTextDisplay.args = {
  data: ['React Vue Angular Svelt Dart - 123456789', 'Vue', 'Angular', 'Svelt', 'Dart'],
  type: 'dropdown',
  textOverflow: 'normal',
  filterOptions: false,
};