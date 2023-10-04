import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsBoolean()
  wantToLogOutFromOtherDevices: boolean;
}
