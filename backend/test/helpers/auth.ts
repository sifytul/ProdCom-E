import * as request from 'supertest';
import { User } from '../../src/user/entity/user.entity';

export interface AuthCookies {
  'Set-Cookie'?: string[];
}

export interface SignedInUser {
  accessToken: string;
  user: User;
  cookies: string;
}

export async function signInAsUser(
  server: any,
  email: string,
  password: string,
): Promise<SignedInUser> {
  const response = await request.default(server)
    .post('/auth/signin')
    .send({ email, password })
    .expect(200);

  const cookies = response.headers['set-cookie']?.join('; ') || '';

  return {
    accessToken: response.body.accessToken,
    user: response.body.data,
    cookies,
  };
}

export async function signInAsAdmin(server: any): Promise<SignedInUser> {
  return signInAsUser(server, 'admin@test.com', 'Admin123!');
}

export async function signInAsRegularUser(server: any): Promise<SignedInUser> {
  return signInAsUser(server, 'user@test.com', 'User123!');
}

export function getAuthHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export function getAuthCookie(cookies: string): Record<string, string> {
  return {
    Cookie: cookies,
  };
}

export async function logout(server: any, accessToken: string): Promise<void> {
  await request
    .default(server)
    .post('/auth/logout')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);
}