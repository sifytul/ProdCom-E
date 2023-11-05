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

export class UpdateOrderDtoForAdmin {
  @IsNotEmpty()
  @IsOptional()
  paymentStatus?: 'paid' | 'unpaid';

  @IsNotEmpty()
  @IsOptional()
  probableDeliveryDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: 'processing' | 'shipping' | 'delivered' | 'canceled';

  @IsNotEmpty()
  @IsOptional()
  paymentInfo?: paymentInfo | 'cod';

  // @IsOptional()
  // @IsNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => ProductDetails)
  // product: ProductDetails[];
}
