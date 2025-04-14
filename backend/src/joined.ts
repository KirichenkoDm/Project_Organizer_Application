import { AuthModule } from "./resourses/auth/auth.module";
import { ColumnModule } from "./resourses/column/column.module";
import { ColumnEntity } from "./resourses/column/columns.entity";
import { CommentEntity } from "./resourses/comment/comment.entity";
import { CommentModule } from "./resourses/comment/comment.module";
import { ProjectModule } from "./resourses/project/project.module";
import { ProjectEntity } from "./resourses/project/projects.entity";
import { RoleEntity } from "./resourses/role/role.entity";
import { TaskEntity, TaskModule } from "./resourses/task";
import { UserEntity } from "./resourses/user/user.entity";
import { UserModule } from "./resourses/user/user.module";

export const appModules = [
  UserModule,
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