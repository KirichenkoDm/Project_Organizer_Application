import {
  AuthModule,
  ColumnEntity,
  ColumnModule,
  CommentEntity,
  CommentModule,
  ProjectEntity,
  ProjectModule,
  RoleEntity,
  RoleModule,
  TaskEntity,
  TaskModule,
  UserEntity,
  UserModule,
} from "./resourses";

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