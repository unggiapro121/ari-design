import React from 'react';

import FileUpload, { FileUploadProps } from '../../FileUpload/FileUpload';
import FormField, { FormFieldProps } from '../../FormField/FormField';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormFileExtraProps {
  // More props for FormText
}

export type FormFileProps = Omit<FormFileExtraProps & FormFieldProps & FileUploadProps, 'onChange' | 'onBlur' | 'value' | 'error' | 'render'>;

/**
 * Form input helper component
 */
const FormFileUpload = ({ forceFloating = true, ...props }: FormFileProps) => {
  return <FormField
    {...props}
    forceFloating={forceFloating}
    render={(onBlur, ref) => <FileUpload {...props} onBlur={onBlur} ref={ref}/>}
    data-testid="FormFileUpload"/>;
};

export default FormFileUpload;
