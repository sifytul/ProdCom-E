export type TTokenPayload = {
  userId: number;
  email: string;
  role: UserType;
  tokenVersion: number;
};

export type TRegisterProps = {
  name: string;
  email: string;
  password: string;
};

export type TRegisterResponse = {
  id: number;
  name: string;
  email: string;
  role: UserType;
  avatar: string;
  tokenVersion: number;
};

export type TSignInProps = {
  email: string;
  password: string;
};

export type TSignInResponse = {
  id: number;
  name: string;
  email: string;
  role: UserType;
  avatar: string;
  tokenVersion: number;
};
