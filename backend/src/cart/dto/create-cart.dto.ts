import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
