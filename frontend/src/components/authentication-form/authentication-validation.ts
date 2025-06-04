import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const authValidationSchema = Yup.object({
  email: Yup
    .string()
    .matches(emailRegex, "Email must be a valid email address")
    .required("Email is required"),
  password: Yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot be longer than 50 characters")
    .required("Password is required"),
});