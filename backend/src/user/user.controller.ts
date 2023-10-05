import { Controller, Get } from '@nestjs/common';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get('admin/users')
  async getAllUsers() {
    const allUsers = await this.userService.findAllUsers();
    return {
      success: true,
      allUsers,
    };
  }
}
