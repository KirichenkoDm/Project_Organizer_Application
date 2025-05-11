"use client";

import React from "react";
import { useField, useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";
import { Label } from "radix-ui";
import { Box } from "@radix-ui/themes";
import styles from "@/shared/styles/form.module.css";

interface DateInputGroupProps {
  id: string;
  label: string;
}

const DateInputGroup: React.FC<DateInputGroupProps> = ({ id, label }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<Date | undefined>(id);

  return (
    <Box className={styles.inputGroup}>
      <Label.Root htmlFor={id}>{label}:</Label.Root>
      <ReactDatePicker
        id={id}
        selected={field.value ?? null}
        onChange={(val: Date | null) => setFieldValue(id, val)}
        dateFormat="yyyy-MM-dd"
        autoComplete="off"
        className={meta.touched && meta.error ? styles.inputError : ""}
        placeholderText="Leave empty for none"
      />
      {meta.touched && meta.error && (
        <Box className={`${styles.errorMessage} ${styles.errorMessageVisible}`}>
          {meta.error}
        </Box>
      )}
    </Box>
  );
};

export default DateInputGroup;