import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { appImports, appProviders } from "./joined";

@Module({
  imports: appImports,
  controllers: [],
  providers: appProviders
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}
