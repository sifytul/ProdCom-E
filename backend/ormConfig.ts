import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Address } from 'src/Entity/address.entity';
import { ContactInfo } from 'src/Entity/contactInfo.entity';
import { Payment } from 'src/Entity/payment.entity';
import { ProductImage } from 'src/Entity/productImage.entity';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import { Category } from 'src/category/entities/category.entity';
import { SubCategory } from 'src/category/entities/subCategory.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderedItem } from 'src/order/entities/orderedItems.entity';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entity/user.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prodcom_e',
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
  synchronize: true,
  logging: true,
};
