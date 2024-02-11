import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Address } from '@/Entity/address.entity';
import { ContactInfo } from '@/Entity/contactInfo.entity';
import { Payment } from '@/Entity/payment.entity';
import { CartItem } from '@/cart/entities/cartItem.entity';
import { Category } from '@/category/entities/category.entity';
import { SubCategory } from '@/category/entities/subCategory.entity';
import { Order } from '@/order/entities/order.entity';
import { OrderedItem } from '@/order/entities/orderedItems.entity';
import { Product } from '@/product/entities/product.entity';
import { Review } from '@/review/entities/review.entity';
import { User } from '@/user/entity/user.entity';
import { ProductImage } from '@/product/entities/productImage.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url:
    process.env.ENV === 'production'
      ? process.env.INTERNAL_POSTGRES_DB_URI
      : process.env.LOCAL_POSTGRES_DB_URI,
  entities: [
    User,
    Product,
    Category,
    SubCategory,
    CartItem,
    Order,
    OrderedItem,
    Review,
    Address,
    Payment,
    ContactInfo,
    ProductImage,
  ],
  migrations: ['dist/src/migrations/*.js'],
  // synchronize: true,
  logging: true,
  migrationsRun: true,
};
