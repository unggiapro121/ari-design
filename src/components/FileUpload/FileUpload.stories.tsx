import { Meta } from '@storybook/react';
import * as React from 'react';

import Form from '../Form/Form';

import FileUpload from './FileUpload';

export default {
  title: 'In Progress/FileUploads',
  component: FileUpload,
} as Meta<typeof FileUpload>;

export const Primary = (args) => (
  <Form schema={{}}>
    <FileUpload {...args} />
  </Form>
);
