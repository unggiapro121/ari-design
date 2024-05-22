import * as React from 'react';

import { HeaderVariant } from '../../DataTable/DataTable';

import Table from './Table';

export default {
  title: 'UI/Content Blocks/Table',
  component: Table,
};

const rowsData = [
  [
    <p key='R1C1'>Vehicle isn't charging. LED is black.</p>,
    <p key='R1C2'>Station hasn't booted OR there's no power</p>,
    <p key='R1C3'>Call 13 14 04 to reset your EV charger remotely</p>,
  ], 
  [
    <p key='R2C1'>Vehicle isn't charging.</p>,
    <p key='R2C2'>LED has blue slow pulse.</p>,
    <p key='R2C3'>Charging session paused	Wait 2 mins. If issue persists, reset charger (off/on).</p>,
  ], 
  [
    <p key='R3C1'>Vehicle isn't charging.</p>,
    <p key='R3C2'>LED has green slow pulse.</p>,
    <div key='R3C3'>
      <p>Vehicle not ready</p>
      <ol type='a'>
        <li>Check your vehicle's state of charge</li>
        <li>Check your vehicle's state of charge limit</li>
        <li>Disable your vehicle's charging timer</li>
        <li>Cycle your vehicle by:</li>
        <ul>
          <li>Unlocking vehicle</li>
          <li>Unplugging vehicle</li>
          <li>Locking vehicle</li>
          <li>Plugging in vehicle</li>
        </ul>
      </ol>
    </div>,
  ],
];

export const Primary = (args) => <Table {...args} />;

Primary.args = {
  caption: 'Troubleshoot an Issue',
  columns: [
    'Issue', 'Issue Description', 'Action',
  ],
  headerVariant: HeaderVariant.Cobalt,
  level: '3',
  showAccent: false,
  inset: false,
  rows: rowsData,
};

export const InsetTable = (args) => <Table {...args} />;
InsetTable.args = {
  caption: 'Troubleshoot an Issue',
  columns: [
    'Issue', 'Issue Description', 'Action',
  ],
  headerVariant: HeaderVariant.Cobalt,
  level: '3',
  showAccent: false,
  inset: true,
  rows: rowsData,
};

export const WithHeading = (args) => <Table {...args} />;
WithHeading.args = {
  showHeading: true,
  caption: 'Troubleshoot an Issue',
  columns: [
    'Issue', 'Issue Description', 'Action',
  ],
  headerVariant: HeaderVariant.Cobalt,
  level: '3',
  showAccent: false,
  inset: true,
  rows: rowsData,
};

export const AccentTable = (args) => <Table {...args} />;
AccentTable.args = {
  showHeading: true,
  caption: 'Troubleshoot an Issue',
  columns: [
    'Issue', 'Issue Description', 'Action',
  ],
  headerVariant: HeaderVariant.Cobalt,
  level: '3',
  showAccent: true,
  inset: true,
  rows: rowsData,
};

export const BlueTable = (args) => <Table {...args} />;
BlueTable.args = {
  showHeading: true,
  caption: 'Troubleshoot an Issue',
  columns: [
    'Issue', 'Issue Description', 'Action',
  ],
  headerVariant: HeaderVariant.Blue,
  level: '3',
  showAccent: false,
  inset: false,
  rows: rowsData,
};