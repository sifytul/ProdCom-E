import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '@/user/user.service';
export type TRegisterProps = {
  name: string;
  email: string;
  password: string;
};
type TLoginProps = {
  email: string;
  password: string;
};

type TErrors = { field: string; message: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerProps: TRegisterProps) {
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

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    let errors: TErrors[] = [];
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
