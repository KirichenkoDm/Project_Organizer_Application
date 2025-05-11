import * as Yup from "yup";

export const ColumnValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Column name must not be empty")
    .min(5, "Column name is too short")
    .max(25, "Column name is too long"),
})
