import { ProjectBuilderData } from "@/shared/types/project-builder-data";
import { Project, ProjectInstance } from "./models/project";
import { Column } from "./models/column";
import { applySnapshot, getSnapshot, unprotect } from "mobx-state-tree";
import { Variant } from "@/shared/types/variant";
import { ProjectThemeEnum } from "@/shared/project-theme.enum";
import { Task } from "./models/task";

function createEmptyProject() {
  return Project.create({
    id: -1,
    name: "",
    theme: ProjectThemeEnum.Humanitarian,
    description: "",
    columns: [],
    tasks: [],
  });
}

interface Builder {
  setProject(): void;
  setColumns(): void;
  setTasks(): void;
  hydrate(): void;
}

export class ProjectBuilder implements Builder {
  private project: ProjectInstance;
  private data: ProjectBuilderData;
  private initialState?: ProjectInstance;

  constructor(data: ProjectBuilderData, initialState?: ProjectInstance) {
    this.data = data;
    if (initialState) {
      this.initialState = Project.create(getSnapshot(initialState));
    }
    this.project = createEmptyProject();

  }

  public reset(): void {
    this.project = createEmptyProject();
  }

  hydrate() {
    if (!this.initialState) return;
    this.project = Project.create(getSnapshot(this.initialState))
  }

  setProject() {
    this.project = Project.create(this.data.projectData);
  };

  setColumns() {
    unprotect(this.project);
    this.project.columns.replace(
      this.data.columnData.map(col => Column.create(col))
    );
  }

  setTasks() {
    unprotect(this.project);
    this.project.tasks.replace(
      this.data.taskData!.map((task) => Task.create({
        ...task,
        start: task.start ? new Date(task.start) : undefined,
        end: task.end ? new Date(task.end) : undefined,
      }))
    );
  };

  getResult() {
    const result = this.project;
    this.reset();
    return result;
  }
}

export class Director {
  private builder: Builder | undefined;
  private variant: Variant;

  constructor(variant: Variant) {
    this.variant = variant;
  }

  public build(): void {
    switch (this.variant) {
      case "full": this.buildFullProject(); break;
      case "without tasks": this.buildProjectWithoutTasks(); break;
      case "predefined": this.buildPredefinedProject(); break;
      case "predefined without tasks": this.buildPredefinedProjectWithoutTasks(); break;
    }
  }

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildPredefinedProject(): void {
    this.builder!.hydrate()
    this.builder!.setColumns();
    this.builder!.setTasks();
  }

  public buildProjectWithoutTasks(): void {
    this.builder!.setProject();
    this.builder!.setColumns();
  }

  public buildPredefinedProjectWithoutTasks(): void {
    this.builder!.hydrate()
    this.builder!.setColumns()
  }

  public buildFullProject(): void {
    this.builder!.setProject();
    this.builder!.setColumns();
    this.builder!.setTasks();
  }
}