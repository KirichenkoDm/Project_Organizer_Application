import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ColumnEntity, CommentEntity, ProjectEntity, RoleEntity, TaskEntity, UserEntity } from "../resourses";
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
