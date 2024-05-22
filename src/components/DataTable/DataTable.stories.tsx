import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon/Icon';

import DataTable, { HeaderVariant, TableColumn, TableVariant } from './DataTable';

export default {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
} as Meta<typeof DataTable>;

const Template: Story<typeof DataTable> = (args) => <DataTable {...args} />;

type Person = {
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  visits: number,
  status: string,
  progress: number,
  balance: number,
  favFood: { name: string },
};

const advancedData: Person[] = [
  {
    id: '1034',
    firstName: 'tanner',
    lastName: '',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
    balance: 34.70,
    favFood: {
      name: 'Hot dogs',
    },
  },
  {
    id: '1066',
    firstName: 'tandy',
    lastName: 'miller light avon smith',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
    balance: 90.15,
    favFood: {
      name: 'Pizza',
    },
  },
  {
    id: '1045',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
    balance: 100.70,
    favFood: {
      name: 'Laksa',
    },
  },
];

const mainColumns: TableColumn[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
];

const advancedColumns: TableColumn[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    defaultValue: '-',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Balance',
    accessorKey: 'balance',
    rtl: true,
  },
  {
    id: 'action',
    accessorFn: () => <a href="#"><Icon url={'/src/images/icons/icon-bin.svg'} /></a>,
    rtl: true,
  },
];

const limitedSortColumns: TableColumn[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    defaultSorted: 'desc',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    defaultValue: '-',
  },
  {
    header: 'Age',
    accessorKey: 'age',
    disableSort: true,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    disableSort: true,
  },
  {
    header: 'Favorite Food',
    accessorFn: (row) => row.favFood.name,
  },
  {
    id: 'action',
    accessorFn: () => <a href="#"><Icon url={'/src/images/icons/icon-bin.svg'} /></a>,
    rtl: true,
  },
];

const basicColumns = ['Name', 'Description'];
const basicAdvancedColumns: TableColumn[] = [
  {
    header: 'Name',
    accessorKey: '0',
    defaultSorted: 'desc',
  },
  {
    header: 'Description',
    accessorKey: '1',
  },
];

const basicTableRows: any[] =
  [1, 2, 3, 4, 5, 6].map((row: any, i: any) => [
    <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>,
    <div key={i}>
      <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc molestie
        magna eget ultricies maximus. Suspendisse porttitor aliquam lacinia. Mauris in ornare nisl.</p>
      <p><strong>Price:</strong> ${(i + 1) * 34}.00</p>
      <p><strong>Interest:</strong> 20%</p>
    </div>,
  ]);

export const List = Template.bind({});
List.args = {
  columns: advancedColumns,
  tableVariant: TableVariant.List,
  onColumnSorted: () => { return; },
  data: advancedData,
  onRowClick: undefined,
  rowIdFn: (row: any) => row.id,
};

export const main = Template.bind({});
main.args = { columns: mainColumns, tableVariant: TableVariant.Main, onColumnSorted: () => { return; }, data: advancedData, onSelectAll: undefined, hideRowHeader: true };

export const basicMain = Template.bind({});
basicMain.args = {
  columns: basicColumns,
  tableVariant: TableVariant.Main,
  rows: basicTableRows,
  textOverflow: 'normal',
  onColumnSorted: undefined,
  onRowClick: undefined,
};

export const basicList = Template.bind({});
basicList.args = {
  columns: basicAdvancedColumns,
  tableVariant: TableVariant.List,
  rows: basicTableRows,
  textOverflow: 'normal',
  onColumnSorted: undefined,
  onRowClick: undefined,
};

export const ListSelectMany = Template.bind({});
ListSelectMany.args = {
  columns: advancedColumns,
  tableVariant: TableVariant.List,
  isSelectable: true,
  onColumnSorted: () => { return; },
  data: advancedData,
  onSelectAll: () => { return; },
  rowSelectionDisabledFn: (row) => row.age === 40,
  headerVariant: HeaderVariant.Cobalt,
};

export const ListSelectSingle = Template.bind({});
ListSelectSingle.args = {
  columns: advancedColumns,
  tableVariant: TableVariant.List,
  isSelectable: true,
  onColumnSorted: () => { return; },
  data: advancedData,
  selectType: 'single',
  textOverflow: 'normal',
};

export const ListLimitedSort = Template.bind({});
ListLimitedSort.args = {
  columns: limitedSortColumns,
  tableVariant: TableVariant.List,
  onColumnSorted: () => { return; },
  data: advancedData,
};

export const ListWithTableOverflow = Template.bind({});
ListWithTableOverflow.args = {
  ...ListSelectSingle.args,
  tableOverflow: true,
};

export const NoData = Template.bind({});
NoData.args = {
  columns: advancedColumns,
  tableVariant: TableVariant.List,
  isSelectable: true,
  onColumnSorted: () => { return; },
  data: [],
};

export const Loading = Template.bind({});
Loading.args = {
  columns: advancedColumns,
  tableVariant: TableVariant.List,
  isSelectable: true,
  onColumnSorted: () => { return; },
  data: [],
  isLoading: true,
};
