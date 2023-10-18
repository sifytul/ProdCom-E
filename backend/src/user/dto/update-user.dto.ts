import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../entity/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  role?: UserType;
}
