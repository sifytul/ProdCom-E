import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
export type TRegisterProps = {
  name: string;
  email: string;
  password: string;
};
type TLoginProps = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerProps: TRegisterProps) {
    const createdUser = await this.userService.registerUser(registerProps);
    const payload = {
      id: createdUser.id,
      email: createdUser.email,
      tokenVersion: createdUser.tokenVersion,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      success: true,
      accessToken,
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        tokenVersion: createdUser.tokenVersion,
      },
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
    if (!user || (await compare(user?.password, password))) {
      throw new UnauthorizedException();
    }
    const { password: pass, ...result } = user;
    const payload = {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      success: true,
      accessToken,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tokenVersion: user.tokenVersion,
      },
    };
    return result;
  }
}
