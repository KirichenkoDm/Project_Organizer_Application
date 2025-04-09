import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import {
  AuthModule,
  ColumnModule,
  CommentModule,
  JwtAuthGuard,
  ProjectModule,
  RoleModule,
  TaskModule,
  UserModule,
} from "./resourses";
import { APP_GUARD } from "@nestjs/core";

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}
