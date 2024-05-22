import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../Form';

export interface FormConditionProps {
  children : React.ReactNode;
  /**
   * The name of the field to watch
   */
  fieldName : string;
  /**
   * The condition to evaluate
   */
  condition : (value : any) => boolean;
}

/**
 * Conditionally renders children based on a condition from form field values
 */
const FormCondition = ({children, fieldName, condition} : FormConditionProps) => {
  const formContext = useContext(FormContext);
  const [showChildren, setShowChildren] = useState(false);

  if (formContext) {
    useEffect(() => {
      const value = formContext.watch(fieldName);

      setShowChildren(condition(value));
    }, [formContext.watch(fieldName)]);
  }

  return <>
    {showChildren && children}
  </>;
};

export default FormCondition;