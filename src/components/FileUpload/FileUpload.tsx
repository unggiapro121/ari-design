import React, { forwardRef } from 'react';

import { useFormContext } from '../Form/Form';

import styles from './FileUpload.module.scss';

export interface FileUploadProps {
  /**
   * Name of input and ID
   */
  name: string;
  /**
   * Event on onBlur
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Describe Your Component
 * @param children JSX children
 */
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({ name }: FileUploadProps, ref) => {
  const formContext = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formContext.setValue(name, event.target.files);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Need to call set value again due to bug with react-hook-form onBlur event triggering onChange and wiping the FileList back to string value
    formContext.setValue(name, event.target.files);
  };

  return <input className={styles.fileupload} ref={ref} type="file" name={name} onBlur={handleBlur} onChange={handleChange} data-testid="FileUpload" />;
});

FileUpload.displayName = FileUpload.name;

export default FileUpload;
