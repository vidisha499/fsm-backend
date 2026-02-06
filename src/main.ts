import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // ✅ Fix for "Request Entity Too Large": Allows 50MB photo strings
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();