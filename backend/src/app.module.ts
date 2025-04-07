import { Module } from "@nestjs/common";
import {
  AuthModule,
  ColumnModule,
  CommentModule,
  ProjectModule,
  RoleModule,
  TaskModule,
  UserModule,
} from "./resourses";

@Module({
  imports: [
    UserModule,
    RoleModule,
    ProjectModule,
    ColumnModule,
    TaskModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
