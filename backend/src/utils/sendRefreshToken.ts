import { Response } from 'express';
import { UserType } from '@/user/entity/user.entity';
import { createRefreshToken } from './tokenCreator';

export const sendRefreshToken = (
  res: Response,
  payload: { userId: number; role: UserType; tokenVersion: number } | string,
) => {
  if (typeof payload === 'string') {
    res.cookie('qid', '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.ENV === 'production',
      sameSite: 'none',
    });
  } else {
    res.cookie('qid', createRefreshToken(payload), {
      httpOnly: true,
      maxAge: 1024 * 60 * 60 * 24 * 3,
      secure: process.env.ENV === 'production',
      sameSite: 'none',
    });
  }
};
