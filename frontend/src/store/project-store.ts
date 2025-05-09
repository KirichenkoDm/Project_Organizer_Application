import { applySnapshot, cast, flow, getSnapshot, types } from "mobx-state-tree";
import { Project, ProjectInstance } from "./models/project";
import axios from "axios";
import { useStore } from "./root-provider";
import AxiosController from "./axios-controller";
import { Column, ColumnInstance } from "./models/column";
import { Task, TaskInstance } from "./models/task";
import { GetProject } from "@/shared/types/get-project";
import { GetColumn } from "@/shared/types/get-columns";
import { GetTask } from "@/shared/types/get-tasks";
import { EditProject } from "@/shared/types/edit-project";
import { Director, ProjectBuilder } from "./project-builder";
import { ProjectBuilderData } from "@/shared/types/project-builder-data";
import { Variant } from "@/shared/types/variant";
import { CreateTask } from "@/shared/types/create-task";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
    error: types.maybe(types.string),
  })
  .views((self) => ({
    get getId () {
      if (!self.project) return -1;
      return self.project.id;
    },

    get getProject() {
      if (!self.project) return;
      return {
        name: self.project!.name,
        description: self.project!.description,
        theme: self.project!.theme,
      }
    },

    get getColumns() {
      if (!self.project) return [];
      return self.project.columns
        .slice()
        .sort((a, b) => a.order - b.order);
    },

    get getFirstColumnId() {
      if (!self.project) return -1;
      const firstColumn = self.project.columns.reduce((minColumn, currentColumn) => {
        return currentColumn.order < minColumn.order ? currentColumn : minColumn;
      });

      return firstColumn.id;
    },

    getNextOrderInColumn(columnId: number) {
      if (!self.project || !self.project.tasks.length) return 1;

      const tasksInColumn = self.project.tasks.filter(task => task.columnId === columnId);
      if (!tasksInColumn.length) return 1;

      const maxOrder = tasksInColumn.reduce((max, task) => {
        return task.order > max ? task.order : max;
      }, 0);

      return maxOrder + 1;
    },

    getTasksByColumnId(columnId: number) {
      if (!self.project) return [];
      return self.project.tasks
        .filter((task) => task.columnId === columnId)
        .slice()
        .sort((a, b) => a.order - b.order);
    },
  }))
  .actions((self) => {
    const actions = {
      buildProject(director: Director, data: ProjectBuilderData) {
        const builder = new ProjectBuilder(data, self.project);
        director.setBuilder(builder!);
        director.build();
        actions.setProject(builder!.getResult());
      },

      setProject(project: ProjectInstance) {
        self.project = project;
      },

      delProject() {
        self.project = undefined;
      },

      setColumns(columns: ColumnInstance[]) {
        if (!self.project) return;
        self.project.columns.replace(columns);
      },

      reorderColumns(columnId: number, newOrder: number) {
        if (!self.project) return;

        const columns = self.project.columns.slice().sort((a, b) => a.order - b.order);
        const fromIndex = columns.findIndex(c => c.order === columnId);
        if (fromIndex === -1) return;

        const [movedColumn] = columns.splice(fromIndex, 1);
        columns.splice(newOrder, 0, movedColumn);

        columns.forEach((col, index) => {
          col.order = index;
        });
        self.project.columns.replace(columns);
        //call reorder api
      },

      addColumn(column: ColumnInstance) {
        if (!self.project) return;
        self.project.columns.push(column);
      },

      setTasks(tasks: TaskInstance[]) {
        if (!self.project) return;
        self.project.tasks.replace(tasks);
      },

      createTask: flow(function* (taskData: CreateTask) {
        if (!self.project) return;
        console.log(self.project.id);
        const task = yield AxiosController.post<GetTask[]>(
          `/task`,
          { "currentProjectId": self.project.id },
          taskData,
          true
        );

        if (!self.project?.tasks || self.project.tasks.length === 0) {
          self.project.tasks = cast([task]);
        } else {
          self.project.tasks.push(task);
        }
      }),

      loadProject: flow(function* (projectId: Number) {
        try {
          const promises = [];
          promises.push(
            AxiosController.get<GetColumn[]>(
              `/column/project/${projectId}`,
              { "currentProjectId": projectId },
              true
            )
          );

          if (!self.project) {
            promises.push(
              AxiosController.get<GetProject>(
                `/project/${projectId}`,
                { "currentProjectId": projectId },
                true
              )
            );
          }

          const results = yield Promise.all(promises);

          const tasks = yield AxiosController.get<GetTask[]>(
            `/task/project/${projectId}`,
            { "currentProjectId": projectId },
            true
          );

          const builderData: ProjectBuilderData = {
            projectData: results[1] as GetProject ?? undefined,
            columnData: results[0] as GetColumn[],
            taskData: tasks as GetTask[] ?? undefined,
          }

          let variant: Variant;

          if (!builderData.projectData) {
            if (!builderData.taskData) {
              variant = "predefined without tasks";
            } else {
              variant = "predefined";
            }
          } else if (!builderData.taskData) {
            variant = "without tasks";
          } else {
            variant = "full";
          }

          const director = new Director(variant);

          actions.buildProject(director, builderData);

        } catch (error: any) {
          self.error = "Something went wrong during loading project, try again later.";
        }
      }),

      editProject: flow(function* (projectData: EditProject) {
        const project = yield AxiosController.put<ProjectInstance>(
          `/project/${self.project!.id}`,
          { "currentProjectId": self.project!.id },
          projectData,
          true
        );

        const snapshot = getSnapshot(self.project!);
        const updatedSnapshot = {
          ...snapshot,
          ...project,
        };
        applySnapshot(self.project!, updatedSnapshot);
      }),


      deleteProject: flow(function* () {
        const responce = yield AxiosController.delete(
          `/project/${self.project!.id}`,
          { "currentProjectId": self.project!.id },
          true
        )
        if (responce) {
          actions.delProject();
        }
      }),
    };


    return actions;
  });

export const useProjectStore = () => {
  return useStore().projectStore;
}