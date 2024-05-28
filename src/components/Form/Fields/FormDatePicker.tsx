// import React from 'react';

// import dayjs from '../../../util/date';
// import DateOfBirth from '../../DateOfBirth/DateOfBirth';
// import DatePicker, { DatePickerProps } from '../../DatePicker/DatePicker';
// import FormField, { FormFieldProps } from '../../FormField/FormField';

// interface FormDatePickerExtraProps extends FormFieldProps {
//   /**
//    * Type of Datepicker
//    * @default
//    * ```
//    * <DatePicker />
//    * ```
//    */
//   type?: 'dob';
// }

// export type FormDatePickerProps = Omit<
//   FormDatePickerExtraProps & FormFieldProps & DatePickerProps,
//   'onChange' | 'onBlur' | 'value' | 'render' | 'error'
// >;

// /**
//  * Form date picker helper component
//  */
// const FormDatePicker = (props: FormDatePickerProps) => {

//   const isDateOfBirth = props.type && props.type === 'dob';
//   const [isOpened, setIsOpened] = React.useState(false);

//   return (
//     <FormField
//       {...props}
//       labelType={isDateOfBirth ? 'top' : undefined}
//       forceFloating={isOpened}
//       render={(onChange, onBlur, value, error, ref) => {
//         return isDateOfBirth ? (
//           <DateOfBirth
//             value={value}
//             onChange={(date) => onChange(dayjs(date).format('DD/MM/YYYY'))}
//             error={error}
//           />
//         ) : (
//           <DatePicker
//             {...props}
//             value={value}
//             onChange={onChange}
//             onBlur={onBlur}
//             onOpenChange={setIsOpened}
//             error={error}
//             ref={ref}
//           />
//         );

//       }}
//       data-testid='FormDatePicker'
//     />
//   );
// };

// export default FormDatePicker;

import React from 'react';

export type FormDatePickerProps = {
  type?: 'dob';
};

const FormDatePicker = () => {
  return <div>FormDatePicker</div>;
};

export default FormDatePicker;  