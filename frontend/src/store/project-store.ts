import { applySnapshot, cast, flow, getRoot, getSnapshot, types } from "mobx-state-tree";
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
import { ReorderAction } from "@/shared/types/reorder-action";
import { CreateColumn } from "@/shared/types/create-column";
import { RootStoreInstance } from "./root-instance";
import { EditTask } from "@/shared/types/edit-task";

export const ProjectStore = types
  .model("ProjectStore", {
    project: types.maybe(Project),
    error: types.maybe(types.string),
  })
  .views((self) => {
    const views = {
      get getId() {
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

      get getTasks() {
        if (
          !self.project ||
          !self.project.tasks ||
          self.project.tasks.length === 0
        ) return [];

        return self.project.tasks;
      },

      get getFirstColumnId() {
        if (!self.project) return -1;
        const firstColumn = self.project.columns.reduce((minColumn, currentColumn) => {
          return currentColumn.order < minColumn.order ? currentColumn : minColumn;
        });

        return firstColumn.id;
      },

      get getNextOrderForColumn() {
        if (!self.project || !self.project.columns.length) return 1;

        const columnsInProject = views.getColumns;
        if (!columnsInProject.length) {
          self.error = "Error hapened during getting columns."
        };

        return columnsInProject[columnsInProject.length - 1].order + 1;
      },

      getColumn(columnId: number) {
        return self.project?.columns.find(col => col.id === columnId);
      },


      getTask(taskId: number) {
        return self.project?.tasks.find(tsk => tsk.id === taskId);
      },

      getTasksByColumnId(columnId: number) {
        if (!self.project) return [];
        return self.project.tasks
          .filter((task) => task.columnId === columnId)
          .slice()
          .sort((a, b) => a.order - b.order);
      },

      getNextOrderForTask(columnId: number) {
        if (!self.project || !self.project.tasks.length) return 1;

        const tasksInColumn = views.getTasksByColumnId(columnId);
        if (!tasksInColumn.length) return 1;

        return tasksInColumn[tasksInColumn.length - 1].order + 1;
      },

      isFirstColumn(columnId: number) {
        const column = views.getColumn(columnId);
        if (!column) return false;

        const columns = views.getColumns;

        return columns[0]?.id === columnId;
      },

      isLastColumn(columnId: number) {
        const column = views.getColumn(columnId);
        if (!column) return false;

        const columns = views.getColumns;

        return columns[columns.length - 1].id === columnId;
      },

      isFirstTask(taskId: number) {
        const task = views.getTask(taskId);
        if (!task) return false;

        const tasksInColumn = views.getTasksByColumnId(task.columnId);

        return tasksInColumn[0]?.id === taskId;
      },

      isLastTask(taskId: number) {
        const task = views.getTask(taskId);
        if (!task) return false;

        const tasksInColumn = views.getTasksByColumnId(task.columnId);

        return tasksInColumn[tasksInColumn.length - 1].id === taskId;
      }
    }
    return views
  })
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

      createColumn: flow(function* (columnName: string) {
        if (!self.project) return;

        const columnData: CreateColumn = {
          project: { id: self.project.id },
          name: columnName,
          order: self.getNextOrderForColumn,
          isCustom: true
        }

        const column = yield AxiosController.post<GetTask[]>(
          "/column",
          { "currentProjectId": self.project.id },
          columnData,
          true
        );

        self.project.columns.push(Column.create(column));
      }),

      editColumn: flow(function* (columnId: number, newColumnName: string) {
        if (!self.project) return;
        const column = yield AxiosController.put(
          `/column/${columnId}`,
          { currentProjectId: self.project.id },
          {name: newColumnName},
          true,
        )

        const existingColumnIndex = self.project.columns.findIndex(col => col.id === column.id);
        if (
          existingColumnIndex !== undefined &&
          existingColumnIndex !== -1
        ) {
          const columnToUpdate = self.project.columns[existingColumnIndex];
          applySnapshot(columnToUpdate, column);
        }
      }),

      deleteColumn: flow(function* (columnId: number) {
        if (!self.project) return;
        const result = yield AxiosController.delete(
          `/column/${columnId}`,
          { currentProjectId: self.project.id },
          true,
        );

        if (!result.isSuccess) {
          self.error = "Column was not deleted.";
          return
        }

        const columnIndex = self.project.columns.findIndex(col => col.id === columnId);;
        if (columnIndex !== -1) {
          self.project.columns.splice(columnIndex, 1);
        }
      }),

      reorderColumn: flow(function* (columnId: number, reorderAction: ReorderAction) {
        const column = self.project?.columns.find(col => col.id === columnId);
        if (!column) {
          self.error = "Column to reorder not found";
          return;
        }

        let newOrder = column.order;
        if (reorderAction === "increment") {
          if (self.isLastColumn(columnId)) return;
          newOrder++;
        } else {
          if (self.isFirstColumn(columnId)) return;
          newOrder--;
        }

        const updatedColumn = yield AxiosController.put<GetColumn[]>(
          `column/${columnId}/reorder/${newOrder}`,
          { "currentProjectId": self.project!.id },
          undefined,
          true
        )

        updatedColumn.forEach((column: GetColumn) => {
          const existingColumn = self.project?.columns.find(tsk => tsk.id === column.id);
          if (existingColumn) {
            existingColumn.order = column.order;
          }
        });
      }),

      createTask: flow(function* (taskData: CreateTask) {
        if (!self.project) return;
        const task = yield AxiosController.post<GetTask[]>(
          `/task`,
          { "currentProjectId": self.project.id },
          taskData,
          true
        );

        if (!self.project?.tasks || self.project.tasks.length === 0) {
          self.project.tasks = cast([Task.create({
            ...task,
            start: task.start ? new Date(task.start) : undefined,
            end: task.end ? new Date(task.end) : undefined,
          })]);
        } else {
          self.project.tasks.push(Task.create({
            ...task,
            start: task.start ? new Date(task.start) : undefined,
            end: task.end ? new Date(task.end) : undefined,
          }));
        }
      }),

      editTask: flow(function* (taskId: number, taskData: EditTask) {
        if (!self.project) return null;
        const updatedTask = yield AxiosController.put<GetTask>(
          `/task/${taskId}`,
          { "currentProjectId": self.project.id },
          taskData,
          true,
        );

        const existingTaskIndex = self.project?.tasks.findIndex(tsk => tsk.id === updatedTask.id);
        if (
          existingTaskIndex !== undefined &&
          existingTaskIndex !== -1
        ) {
          const processedTask = {
            ...updatedTask,
            start: updatedTask.start ? new Date(updatedTask.start) : undefined,
            end: updatedTask.end ? new Date(updatedTask.end) : undefined,
          };


          const taskToUpdate = self.project.tasks[existingTaskIndex];
          applySnapshot(taskToUpdate, processedTask);
        }
      }),

      unblockTask: flow(function* (taskId) {
        if (!self.project) return null;
        const result = yield AxiosController.put<GetTask>(
          `/task/${taskId}`,
          { "currentProjectId": self.project.id },
          { task: null },
          true,
        );

        if (!result) {
          self.error = "Task wasn't unblocked";
          return;
        }

        const taskIndex = self.project?.tasks.findIndex(tsk => tsk.id === taskId);
        self.project.tasks[taskIndex].blockedBy = undefined;
        self.project.tasks[taskIndex].blockedByName = undefined;
      }),

      changeTaskState: flow(function* (taskId, targetColumnId) {
        if (!self.project) return null;
        const result = yield AxiosController.put<GetTask>(
          `/task/${taskId}`,
          { "currentProjectId": self.project.id },
          { column: { id: targetColumnId } },
          true,
        );

        if (!result) {
          self.error = "Task's state wasn't updated";
          return;
        }

        const taskIndex = self.project?.tasks.findIndex(tsk => tsk.id === taskId);
        self.project.tasks[taskIndex].columnId = targetColumnId;
      }),

      reorderTask: flow(function* (taskId: number, reorderAction: ReorderAction) {
        const task = self.project?.tasks.find(tsk => tsk.id === taskId);
        if (!task) {
          self.error = "Task to reorder not found";
          return;
        }

        let newOrder = task.order;
        if (reorderAction === "increment") {
          if (self.isLastTask(taskId)) return;
          newOrder++;
        } else {
          if (self.isFirstTask(taskId)) return;
          newOrder--;
        }

        const updatedTasks = yield AxiosController.put<GetTask[]>(
          `task/${taskId}/reorder/${newOrder}`,
          { "currentProjectId": self.project!.id },
          undefined,
          true,
        )

        updatedTasks.forEach((task: GetTask) => {
          const existingTask = self.project?.tasks.find(tsk => tsk.id === task.id);
          if (existingTask) {
            existingTask.order = task.order;
          }
        });
      }),

      assignContributor: flow(function* (taskId: number, assignedId: number) {
        if (!self.project) return;
        const updatedTask = yield AxiosController.put<GetTask>(
          `/task/${taskId}`,
          { "currentProjectId": self.project!.id },
          { user: { id: assignedId } },
          true,
        );

        const existingTask = self.project?.tasks.find(tsk => tsk.id === updatedTask.id);
        if (existingTask) {
          existingTask.assignedId = updatedTask.assignedId;
        }

        const rootStore = getRoot<RootStoreInstance>(self);
        rootStore.userStore.fetchAssigned(updatedTask.assignedId);
      }),

      deleteTask: flow(function* (taskId: number) {
        if (!self.project) return;
        const result = yield AxiosController.delete(
          `/task/${taskId}`,
          { "currentProjectId": self.project.id },
          true,
        );

        if (!result.isSuccess) {
          self.error = "Task was not deleted.";
          return
        }

        const taskIndex = self.project.tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
          self.project.tasks.splice(taskIndex, 1);

          self.project.tasks.forEach(task => {
            if (task.blockedBy === taskId) {
              task.blockedBy = undefined;
              task.blockedByName = undefined;
            }
          });
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