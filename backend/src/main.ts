import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppModule } from './app.module';
// Get document, or throw exception on error
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1')
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // const config = new DocumentBuilder()
  //   .setTitle('ProdCom-E')
  //   .setDescription(
  //     'An e-commerce web app which is dedicated to deliver authentic gadget items to its consumer...',
  //   )
  //   .setVersion('1.0.0')
  //   .addTag('Auth')
  //   .addTag('Users')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
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
