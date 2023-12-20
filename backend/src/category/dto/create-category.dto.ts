import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name: string;
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  categoryImageUrl?: string;
}
