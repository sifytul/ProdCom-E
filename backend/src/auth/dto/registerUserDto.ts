import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
