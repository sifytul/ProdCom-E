import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me() {}

  @Patch('me/password/update')
  async updateMyPassword() {}

  @Patch('me/update')
  async updateMe() {}

  @Roles(Role.ADMIN)
  @Get('admin/users')
  async getAllUsers() {
    const allUsers = await this.userService.findAllUsers();
    return {
      success: true,
      allUsers,
    };
  }

  @Roles(Role.ADMIN)
  @Get('admin/users/:id')
  async getUserById() {}

  @Roles(Role.ADMIN)
  @Patch('admin/users/:id')
  async updateUserById() {}

  @Roles(Role.ADMIN)
  @Delete('admin/users/:id')
  async deleteUserById() {}
}
