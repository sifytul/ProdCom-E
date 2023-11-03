import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class paymentInfo {
  @IsNotEmpty()
  @IsString()
  medium: string;

  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsString()
  paidAt: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
export class UpdateOrderDto {
  @IsNotEmpty()
  @IsOptional()
  paymentStatus?: 'paid' | 'unpaid';

  @IsNotEmpty()
  @IsOptional()
  paymentInfo?: paymentInfo | 'cod';

  @IsNotEmpty()
  @IsString()
  status: 'confirmed' | 'canceled';
}
