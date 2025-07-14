import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { InitialCreation1742833962934 } from "./migrations/1-InitialCreation";
import { UniqueConstraints1743002916366 } from "./migrations/2-UniqueConstraints";
import { UsersInsert1742896192584 } from "./migrations/3-UsersInsert";
import { ProjectInsert1742910651015 } from "./migrations/4-ProjectInsert";
import { RoleInsert1742923160383 } from "./migrations/5-RoleInsert";
import { ColumnInsert1742924639407 } from "./migrations/6-ColumnInsert";
import { TaskInsert1742926783780 } from "./migrations/7-TaskInsert";
import { CommentInsert1742928923624 } from "./migrations/8-CommentInsert";
import { UserEntity } from "../resourses/user/user.entity";
import { ProjectEntity } from "../resourses/project/projects.entity";
import { RoleEntity } from "../resourses/role/role.entity";
import { ColumnEntity } from "../resourses/column/columns.entity";
import { TaskEntity } from "../resourses/task/tasks.entity";
import { CommentEntity } from "../resourses/comment/comment.entity";
import { AdminRole1752498382339 } from "./migrations/1752498382339-AdminRole";

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
  migrations: [
    InitialCreation1742833962934,
    UniqueConstraints1743002916366,
    UsersInsert1742896192584,
    ProjectInsert1742910651015,
    RoleInsert1742923160383,
    ColumnInsert1742924639407,
    TaskInsert1742926783780,
    CommentInsert1742928923624,
    AdminRole1752498382339,
  ],
  subscribers: [],
});
