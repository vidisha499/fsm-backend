// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors(); // Essential for frontend connection
//   app.setGlobalPrefix('api'); // This makes the URL http://localhost:3000/api
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // ✅ Load .env variables

  console.log('DATABASE_URL =>', process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();


