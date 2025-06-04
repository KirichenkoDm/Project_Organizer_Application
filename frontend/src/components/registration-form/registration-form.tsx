"use client"

import { Form, Formik } from "formik";
import React, { FC } from "react";
import { RegistrationValidationSchema } from "./registration-validation";
import styles from "@/shared/styles/form.module.css";
import InputGroup from "../input-group/input-group";
import { useUserStore } from "@/store/user-store";
import {useRouter} from "next/navigation";
import { CreateUser } from "@/shared/types/create-user";
import { Box, Heading, Text } from "@radix-ui/themes";
import AppButton from "../app-button/app-button";

interface RegistrationFormProps {
  setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const RegistrationForm: FC<RegistrationFormProps> = ({ setIsNewAccount }) => {
  const router = useRouter()
  const userStore = useUserStore();

  const handleSubmit = async (values: typeof initialValues) => {
    const data: CreateUser = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password
    } 

    await userStore.register(data);
    router.replace("/home");
  }

  return (
    <Box className={styles.formWrapper}>
      <Heading as="h2">Sign Up</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <InputGroup 
              id = "firstName"
              type = "text"
              touched = {touched.firstName}
              errors = {errors.firstName}
              label = "First Name"
            />

            <InputGroup 
              id = "lastName"
              type = "text"
              touched = {touched.lastName}
              errors = {errors.lastName}
              label = "Last Name"
            />

            <InputGroup 
              id = "email"
              type = "email"
              touched = {touched.email}
              errors = {errors.email}
              label = "Email"
            />

            <InputGroup 
              id = "password"
              type = "password"
              touched = {touched.password}
              errors = {errors.password}
              label = "Password"
            />

            <InputGroup 
              id = "confirmPassword"
              type = "password"
              touched = {touched.confirmPassword}
              errors = {errors.confirmPassword}
              label = "Confirm Password"
            />

            <AppButton type="submit">Confirm</AppButton>
          

            <Box className={styles.switchLink}>
              Already have an account?{" "}
              <Text
                onClick={() => setIsNewAccount(false)}
              >
                Sign in
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default RegistrationForm;
