import dayjs from 'dayjs';
import * as React from 'react';

import Form from '../Form/Form';

import DatePicker from './DatePicker';

export default {
  title: 'Inputs/DatePickers',
  component: DatePicker,
};

export const Template = (args) => <DatePicker {...args} />;

export const DisabledDates = (args) => (
  <DatePicker
    disabledDate={(current) => current && current > dayjs().endOf('day')}
    {...args}
  />
);

export const FormDatePicker = (args) => (
  <Form schema={{}} {...args}>
    <Form.DatePicker
      name="test-picker"
      id="bruh"
      label={'DOB (DD/MM/YYYY)'}
      {...args}
    />
  </Form>
);
