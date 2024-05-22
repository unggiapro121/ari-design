// import React from 'react';
// import renderer from 'react-test-renderer';
//
// import FormField from './FormField';

describe('FormField component', () => {

  test('example test', () => {
    //
  });

  // const baseTestId = 'firstName-text';

  // TODO: Tests are no longer valid since the FormField component is now just a wrapper around the Input component.

  // test('does render correctly', () => {
  //   const formField = renderer.create(<FormField label="First Name" name="firstName" />).toJSON();
  //   expect(formField).toMatchSnapshot();
  // });

  // test('should have an input and associated label element', ()=> {
  //   const formField = render(<FormField label="First Name" name="firstName" placeHolder="Name as displayed in your ID"  type={InputType.text} />);

  //   expect(formField.getByTestId(`${baseTestId}-label`)).toBeTruthy();
  //   expect(formField.getByTestId(`${baseTestId}-label`).getAttribute('for')).toBe(baseTestId);
  //   expect(formField.getByPlaceholderText('Name as displayed in your ID')).toBeTruthy();
  // });

  // //TODO enable once class testing is enabled
  // xdescribe('label is active when', ()=> {
  //   test('input has placeholder ', ()=> {
  //     const formField = render(<FormField label="First Name" name="firstName" type={InputType.text} placeHolder="Simon" />);

  //     expect(formField.getByTestId(`${baseTestId}-label`).classList.contains('formFieldLabel--active')).toBe(true);
  //   });
  //   test('input has default value ', ()=> {
  //     const formField = render(<FormField label="First Name" name="firstName" type={InputType.text} value="Brian"/>);

  //     expect(formField.getByTestId(`${baseTestId}-label`).classList.contains('formFieldLabel--active')).toBe(true);
  //   });
  //   test('input value is entered ', ()=> {
  //     const formField = render(<FormField label="First Name" name="firstName" type={InputType.text} />);

  //     expect(formField.getByTestId(`${baseTestId}-label`).classList.contains('formFieldLabel--active')).toBe(false);

  //     // TODO add enzyme to simulate adding a value to the input

  //     expect(formField.getByTestId(`${baseTestId}-label`).classList.contains('formFieldLabel--active')).toBe(true);
  //   });
  // });
});
