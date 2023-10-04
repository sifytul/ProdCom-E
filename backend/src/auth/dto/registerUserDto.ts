import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class registerUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

class UserResponseData {
  id: number;
  name: string;
  email: string;
}

export class RegisterResponseDto {
  success: boolean;

  accessToken: string;

  data: UserResponseData;
}
