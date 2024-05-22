import { render } from '@testing-library/react';
import React from 'react';
import { object } from 'yup';

import Form from '../Form/Form';

import FileUpload from './FileUpload';

describe('File upload component', () => {
  test('does render correctly', () => {
    render(
      <Form schema={object()}>
        <FileUpload name={'firstName'} />
      </Form>,
    );
  });
});
