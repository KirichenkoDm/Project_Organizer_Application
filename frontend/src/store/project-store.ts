import { flow, types } from "mobx-state-tree";
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

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
    error: types.maybe(types.string),
  })
  .views((self) => ({
    getProject() {
      return {
        name: self.project!.name,
        description: self.project!.description,
        theme: self.project!.theme,
      }
    },

    getColumns() {
      if (!self.project) return [];
      return self.project.columns
        .slice()
        .sort((a,b) => a.order - b.order);
    },
    getTasksByColumnId(columnId: number) {
      if (!self.project) return [];
      return self.project.tasks
        .filter((task) => task.columnId === columnId)
        .slice()
        .sort((a,b) => a.order - b.order);
    },
  }))
  .actions((self) => {
    const actions = {
      setProject(project: ProjectInstance) {
        self.project = project;
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

      addTask(column: TaskInstance) {
        if (!self.project) return;
        self.project.tasks.push(column);
      },

      loadProject: flow(function* (projectId: Number) {
        try {
          const promises = [];
          promises.push(
            AxiosController.get<GetColumn[]>(
              `/column/project/${projectId}`,
              {"currentProjectId": projectId},
              true
            )
          );

          promises.push(
            AxiosController.get<GetTask[]>(
              `task/project/${projectId}`,
              {"currentProjectId": projectId},
              true
            )
          );

          if (!self.project) {
            promises.push(
              AxiosController.get<GetProject>(
                `/project/${projectId}`,
                {"currentProjectId": projectId},
                true
              )
            );
          }

          const results = yield Promise.all(promises);
          
          if (!self.project) {
            const project = results[2] as GetProject;
            actions.setProject(Project.create(project));
          }

          const columns = results[0] as GetColumn[];
          const columnInstances = columns.map((column) => Column.create(column));
          actions.setColumns(columnInstances);

          const tasks = results[1] as GetTask[];
          const taskInstances = tasks.map((task) => Task.create({
            ...task,
            start: task.start ? new Date(task.start) : undefined,
            end: task.end ? new Date(task.end) : undefined,
          }));
          actions.setTasks(taskInstances);

        } catch (error: any) {
          console.log(error);
          self.error = "Something went wrong during loading project, try again later.";
        }
      }),

      editProject: flow(function* (projectData: EditProject) {
        const project = yield AxiosController.put<ProjectInstance>(
          `/project/${self.project?.id}`,
          projectData,
          true
        );
        actions.setProject(project);
      }),


      deleteProject: flow(function* () {
        const responce = yield AxiosController.delete(
          `/project/${self.project?.id}`,
          true
        )
      }),
    };


    return actions;
  });

export const useProjectStore = () => {
  return useStore().projectStore;
}