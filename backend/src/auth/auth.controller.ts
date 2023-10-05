import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { sendResetPasswordLinkEMail } from 'src/utils/sendEmail';
import { sendRefreshToken } from 'src/utils/sendRefreshToken';
import { createAccessToken } from 'src/utils/tokenCreator';
import { AuthService } from './auth.service';
import { Cookies } from './cookie.decorator';
import { Public } from './decorators/public.decorator';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { ForgotPasswordDto } from './dto/forgotPasswordDto';
import { registerUserDto } from './dto/registerUserDto';
import { SignInDto } from './dto/signinDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('/register')
  async registerUser(
    @Res({ passthrough: true }) res: Response,
    @Body() registerProps: registerUserDto,
  ) {
    const response = await this.authService.register(registerProps);
    const { id, email, role, tokenVersion } = response;
    const tokenPayload = {
      userId: id,
      email,
      role,
      tokenVersion,
    };
    sendRefreshToken(res, tokenPayload);
    delete response.tokenVersion;
    return {
      success: true,
      accessToken: createAccessToken(tokenPayload),
      data: {
        ...response,
      },
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async loginUser(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.signIn(body);
    const { id, email, role, tokenVersion } = response;
    const tokenPayload = {
      userId: id,
      email,
      role,
      tokenVersion,
    };
    sendRefreshToken(res, tokenPayload);
    delete response.tokenVersion;
    return {
      success: true,
      accessToken: createAccessToken(tokenPayload),
      data: {
        ...response,
      },
    };
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

  @HttpCode(HttpStatus.OK)
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
      process.env.FORGOT_PASSWORD_SECRET!,
      {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIREDIN,
      },
    );
    try {
      await sendResetPasswordLinkEMail(email, forgotPasswordToken);
      //TODO: Need to add a service to track the email.
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
  async resetPassword(
    @Param('token') token: string,
    @Body() { password, wantToLogOutFromOtherDevices }: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!token) {
      throw new BadRequestException('Invalid input');
    }
    let payload;
    try {
      payload = verify(
        token,
        process.env.FORGOT_PASSWORD_SECRET!,
      ) as JwtPayload;
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: 'Token expired. Please get a new one.',
      });
    }
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    let updatedUser = await this.userService.resetUserPassword(
      payload.email,
      hashedPassword,
      wantToLogOutFromOtherDevices,
    );
    let tokenPayload = {
      userId: updatedUser.id,
      email: updatedUser.email,
      tokenVersion: updatedUser.tokenVersion,
      role: updatedUser.role,
    };
    sendRefreshToken(res, tokenPayload);
    return {
      success: true,
      accessToken: createAccessToken(tokenPayload),
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    sendRefreshToken(res, '');
    return {
      success: true,
      accessToken: '',
    };
  }
}
