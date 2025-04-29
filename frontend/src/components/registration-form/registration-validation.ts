import * as Yup from "yup";

export const RegistrationValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name is too short")
    .max(30, "First name is too long")
    .required("First name must not be empty"),

  lastName: Yup.string()
    .min(3, "Last name is too short")
    .max(30, "Last name is too long")
    .required("Last name must not be empty"),

  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password is too short")
    .max(50, "Password is too long")
    .required("Password must not be empty"),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});