import { flow, types } from "mobx-state-tree";
import { Project, ProjectInstance } from "./models/project";
import axios from "axios";
import { useStore } from "./root-provider";
import { CreateProject } from "@/shared/types/create-project";
import AxiosController from "./axios-controller";
import { Column, ColumnInstance } from "./models/column";
import { Task, TaskInstance } from "./models/task";
import { GetProject } from "@/shared/types/get-project";
import { GetColumn } from "@/shared/types/get-columns";
import { GetTask } from "@/shared/types/get-tasks";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
  })
  .actions((self) => {
    const actions = {
      setProject(project: ProjectInstance) {
        self.project = project;
      },

      setColumns(columns: ColumnInstance[]) {
        if (!self.project) return;
        self.project.columns.replace(columns);
      },

      addColumn(column: ColumnInstance) {
        if (!self.project) return;
        self.project.columns.push(column);
      },

      setTasks(tasks: TaskInstance[]) {
        if (!self.project) return;
        self.project.tasks.replace(tasks);
      },

      addTask(column: TaskInstance) {
        if (!self.project) return;
        self.project.tasks.push(column);
      },

      fetchProject: flow(function* (projectId: Number) {
        const project = yield AxiosController.get<GetProject>(
          `/project/${projectId}`,
          undefined,
          true
        );
        actions.setProject(Project.create(project));
      }),

      fetchColumns: flow(function* (projectId: Number) {
        const columns:GetColumn[] = yield AxiosController.get<GetColumn[]>(
          `/column/project/${projectId}`,
          undefined,
          true
        );
        const columnInstances = columns.map(column => Column.create(column));
        actions.setColumns(columnInstances);
      }),
  
      fetchTasks: flow(function* (projectId: Number) {
        const tasks: GetTask[] = yield AxiosController.get<GetTask[]>(
          `task/project/${projectId}`,
          undefined,
          true
        );
        const taskInstances = tasks.map(task => Task.create(task));
        actions.setTasks(taskInstances);
      }),
    };

    

    return actions;
  });

export const useProjectStore = () => {
  return useStore().projectStore;
}