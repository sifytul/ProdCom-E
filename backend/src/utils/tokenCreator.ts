import { TTokenPayload } from '@/auth/types/type';
import * as jwt from 'jsonwebtoken';

export const createRefreshToken = (payload: TTokenPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIREDIN!,
  });
};

export const createAccessToken = (payload: TTokenPayload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIREDIN!,
  });
};
