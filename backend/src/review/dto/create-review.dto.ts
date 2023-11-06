import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsRatingValidator } from './IsRatingValidator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate(IsRatingValidator)
  rating: number;
}
