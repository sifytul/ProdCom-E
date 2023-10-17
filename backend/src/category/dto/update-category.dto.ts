import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name?: string;
  @IsNotEmpty()
  @IsString()
  description?: string;
}
