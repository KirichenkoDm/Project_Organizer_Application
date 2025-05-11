"use client";

import { useProjectStore } from "@/store/project-store";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { TaskValidationSchema } from "./task-validation";
import InputGroup from "../input-group/input-group";
import { Box, Dialog, Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import DateInputGroup from "../input-group/date-input-group";
import { CreateTask } from "@/shared/types/create-task";

const initialValues = {
  name: "",
  description: "",
  start: undefined as Date | undefined,
  end: undefined as Date | undefined,
}

const TaskCreationForm: FC = () => {
  const projectStore = useProjectStore()

  const handleSubmit = (values: typeof initialValues) => {
    const columnId = projectStore.getFirstColumnId;
    const nextOrder = projectStore.getNextOrderForTask(columnId);
    console.log(nextOrder);
    const projectData: CreateTask = {
      ...values,
      order: nextOrder,
      project: { id: projectStore.getId },
      column: { id: columnId },
    };
    projectStore.createTask(projectData)
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <InputGroup
              id="name"
              type="text"
              touched={touched.name}
              errors={errors.name}
              label="Task Name"
            />

            <InputGroup
              id="description"
              type="text"
              touched={touched.description}
              errors={errors.description}
              label="Description"
              as="textarea"
            />

            <DateInputGroup
              id="start"
              label="Start Date"
            />

            <DateInputGroup
              id="end"
              label="End Date"
            />

            <Flex justify="end" gap="3" mt="4">
              <Dialog.Close>
                <AppButton variant="soft" color="red">
                  Cancel
                </AppButton>
              </Dialog.Close>
              <Dialog.Close>
                <AppButton type="submit">Create Task</AppButton>
              </Dialog.Close>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default TaskCreationForm;