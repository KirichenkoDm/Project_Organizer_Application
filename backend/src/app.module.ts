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
  UserEntity,
  UserModule,
} from "./resourses";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { appEntities, appModules } from "./joined";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env", 
      cache: false,
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
