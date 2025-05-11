"use client";

import { useProjectStore } from "@/store/project-store";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputGroup from "../input-group/input-group";
import { Box, Dialog, Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import { ColumnValidationSchema } from "./column-validation";

const initialValues = {
  name: "",
}

const ColumnCreationForm: FC = () => {
  const projectStore = useProjectStore()

  const handleSubmit = (values: typeof initialValues) => {
    projectStore.createColumn(values.name)
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={ColumnValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <InputGroup
              id="name"
              type="text"
              touched={touched.name}
              errors={errors.name}
              label="Column Name"
            />

            <Flex justify="end" gap="3" mt="4">
              <Dialog.Close>
                <AppButton variant="soft" color="red">
                  Cancel
                </AppButton>
              </Dialog.Close>
              <Dialog.Close>
                <AppButton type="submit">Create Column</AppButton>
              </Dialog.Close>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ColumnCreationForm;