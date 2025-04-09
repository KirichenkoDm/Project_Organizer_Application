import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';

// Попробуем явно загрузить .env перед запуском
dotenv.config();
console.log('В main.ts до bootstrap:', process.env.SECRET_KEY);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('В main.ts после создания приложения:', process.env.SECRET_KEY);
  await app.listen(3000);
}
bootstrap();
