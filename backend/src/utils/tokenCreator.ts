import * as jwt from 'jsonwebtoken';
import { TTokenPayload } from 'types/type';

export const createRefreshToken = (payload: TTokenPayload) => {
  console.log(process.env.REFRESH_TOKEN_EXPIREDIN);
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIREDIN!,
  });
};

export const createAccessToken = (payload: TTokenPayload) => {
  console.log(process.env.ACCESS_TOKEN_EXPIREDIN);
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIREDIN!,
  });
};
