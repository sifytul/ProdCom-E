import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate((value) => value > 0 && value <= 5)
  rating: number;
}
