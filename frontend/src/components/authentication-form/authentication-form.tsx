"use client";

import { Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { authValidationSchema } from "./authentication-validation";
import styles from "@/shared/styles/form.module.css";
import InputGroup from "../input-group/input-group";
import { useUserStore } from "@/store/user-store";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import AppButton from "../app-button/app-button";
import { observer } from "mobx-react-lite";

type AuthenticationFormProps = {
  setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = { email: "", password: "" }

const AuthenticationForm: FC<AuthenticationFormProps> = observer(({ setIsNewAccount }) => {
  const userStore = useUserStore()
  const errorMessage = userStore.errorMessage;

  const handleSubmit = async (values: typeof initialValues) => {
    await userStore.login(values);
  }

  return (
    <Box className={styles.formWrapper}>

      <Heading as="h2">Sign In</Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={authValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values }) => {

          useEffect(() => {
            if (errorMessage && !errors.email && !errors.password) {
              userStore.setError(undefined);
            }
          }, [values.email, values.password]);

          return (
            <Form>
              <InputGroup
                id="email"
                type="email"
                touched={touched.email}
                errors={errors.email}
                label="Email"
              />

              <InputGroup
                id="password"
                type="password"
                touched={touched.password}
                errors={errors.password}
                label="Password"
              />
              {
                errorMessage
                  ? <Text className={`${styles.errorMessage} ${styles.errorMessageVisible}`}>{errorMessage}</Text>
                  : null
              }

              <AppButton
                type="submit"
              >
                Confirm
              </AppButton>


              <Box className={styles.switchLink}>
                Don't have an account?{" "}
                <Text
                  onClick={() => setIsNewAccount(true)}
                >
                  Sign up
                </Text>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </Box>
  );
});

export default AuthenticationForm;
