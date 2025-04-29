import { useUserStore } from "@/store/root-provider";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { RegistrationValidationSchema } from "./registration-validation";
import styles from "@/shared/styles/form.module.css";
import InputGroup from "../input-group/input-group";
interface RegistrationFormProps {
  setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
}


const RegistrationForm: FC<RegistrationFormProps> = ({ setIsNewAccount }) => {
  const userStore = useUserStore();
  return (
    <div className={styles.formWrapper}>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegistrationValidationSchema}
        onSubmit={(values) => {
          userStore.register(values);
        }}
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

            <div>
              <button type="submit" className={styles.submitButton}>Confirm</button>
            </div>

            <div className={styles.switchLink}>
              Already have an account?{" "}
              <span
                onClick={() => setIsNewAccount(false)}
              >
                Sign in
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
