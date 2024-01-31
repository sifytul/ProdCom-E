import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '@/user/user.service';
import {
  TRegisterProps,
  TRegisterResponse,
  TSignInProps,
  TSignInResponse,
} from './types/type';
import { TError } from '@/types/type';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registerProps: TRegisterProps): Promise<TRegisterResponse> {
    const createdUser = await this.userService.registerUser(registerProps);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      avatar: createdUser.avatar_url,
      tokenVersion: createdUser.token_version,
    };
  }

  async signIn({ email, password }: TSignInProps): Promise<TSignInResponse> {
    const user = await this.userService.findOneByEmail(email);
    let errors: TError[] = [];
    if (!user) {
      errors.push({
        field: 'email',
        message: 'wrong credential',
      });
      throw new BadRequestException({
        success: false,
        errors,
      });
    }

    const hasMatch = await compare(password, user?.password);
    if (!hasMatch) {
      errors.push({
        field: 'password',
        message: 'wrong credentials',
      });
      throw new BadRequestException({
        success: false,
        errors,
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar_url,
      tokenVersion: user.tokenVersion,
    };
  }
}
