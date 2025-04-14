import {
  AuthModule,
  ColumnEntity,
  ColumnModule,
  CommentEntity,
  CommentModule,
  RoleEntity,
  RoleModule,
  TaskEntity,
  TaskModule,
  UserEntity,
  UserModule,
} from "./resourses";
import { ProjectModule } from "./resourses/project/project.module";
import { ProjectEntity } from "./resourses/project/projects.entity";

export const appModules = [
  UserModule,
  RoleModule,
  ProjectModule,
  ColumnModule,
  TaskModule,
  CommentModule,
  AuthModule,
]

export const appEntities = [
  UserEntity,
  RoleEntity,
  ProjectEntity,
  ColumnEntity,
  TaskEntity,
  CommentEntity
]