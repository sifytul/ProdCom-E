import { Response } from 'express';
import { UserType } from '@/user/entity/user.entity';
import { createRefreshToken } from './tokenCreator';

export const sendRefreshToken = (
  res: Response,
  payload: { userId: number; role: UserType; tokenVersion: number } | string,
) => {
  if (typeof payload === 'string') {
    res.cookie(process.env.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'lax',
    });
  } else {
    res.cookie(process.env.REFRESH_TOKEN_NAME, createRefreshToken(payload), {
      httpOnly: true,
      maxAge: 1024 * 60 * 60 * 24 * 3,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'lax',
    });
  }
};
