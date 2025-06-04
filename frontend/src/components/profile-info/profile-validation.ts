import * as Yup from "yup";

export const ProfileValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name is too short")
    .max(30, "First name is too long")
    .required("First name must not be empty"),

  lastName: Yup.string()
    .min(3, "Last name is too short")
    .max(30, "Last name is too long")
    .required("Last name must not be empty"),

  password: Yup.string()
    .min(6, "New Password is too short")
    .max(50, "New Password is too long")
});