import { IsNotEmpty } from 'class-validator';
import { UserType } from '../entity/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  role?: UserType;
}
