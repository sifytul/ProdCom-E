import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cloudinary from 'cloudinary';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));

  let document;
  try {
    document = yaml.load(fs.readFileSync('doc/swagger.yaml', 'utf8'));
  } catch (e) {
    console.log('yaml read error: ', e);
  }
  SwaggerModule.setup('api/v1', app, document);

  // cloudinary config
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
