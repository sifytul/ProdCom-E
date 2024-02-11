import { ProductImage } from '@/product/entities/productImage.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

class Contact {
  id: number;
  phone_one: string;
  phone_two: string | null;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

class ShippingInfo {
  id: number;
  address: string;
  city: string;
  country: string;

  @Expose({ name: 'postalCode' })
  postal_code: number;
  @Transform(({ obj }) => {
    return {
      id: obj.contact.id,
      phoneOne: obj.contact.phone_one,
      phoneTwo: obj.contact.phone_two,
    };
  })
  contact: Contact;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export class OrderResponseDto {
  id: number;
  status: string;

  @Expose({ name: 'totalItems' })
  total_items: number;

  @Expose({ name: 'itemsPrice' })
  items_price: number;

  @Expose({ name: 'shippingPrice' })
  shipping_price: number;

  @Expose({ name: 'totalPrice' })
  total_price: number;

  comment: string;

  @Expose({ name: 'shippingInfo' })
  @Transform(({ obj }) => {
    return {
      address: obj.shipping_info.address,
      city: obj.shipping_info.city,
      country: obj.shipping_info.country,
      postalCode: obj.shipping_info.postal_code,
      contact: {
        phoneOne: obj.shipping_info.contact.phone_one,
        phoneTwo: obj.shipping_info.contact.phone_two,
      },
    };
  })
  shipping_info: ShippingInfo;

  @Expose({ name: 'probableDeliveryDate' })
  probable_delivery_date: Date | null;

  @Expose({ name: 'deliveryDate' })
  delivery_date: Date | null;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Expose({ name: 'paymentInfo' })
  payment_info: any;

  @Exclude()
  user: any;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
  }
}

class Category {
  id: number;
  category_name: string;
  description: string;
  image_url: string;

  @Exclude()
  image_public_id: string | null;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

class Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  ratings: number;
  discount: number;
  image_urls: ProductImage[];

  @Expose({ name: 'category' })
  @Transform(({ obj }) => obj.category.category_name)
  category: Category;

  @IsOptional()
  @Exclude()
  deleted_at?: Date;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export class OrderedItemsResponseDto {
  id: number;
  quantity: number;
  sub_total: number;

  @Expose({ name: 'product' })
  @Transform(({ obj }) => {
    return {
      id: obj.product.id,
      sku: obj.product.sku,
      name: obj.product.name,
      price: obj.product.price,
      ratings: obj.product.ratings,
      discount: obj.product.discount,
      imageUrls: obj.product.image_urls,
      category: obj.product.category.category_name,
    };
  })
  product: Product;

  @Exclude()
  order: any;

  constructor(partial: Partial<OrderedItemsResponseDto>) {
    Object.assign(this, partial);
  }
}
