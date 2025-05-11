import * as Yup from "yup";

export const TaskEditValidationSchema = Yup.object({
  name: Yup.string()
    .required("Task name must not be empty")
    .min(5, "Task name is too short")
    .max(30, "Task name is too long"),
  description: Yup.string()
    .required("Description must not be empty")
    .min(5, "Description is too short")
    .max(50, "Description is too long"),
  taskId: Yup.number()
});