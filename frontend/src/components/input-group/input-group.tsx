import React from 'react';
import styles from "@/shared/styles/form.module.css";
import { Field } from 'formik';

interface InputGroupProps {
  id: string;
  type: string;
  touched?: boolean;
  errors?: string;
  label: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  id,
  type,
  touched,
  errors,
  label
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}:</label>
      <Field
        type={type}
        id={id}
        name={id}
        className={touched && errors ? styles.inputError : ""}
      />
      <div
        className={`${styles.errorMessage} ${touched && errors ? styles.errorMessageVisible : ''}`}
      >
        {errors}
      </div>
    </div>
  )
};

export default InputGroup;
