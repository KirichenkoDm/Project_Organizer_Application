import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import * as Yup from "yup";

export const TaskValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Task name must not be empty")
    .min(5, "Task name is too short")
    .max(30, "Task name is too long"),
  description: Yup.string()
    .required("Description must not be empty")
    .min(5, "Description is too short")
    .max(50, "Description is too long"),
  start: Yup.date()
    .optional()
    .typeError("Must be a valid date")
    .transform((curr, orig) => (orig ? curr : null)),
  end: Yup.date()
    .optional()
    .typeError("Must be a valid date")
    .transform((curr, orig) => (orig ? curr : null)),
}).test({
  name: "end-after-start",
  message: "End must be after start",
  test: function () {
    const parent = this.parent as { start?: Date; end?: Date } | undefined;
    if (!parent) return true;

    const { start, end } = parent;

    if (!start || !end) return true;
    return end > start;
  },
})
