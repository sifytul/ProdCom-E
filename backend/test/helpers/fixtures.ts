import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserType } from '../../src/user/entity/user.entity';

export const testAdmin = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'Admin123!',
  role: UserType.ADMIN,
};

export const testUser = {
  name: 'Regular User',
  email: 'user@test.com',
  password: 'User123!',
  role: UserType.USER,
};

export const testUser2 = {
  name: 'Second User',
  email: 'user2@test.com',
  password: 'User2123!',
  role: UserType.USER,
};

interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
  role: UserType;
}

export async function createTestUser(
  dataSource: DataSource,
  userData: CreateUserOptions,
): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const userRepo = dataSource.getRepository(User);
  const user = userRepo.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role,
    tokenVersion: 0,
  });

  return userRepo.save(user);
}

export async function createAdminUser(
  dataSource: DataSource,
): Promise<User> {
  return createTestUser(dataSource, testAdmin);
}

export async function createRegularUser(
  dataSource: DataSource,
): Promise<User> {
  return createTestUser(dataSource, testUser);
}

export async function createSecondUser(
  dataSource: DataSource,
): Promise<User> {
  return createTestUser(dataSource, testUser2);
}

export async function cleanTestUsers(dataSource: DataSource): Promise<void> {
  await dataSource.query('DELETE FROM users WHERE email LIKE "%@test.com"');
}