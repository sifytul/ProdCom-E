import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '@/user/user.service';
import {
  TRegisterProps,
  TRegisterResponse,
  TSignInProps,
  TSignInResponse,
} from './types/type';

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

    // Use constant-time comparison to prevent timing attacks
    // Return generic error regardless of whether user exists or password is wrong
    const hasMatch = user ? await compare(password, user.password) : false;

    if (!user || !hasMatch) {
      throw new BadRequestException({
        success: false,
        errors: [
          {
            field: 'credentials',
            message: 'Invalid email or password',
          },
        ],
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
