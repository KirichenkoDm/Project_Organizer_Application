"use client";

import React from 'react';
import styles from "@/shared/styles/form.module.css";
import { Field } from 'formik';
import { Label } from 'radix-ui';
import { Box } from '@radix-ui/themes';

interface InputGroupProps {
  placeholder?: string;
  id: string;
  type: string;
  touched?: boolean;
  errors?: string;
  label?: string;
  as?: string;
  rows?: number;
  children?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder,
  id,
  type,
  touched,
  errors,
  label,
  as,
  rows = 4,
  children
}) => {
  return (
    <Box className={styles.inputGroup}>
      {
        label
          ? <Label.Root htmlFor={id}>{label}:</Label.Root>
          : null
      }
      <Field
        placeholder={placeholder}
        type={as ? undefined : type}
        id={id}
        name={id}
        as={as}
        rows={as === "textarea" ? rows : undefined}
        className={touched && errors ? styles.inputError : ""}
      >
        {children}
      </Field>
      <Box
        className={`${styles.errorMessage} ${touched && errors ? styles.errorMessageVisible : ''}`}
      >
        {errors}
      </Box>
    </Box>
  )
};

export default InputGroup;
