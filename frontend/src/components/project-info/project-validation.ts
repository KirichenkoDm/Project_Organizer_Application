import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import * as Yup from "yup";

export const ProjectUpdateValidationSchema = Yup.object({
  name: Yup.string()
    .required("Project name must not be empty")
    .min(5, "Project name is too short")
    .max(50, "Project name is too long"),
  theme: Yup.string()
    .required("Theme is required")
    .oneOf(Object.values(ProjectThemeEnum), "Invalid theme"),
  description: Yup.string()
    .required("Description must not be empty")
    .min(5, "Description is too short")
    .max(70, "Description is too long"),
});