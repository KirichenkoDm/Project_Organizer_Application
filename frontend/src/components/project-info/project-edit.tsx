"use client"

import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputGroup from "../input-group/input-group";
import { Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import styles from "./project-info.module.css";
import { ProjectUpdateValidationSchema } from "./project-validation";
import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import { useProjectStore } from "@/store/project-store";
import { EditProject } from "@/shared/types/edit-project";

interface ProjectEditProps {
  project: EditProject;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectEdit: FC<ProjectEditProps> = ({
  project,
  setIsEditMode
}) => {
  const projectStore = useProjectStore();
  const initialValues = { ...project }

  const handleSubmit = async (values: typeof initialValues) => {
    const data = { ...values };
    await projectStore.editProject(data);
    setIsEditMode(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProjectUpdateValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form className={styles.projectEditContainer}>
          <InputGroup
            id="name"
            type="text"
            touched={touched.name}
            errors={errors.name}
            label="Project Name"
          />

          <InputGroup
            id="theme"
            type="text"
            touched={touched.theme}
            errors={errors.theme}
            label="Theme"
            as="select"
          >
            {Object.entries(ProjectThemeEnum).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </InputGroup>

          <InputGroup
            id="description"
            type="text"
            touched={touched.description}
            errors={errors.description}
            label="Description"
            as="textarea"
          />

          <Flex gap="3" mt="2" justify="end">
            <AppButton
              color="red"
              type="button"
              variant="soft"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </AppButton>
            <AppButton type="submit" variant="solid">Save</AppButton>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default ProjectEdit;
