import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { IDsTypeChange1743518683351 } from "./migrations/1743518683351-IDsTypeChange";
import { ProjectEntity } from "src/resourses/project/projects.entity";
import { UserEntity } from "src/resourses/user/user.entity";
import { RoleEntity } from "src/resourses/role/role.entity";
import { ColumnEntity } from "src/resourses/column/columns.entity";
import { TaskEntity } from "src/resourses/task";
import { CommentEntity } from "src/resourses/comment/comment.entity";
import { ColumnNameRenaming1744646418265 } from "./migrations/1744646418265-ColumnNameRenaming";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    ProjectEntity,
    RoleEntity,
    ColumnEntity,
    TaskEntity,
    CommentEntity,
  ],
  migrations: [ColumnNameRenaming1744646418265],
  subscribers: [],
});
