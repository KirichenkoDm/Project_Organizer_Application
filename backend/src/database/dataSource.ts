import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { IDsTypeChange1743518683351 } from "./migrations/1743518683351-IDsTypeChange";
import { 
  ColumnEntity,
  CommentEntity,
  RoleEntity,
  TaskEntity,
  UserEntity,
} from "src/resourses";
import { ProjectEntity } from "src/resourses/project/projects.entity";

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
  migrations: [IDsTypeChange1743518683351],
  subscribers: [],
});
