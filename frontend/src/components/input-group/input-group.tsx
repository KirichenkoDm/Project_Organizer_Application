"use client";

import React from 'react';
import styles from "@/shared/styles/form.module.css";
import { Field } from 'formik';
import { Label } from 'radix-ui';

interface InputGroupProps {
  placeholder?: string;
  id: string;
  type: string;
  touched?: boolean;
  errors?: string;
  label: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder,
  id,
  type,
  touched,
  errors,
  label
}) => {
  return (
    <div className={styles.inputGroup}>
      <Label.Root htmlFor={id}>{label}:</Label.Root>
      <Field
        placeholder={placeholder}
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
