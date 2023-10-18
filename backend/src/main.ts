import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1')
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());

  let document;
  try {
    document = yaml.load(fs.readFileSync('doc/swagger.yaml', 'utf8'));
  } catch (e) {
    console.log('yaml read error: ', e);
  }
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
