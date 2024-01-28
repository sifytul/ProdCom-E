import { Response } from 'express';
import { UserType } from '@/user/entity/user.entity';
import { createRefreshToken } from './tokenCreator';

export const sendRefreshToken = (
  res: Response,
  payload: { userId: number; role: UserType; tokenVersion: number } | string,
) => {
  const expiredIn = process.env.REFRESH_TOKEN_EXPIREDIN;
  let maxAge = expiredIn.includes('d')
    ? parseInt(expiredIn.replace('d', '')) * 24 * 60
    : expiredIn.includes('h')
    ? parseInt(expiredIn.replace('h', '')) * 60
    : expiredIn.includes('m') && parseInt(expiredIn.replace('m', ''));

  if (typeof payload === 'string') {
    res.cookie(process.env.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.ENV === 'production',
      sameSite: 'none',
    });
  } else {
    res.cookie(process.env.REFRESH_TOKEN_NAME, createRefreshToken(payload), {
      httpOnly: true,
      maxAge: 1024 * 60 * maxAge,
      secure: process.env.ENV === 'production',
      sameSite: 'none',
    });
  }
};
