import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category_name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;
}
