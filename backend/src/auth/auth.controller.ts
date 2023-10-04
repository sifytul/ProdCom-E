import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { sendResetPasswordLinkEMail } from 'src/utils/sendEmail';
import { sendRefreshToken } from 'src/utils/sendRefreshToken';
import { createAccessToken } from 'src/utils/tokenCreator';
import { AuthService } from './auth.service';
import { Cookies } from './cookie.decorator';
import { ForgotPasswordDto } from './dto/forgotPasswordDto';
import { registerUserDto } from './dto/registerUserDto';
import { SignInDto } from './dto/signinDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async registerUser(
    @Res({ passthrough: true }) res: Response,
    @Body() registerProps: registerUserDto,
  ) {
    const response = await this.authService.register(registerProps);
    const {
      data: { id, email, role, tokenVersion },
    } = response;
    const tokenPayload = {
      userId: id,
      email,
      role,
      tokenVersion: tokenVersion,
    };
    sendRefreshToken(res, tokenPayload);
    delete response.data.tokenVersion;
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async loginUser(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.signIn(body);
    const {
      data: { id, email, role, tokenVersion },
    } = response;
    const tokenPayload = {
      userId: id,
      email,
      role,
      tokenVersion: tokenVersion,
    };
    sendRefreshToken(res, tokenPayload);
    delete response.data.tokenVersion;
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh-token')
  async getRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Cookies('jid') jid: string,
  ) {
    if (!jid) {
      throw new UnauthorizedException({ success: false, accessToken: '' });
    }

    let verified;
    try {
      verified = verify(jid, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
      if (!verified) {
        throw new UnauthorizedException({ success: false, accessToken: '' });
      }
    } catch (err) {
      throw new UnauthorizedException({ success: false, accessToken: '' });
    }
    const isUserExisted = await this.userService.findOneByEmail(verified.email);
    if (!isUserExisted) {
      throw new UnauthorizedException({ success: false, accessToken: '' });
    }

    if (verified.tokenVersion !== isUserExisted.tokenVersion) {
      throw new UnauthorizedException({ success: false, accessToken: '' });
    }
    const tokenPayload = {
      userId: verified.id,
      email: verified.email,
      role: verified.role,
      tokenVersion: verified.tokenVersion,
    };
    sendRefreshToken(res, tokenPayload);

    return {
      success: true,
      accessToken: createAccessToken(tokenPayload),
    };
  }

  @Post('password/forgot')
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    const isUserExist = await this.userService.findOneByEmail(email);
    if (!isUserExist) {
      return {
        success: true,
        message:
          'Sent an email with reset link if the email is valid. Check your inbox',
      };
    }
    let forgotPasswordToken = sign(
      { email },
      process.env.FORGET_PASSWORD_SECRET!,
      {
        expiresIn: '15m',
      },
    );
    try {
      await sendResetPasswordLinkEMail(email, forgotPasswordToken);
    } catch (err) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Some error occured. Please try again.',
      });
    }
    return {
      success: true,
      message:
        'Sent an email with reset link if the email is valid. Check your inbox',
    };
  }

  @Post('password/reset/:token')
  async resetPassword() {}

  @Post('logout')
  async logout() {}
}
