import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { appEntities, appModules } from "./joined";
import { ConfigModule } from "@nestjs/config";
import { RoleGuard } from "./shared/role.guard";
import { RoleModule } from "./resourses/role/role.module";
import { JwtAuthGuard } from "./resourses/auth/auth.guard";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
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
    RoleModule,
    ...appModules
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}
