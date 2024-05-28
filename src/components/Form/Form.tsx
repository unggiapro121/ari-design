import React, { createContext, useCallback, useEffect, useMemo } from 'react';
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import * as yup from 'yup';

import filterObjectProperties from '../../util/filterObjectProperties';

import FormAutocomplete from './Fields/FormAutocomplete';
import FormCheckbox from './Fields/FormCheckbox';
import FormCondition from './Fields/FormCondition';
// import FormDatePicker from './Fields/FormDatePicker';
import FormDropDown from './Fields/FormDropDown';
import FormDropdownSearch from './Fields/FormDropdownSearch';
import FormFileUpload from './Fields/FormFile';
import FormInput from './Fields/FormInput';
import FormRadioGroup from './Fields/FormRadioGroup';
import FormScroll from './Fields/FormScroll';
import FormTextArea from './Fields/FormTextArea';
import FormToggle from './Fields/FormToggle';
import FormTypeAhead from './Fields/FormTypeAhead';

export enum FormValidationMode {
  onTouched = 'onTouched',
  onBlur = 'onBlur',
  onSubmit = 'onSubmit',
  onChange = 'onChange',
}

export interface FormState {
  isValid: boolean;
  // Expose other https://react-hook-form.com/api/useform/formstate here if needed
}

export interface FormProps {
  /**
   * Schema for the form, including any validation rules and messages
   */
  schema: any;
  /**
   * Default values injected and memoized into fields on first render
   */
  defaultValues?: any;
  /**
   * Controls when validation is triggered
   */
  validationMode?: FormValidationMode;
  /**
   * React children
   */
  children?: any;
  /**
   * Callback for when when any value is changed within the form
   */
  onChange?: (value: any, name: string | undefined) => void;
  /**
   * Callback for when the form is submitted (only returns data if validation successful)
   */
  onSubmit?: (event: any) => void;
  /**
   * Callback when form state changed (generally for checking if form is valid)
   */
  onStateChange?: ({ isValid }: FormState) => void;
  /**
   * The form element's id attribute
   */
  id?: string;
  /**
   * Trigger validation either on load or when required.  This will not impact normal form validation rules
   */
  triggerValidation?: boolean;
  /**
   * Memoize the form's default values
   */
  memoizeDefaultValues?: boolean;
  /**
   * HTML Props to be passed to the form element
   */
  HTMLFormProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

export interface FormContextInterface {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: { [p: string]: any };
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, object>;
  defaultValues?: any;
  validationSchema?: any;
}

export const FormContext = createContext<FormContextInterface | null>(null);

export const useFormContext = () => {
  const context = React.useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }

  return context;
};

/**
 * Custom Yup react hook form resolver
 * @param validationSchema schema
 * @returns react callback
 */
const useYupValidationResolver = (validationSchema: yup.AnyObjectSchema) =>
  useCallback(
    async (data: any) => {
      // Filtering object used to fix a drawback with react-hook-form
      // This ensures that only registered fields are validated rather than the schema alone
      // Do nothing if object is empty
      if (Object.keys(validationSchema).length === 0)
        return { values: {}, errors: {} };

      const registeredFieldNames = Object.keys(data);
      const filtered = filterObjectProperties(
        validationSchema.fields,
        registeredFieldNames,
      );

      try {
        const values = await yup.object(filtered).validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {

        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: any,
              currentError: { path: any; type: any; message: any },
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

/**
 * Generate a form by setting a schema using yup or equivalent library.
 * Add FormField component(s), ensuring each FormField.props.name matches the key in your schema.
 * @param props.schema Schema for the form, including any validation rules and messages
 * @param props.validationMode When field validation should occur pre submit (Default: onBlur)
 * @param props.onChange Emits current form state, and last field that was changed
 * @param props.onSubmit Emits final form state
 * @param props.defaultValues Hydrates form with default values
 */
const Form = ({ memoizeDefaultValues = true, ...props }: FormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
    trigger,
  } = useForm({
    resolver: useYupValidationResolver(props.schema),
    mode: props.validationMode ?? 'onTouched', // Validation mode pre form submit
    reValidateMode: 'onChange', // Validation post form submit
    ...(props.defaultValues && {
      defaultValues: memoizeDefaultValues ? useMemo(() => props.defaultValues, [props.defaultValues]) : props.defaultValues,
    }),
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    props.onSubmit && props.onSubmit(data);
  };

  useEffect(() => {
    if (props.triggerValidation) {
      trigger();
    }
  }, [props.triggerValidation]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      name && props.onChange?.(value, name);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    props.onStateChange && props.onStateChange({ isValid });
  }, [isValid]);

  // Default values changed, reset form to show new values
  useEffect(() => {

    reset(props.defaultValues, {keepErrors: true}); // this will retain errors if form submitted 
    if(errors && Object.keys(errors).length > 0) trigger(); // will trigger manual validation to remove updated value errors
     
  }, [props.defaultValues]);

  // Handle scrolling to error fields
  useEffect(() => {
    // Transform error field ids into an array of field elements

    const elements = Object.keys(errors).map((key) => {
      return document.querySelector(`[for="${key}"]`);
    });

    // Sort elements by their position in the dom
    const sortedElements = elements.sort((a, b) => {
      if (!a || !b) return 0;

      const aPos = a.compareDocumentPosition(b);

      if (aPos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;

      if (aPos & Node.DOCUMENT_POSITION_PRECEDING) return 1;

      return 0;
    });

    const firstErrorRef = sortedElements[0];

    if (!firstErrorRef) return;

    const { top } = firstErrorRef.getBoundingClientRect();

    const offset = 150;

    window.scrollTo({
      top: top + window.scrollY - offset,
    });
  }, [errors]);

  const formContext: FormContextInterface = {
    register: register,
    setValue: setValue,
    errors: errors,
    watch: watch,
    control,
    defaultValues: props.defaultValues,
    validationSchema: props.schema,
  };

  return (
    <form
      id={props.id}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset({})}
      data-testid="Form"
      onChange={(event) => event.stopPropagation()}
      {...props.HTMLFormProps}
    >
      <FormContext.Provider value={formContext}>
        {props.children}
      </FormContext.Provider>
    </form>
  );
};

// Form.DatePicker = FormDatePicker;
Form.Condition = FormCondition;
Form.RadioGroup = FormRadioGroup;
Form.Toggle = FormToggle;
Form.Checkbox = FormCheckbox;
Form.DropDown = FormDropDown;
Form.DropdownSearch = FormDropdownSearch;
Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.TypeAhead = FormTypeAhead;
Form.Scroll = FormScroll;
Form.FileUpload = FormFileUpload;
Form.Autocomplete = FormAutocomplete;

export default Form;
