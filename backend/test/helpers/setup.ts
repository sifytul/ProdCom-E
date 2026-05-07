import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

export interface TestApp {
  app: INestApplication;
  server: any;
  dataSource: DataSource;
}

export async function setupTestApp(): Promise<TestApp> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  const dataSource = app.get<DataSource>(DataSource);

  return {
    app,
    server: app.getHttpServer(),
    dataSource,
  };
}

export async function cleanupTestApp(app: INestApplication): Promise<void> {
  const dataSource = app.get<DataSource>(DataSource);

  // Clean up test data
  await dataSource.query('DELETE FROM cart_items');
  await dataSource.query('DELETE FROM orders');
  await dataSource.query('DELETE FROM reviews');
  await dataSource.query('DELETE FROM address');
  await dataSource.query('DELETE FROM users');

  await app.close();
}

export function createTestRequest(server: any) {
  return request.default(server);
}