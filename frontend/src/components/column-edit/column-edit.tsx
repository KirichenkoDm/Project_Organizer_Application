"use client"

import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputGroup from "../input-group/input-group";
import { Flex, IconButton } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import { useProjectStore } from "@/store/project-store";
import { ColumnValidationSchema } from "../column-creation-form/column-validation";

const check = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

const cross = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
</svg>

interface ColumnEditProps {
  id: number;
  name: string;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnEdit: FC<ColumnEditProps> = ({
  id,
  name,
  setIsEditMode
}) => {
  const projectStore = useProjectStore();
  const initialValues = {
    name: name
  }

  const handleSubmit = async (values: typeof initialValues) => {
    projectStore.editColumn(id, values.name)
    setIsEditMode(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ColumnValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <Flex align="center" justify="center" gap="3">
            <Flex gap="3" justify="center">
              <IconButton type="submit" variant="solid">{check}</IconButton>
              <IconButton
                color="red"
                type="button"
                variant="soft"
                onClick={() => setIsEditMode(false)}
              >
                {cross}
              </IconButton>
            </Flex>
            <InputGroup
              id="name"
              type="text"
              touched={touched.name}
              errors={errors.name}
            />
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default ColumnEdit;
