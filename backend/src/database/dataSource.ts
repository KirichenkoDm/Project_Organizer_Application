import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ColumnEntity, CommentEntity, ProjectEntity, RoleEntity, TaskEntity, UserEntity } from "../resourses";
import { UsersInsert1742896192584 } from "./migrations/1742896192584-UsersInsert";
import { ProjectInsert1742910651015 } from "./migrations/1742910651015-ProjectInsert";
import { RoleInsert1742923160383 } from "./migrations/1742923160383-RoleInsert";
import { ColumnInsert1742924639407 } from "./migrations/1742924639407-ColumnInsert";
import { TaskInsert1742926783780 } from "./migrations/1742926783780-TaskInsert";
import { CommentInsert1742928923624 } from "./migrations/1742928923624-CommentInsert";

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
  migrations: [CommentInsert1742928923624],
  subscribers: [],
});
