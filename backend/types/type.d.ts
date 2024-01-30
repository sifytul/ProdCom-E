import { UserType } from '@/user/entity/user.entity';

export type TTokenPayload = {
  userId: number;
  email: string;
  role: UserType;
  tokenVersion: number;
};
