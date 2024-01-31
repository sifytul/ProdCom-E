import { Response } from 'express';
import { createRefreshToken } from './tokenCreator';
import { TTokenPayload } from '@/auth/types/type';

export const sendRefreshToken = (
  res: Response,
  payload: TTokenPayload | string,
) => {
  const expiredIn = process.env.REFRESH_TOKEN_EXPIREDIN!;
  let maxAge = expiredIn.includes('d')
    ? parseInt(expiredIn.replace('d', '')) * 24 * 60
    : expiredIn && expiredIn.includes('h')
    ? parseInt(expiredIn.replace('h', '')) * 60
    : expiredIn && expiredIn.includes('m')
    ? parseInt(expiredIn.replace('m', ''))
    : 1;

  if (typeof payload === 'string') {
    res.cookie(process.env.REFRESH_TOKEN_NAME!, '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'lax',
    });
  } else {
    res.cookie(process.env.REFRESH_TOKEN_NAME!, createRefreshToken(payload), {
      httpOnly: true,
      maxAge: 1024 * 60 * maxAge,
      secure: process.env.ENV === 'production',
      sameSite: process.env.ENV === 'production' ? 'none' : 'lax',
    });
  }
};
