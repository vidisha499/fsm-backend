import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Essential for frontend connection
  app.setGlobalPrefix('api'); // This makes the URL http://localhost:3000/api
  await app.listen(3000);
}
bootstrap();
