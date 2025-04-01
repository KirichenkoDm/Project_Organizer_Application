import "reflect-metadata"
import { ColumnEntity, CommentEntity, ProjectEntity, RoleEntity, TaskEntity, UserEntity } from "../Entities"
import { DataSource } from "typeorm"
import { IDsTypeChange1743518683351 } from "./Migrations/1743518683351-IDsTypeChange"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "156324789",
  database: "project_organizer_application",
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    ProjectEntity,
    RoleEntity,
    ColumnEntity,
    TaskEntity,
    CommentEntity
  ],
  migrations: [IDsTypeChange1743518683351],
  subscribers: [],
})