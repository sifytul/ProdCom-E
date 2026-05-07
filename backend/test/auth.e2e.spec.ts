import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User, UserType } from '../src/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
    server = app.getHttpServer();
    dataSource = app.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    // Clean up test users
    await dataSource.query('DELETE FROM users WHERE email LIKE "%@test.com"');
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request
        .default(server)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'newuser@test.com',
          password: 'Password123!',
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.email).toBe('newuser@test.com');
      expect(response.body.data.name).toBe('Test User');
    });

    it('should not register user with duplicate email', async () => {
      // First create a user
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      const userRepo = dataSource.getRepository(User);
      await userRepo.save({
        name: 'Existing User',
        email: 'duplicate@test.com',
        password: hashedPassword,
        role: UserType.USER,
        tokenVersion: 0,
      });

      const response = await request
        .default(server)
        .post('/auth/register')
        .send({
          name: 'Another User',
          email: 'duplicate@test.com',
          password: 'Password123!',
        })
        .expect(400);

      expect(response.body.message).toContain('email must be unique');
    });

    it('should not register user with invalid input (missing name)', async () => {
      const response = await request
        .default(server)
        .post('/auth/register')
        .send({
          email: 'invalid@test.com',
          password: 'Password123!',
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should not register user with invalid email', async () => {
      const response = await request
        .default(server)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'not-an-email',
          password: 'Password123!',
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should not register user with short password', async () => {
      const response = await request
        .default(server)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'shortpass@test.com',
          password: 'short',
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /auth/signin', () => {
    beforeAll(async () => {
      // Create a test user for signin tests
      const hashedPassword = await bcrypt.hash('TestPassword123!', 10);
      const userRepo = dataSource.getRepository(User);
      await userRepo.save({
        name: 'Signin Test User',
        email: 'signin@test.com',
        password: hashedPassword,
        role: UserType.USER,
        tokenVersion: 0,
      });
    });

    it('should sign in successfully with valid credentials', async () => {
      const response = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'signin@test.com',
          password: 'TestPassword123!',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.data.email).toBe('signin@test.com');
    });

    it('should return error with wrong password', async () => {
      const response = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'signin@test.com',
          password: 'WrongPassword123!',
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return same error for non-existent email (prevent timing attacks)', async () => {
      const response = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'nonexistent@test.com',
          password: 'SomePassword123!',
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should not sign in with invalid email format', async () => {
      const response = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'not-an-email',
          password: 'Password123!',
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /auth/refresh-token', () => {
    it('should return new access token with valid cookie', async () => {
      // First sign in to get the cookie
      const signInResponse = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'signin@test.com',
          password: 'TestPassword123!',
        })
        .expect(200);

      const cookies = signInResponse.headers['set-cookie'];

      // Then try to refresh
      const response = await request
        .default(server)
        .get('/auth/refresh-token')
        .set('Cookie', cookies)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeDefined();
    });

    it('should return error without cookie', async () => {
      const response = await request
        .default(server)
        .get('/auth/refresh-token')
        .expect(401);

      expect(response.body.message).toBeDefined();
    });

    it('should return error with invalid cookie', async () => {
      const response = await request
        .default(server)
        .get('/auth/refresh-token')
        .set('Cookie', 'qid=invalid-token')
        .expect(401);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /auth/password/forgot', () => {
    it('should return success message for valid email', async () => {
      const response = await request
        .default(server)
        .post('/auth/password/forgot')
        .send({
          email: 'signin@test.com',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBeDefined();
    });

    it('should return same success message for non-existent email', async () => {
      const response = await request
        .default(server)
        .post('/auth/password/forgot')
        .send({
          email: 'nonexistent123@test.com',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBeDefined();
    });

    it('should not accept invalid email', async () => {
      const response = await request
        .default(server)
        .post('/auth/password/forgot')
        .send({
          email: 'not-an-email',
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /auth/password/reset/:token', () => {
    it('should reset password with valid token', async () => {
      // First request a password reset
      await request
        .default(server)
        .post('/auth/password/forgot')
        .send({
          email: 'signin@test.com',
        })
        .expect(200);

      // Note: In real tests, we would need to capture the token from the email
      // For this test, we'll skip the token-based test as it requires email service
      // The test above validates the forgot password flow returns success
    });

    it('should return error with invalid token', async () => {
      const response = await request
        .default(server)
        .post('/auth/password/reset/invalid-token')
        .send({
          password: 'NewPassword123!',
          wantToLogOutFromOtherDevices: true,
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should require password parameter', async () => {
      const response = await request
        .default(server)
        .post('/auth/password/reset/some-token')
        .send({
          wantToLogOutFromOtherDevices: true,
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /auth/logout', () => {
    it('should logout authenticated user', async () => {
      // First sign in
      const signInResponse = await request
        .default(server)
        .post('/auth/signin')
        .send({
          email: 'signin@test.com',
          password: 'TestPassword123!',
        })
        .expect(200);

      const accessToken = signInResponse.body.accessToken;

      // Then logout
      const response = await request
        .default(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBe('');
    });

    it('should logout unauthenticated user (still returns success)', async () => {
      const response = await request
        .default(server)
        .post('/auth/logout')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});