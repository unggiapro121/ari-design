import { render, screen } from '@testing-library/react';
import React from 'react';
import { object } from 'yup';

import FormField from '../FormField/FormField';

import { FormRadioGroupExtraProps } from './Fields/FormRadioGroup';
import Form from './Form';

describe('Form component', () => {
  const schema = object();

  test('does render correctly', () => {
    render(
      <Form schema={schema}>
        <FormField label={'First Name'} name={'firstName'} />
      </Form>,
    );
  });
  describe('RadioGroup', () => {
    test.each<{ desc: string } & FormRadioGroupExtraProps>([
      { desc: 'object', values: [{ label: 'Test', value: 'value' }] },
      { desc: 'string', values: ['Test'] },
    ])('Renders with values as $desc', ({ values }) => {
      render(
        <Form schema={schema}>
          <Form.RadioGroup
            label="RadioGroup"
            name="RadioGroup"
            color="black"
            values={values}
          />
        </Form>,
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Disables radio buttons', () => {
      render(
        <Form schema={schema}>
          <Form.RadioGroup
            label="RadioGroup"
            name="RadioGroup"
            color="black"
            values={['Test']}
            disabled
            disabledType="radio"
          />
        </Form>,
      );

      expect(screen.getByRole('radio')).toBeDisabled();
    });
  });
});
