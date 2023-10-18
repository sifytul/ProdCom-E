import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;

  @IsOptional()
  @IsBoolean()
  wantToLogOutFromOtherDevices?: boolean;
}
