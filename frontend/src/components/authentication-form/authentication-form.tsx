"use client";

import { Form, Formik } from "formik";
import React, { FC } from "react";
import { authValidationSchema } from "./authentication-validation";
import { useUserStore } from "@/store/root-provider";
import styles from "@/shared/styles/form.module.css";
import InputGroup from "../input-group/input-group";

type AuthenticationFormProps = {
  setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticationForm: FC<AuthenticationFormProps> = ({setIsNewAccount}) => {
  const userStore = useUserStore()
  return (
    <div className={styles.formWrapper}>
      <h2>Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={authValidationSchema}
        onSubmit={(values) => {
          userStore.login(values);
        }}
      >
        {({touched, errors}) => (
          <Form>
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

            <div>
              <button type="submit" className={styles.submitButton}>Confirm</button>
            </div>

            <div className={styles.switchLink}>
              Don't have an account?{" "}
              <span
                onClick={() => setIsNewAccount(true)}
              >
                Sign up
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthenticationForm;
