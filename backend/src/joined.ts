import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./resourses/auth/auth.module";
import { ColumnModule } from "./resourses/column/column.module";
import { ColumnEntity } from "./resourses/column/columns.entity";
import { CommentEntity } from "./resourses/comment/comment.entity";
import { CommentModule } from "./resourses/comment/comment.module";
import { ProjectModule } from "./resourses/project/project.module";
import { ProjectEntity } from "./resourses/project/projects.entity";
import { RoleEntity } from "./resourses/role/role.entity";
import { TaskModule } from "./resourses/task/task.module";
import { TaskEntity } from "./resourses/task/tasks.entity";
import { UserEntity } from "./resourses/user/user.entity";
import { UserModule } from "./resourses/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleModule } from "./resourses/role/role.module";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { JwtAuthGuard } from "./resourses/auth/auth.guard";
import { RoleGuard } from "./shared/role.guard";
import { GlobalExceptionFilter } from "./shared/http-exception.filter";
import { ValidationPipe } from "./shared/validation.pipe";

const appModules = [
  UserModule,
  RoleModule,
  ProjectModule,
  ColumnModule,
  TaskModule,
  CommentModule,
  AuthModule,
]

const appEntities = [
  UserEntity,
  RoleEntity,
  ProjectEntity,
  ColumnEntity,
  TaskEntity,
  CommentEntity
]

export const appImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env",
    cache: false,
  }),
  JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  }),
  TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: appEntities
  }),
  ...appModules
]

export const appProviders = [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]

