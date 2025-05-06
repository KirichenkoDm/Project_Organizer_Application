"use client"

import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import { useProjectStore } from "@/store/project-store";
import { useUserStore } from "@/store/user-store";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import styles from "@/shared/styles/form.module.css";
import { ProjectValidationSchema } from "./project-validation";
import InputGroup from "../input-group/input-group";
import { Dialog, Flex } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";
import { useHomeProjectsStore } from "@/store/home-projects-store";

const initialValues = {
  name: "",
  theme: ProjectThemeEnum.ComputerScience,
  description: "",
}

const ProjectCreationForm: FC = () => {
  const userStore = useUserStore();
  const homeProjectsStore = useHomeProjectsStore()
  
  const handleSubmit = (values: typeof initialValues) => {
    const projectData = {
      ...values,
      creatorId: userStore.user!.id
    };
    
    homeProjectsStore.createProject(projectData)
  }

  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={ProjectValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
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

            <Flex justify="end" gap="3">
              <Dialog.Close>
                <AppButton variant="soft" color="red">
                  Cancel
                </AppButton>
              </Dialog.Close>
              <Dialog.Close>
                <AppButton type="submit">Create Project</AppButton>
              </Dialog.Close>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProjectCreationForm;