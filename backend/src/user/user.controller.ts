import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Role, Roles } from '@/auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './decorator/user.decorator';
import { RegisterUserDto } from './dto/registerUserDto';
import { UpdatePasswordDto } from './dto/upadte-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { TTokenPayload } from '@/auth/types/type';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@User() user: TTokenPayload) {
    const me = await this.userService.findOneByEmail(user.email);
    const response = {
      id: me.id,
      name: me.name,
      email: me.email,
      avatar: me.avatar_url,
      role: me.role,
      userSince: me.createdAt,
    };
    return {
      success: true,
      data: response,
    };
  }

  @Patch('me/password/update')
  async updateMyPassword(
    @User() user: TTokenPayload,
    @Body() body: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(user.email, body);
    return {
      success: true,
      message: 'Password successfully changed.',
    };
  }

  @Patch('me/update')
  async updateMe(@User() user: TTokenPayload, @Body() body: UpdateUserDto) {
    await this.userService.updateUser(user.email, body);
    return {
      success: true,
      message: 'User successfully updated.',
    };
  }

  @Patch('me/update/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateMyAvatar(
    @User() user: TTokenPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|jpg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 1,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar?: Express.Multer.File,
  ) {
    const response = await this.userService.updateUserAvatar(
      user.email,
      avatar,
    );
    return {
      success: true,
      message: 'Avatar successfully updated.',
      data: {
        avatarUrl: response?.avatar_url,
      },
    };
  }

  @Roles(Role.ADMIN)
  @Get('admin/users')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort_type') sort_type: 'ASC' | 'DESC' = 'ASC',
    @Query('sort_by') sort_by: string = 'id',
  ) {
    const allUsers = await this.userService.findAllUsers({
      page,
      limit,
      sort_by,
      sort_type,
    });
    return {
      success: true,
      allUsers,
    };
  }

  @Roles(Role.ADMIN)
  @Post('admin/users')
  async createUser(@Body() body: RegisterUserDto) {
    const newUser = await this.userService.registerUser(body);
    return {
      success: true,
      newUser,
    };
  }

  @Roles(Role.ADMIN)
  @Get('admin/users/:id')
  async getUserById(@Param('id') userId: number) {
    const user = await this.userService.findOneById(userId);
    return {
      success: true,
      user,
    };
  }

  @Roles(Role.ADMIN)
  @Patch('admin/users/:id')
  async updateUserById(
    @Param('id') userId: number,
    @Body() body: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUserById(userId, body);
    return {
      success: true,
      updatedUser,
    };
  }

  @Roles(Role.ADMIN)
  @Delete('admin/users/:id')
  async deleteUserById(@Param('id') userId: number) {
    await this.userService.deleteUserById(userId);
    //TODO: need to delete all the orders and address and contact info of the user if user gave permission to delete
    return {
      success: true,
      message: `User with id ${userId} successfully deleted.`,
    };
  }
}
