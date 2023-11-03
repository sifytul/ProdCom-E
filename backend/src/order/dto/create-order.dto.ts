import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class ContactInfo {
  @IsNotEmpty()
  @IsPhoneNumber('BD')
  phone_one: string;

  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('BD')
  phone_two?: string;
}

export class ShippingInfo {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  postal_code: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ContactInfo)
  contact: ContactInfo;
}

export class ProductDetails {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetails)
  products: ProductDetails[];

  @ValidateNested({ each: true })
  @Type(() => ShippingInfo)
  shipping_info: ShippingInfo | number;
}
