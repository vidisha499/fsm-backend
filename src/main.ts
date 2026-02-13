import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enhanced CORS for Mobile/Ionic
  // This resolves the "CORS error" seen in your browser console
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix('api');
  
  // 2. Dynamic Port for Vercel
  // Vercel requires the app to listen on the port it provides
  const port = process.env.PORT || 3000;
  
  // 3. Remove '0.0.0.0' for Vercel deployment
  // While good for local mobile testing, it can cause issues in serverless environments
  await app.listen(port);
  
  console.log(`Server running on port ${port}`);
}
bootstrap();