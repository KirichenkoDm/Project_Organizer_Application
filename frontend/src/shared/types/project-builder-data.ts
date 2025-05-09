import { GetColumn } from "./get-columns"
import { GetProject } from "./get-project"
import { GetTask } from "./get-tasks"

export type ProjectBuilderData = {
  projectData?: GetProject,
  columnData: GetColumn[],
  taskData?: GetTask[],
}