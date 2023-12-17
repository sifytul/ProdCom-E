import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@/Entity/address.entity';
import { ContactInfo } from '@/Entity/contactInfo.entity';
import { Payment } from '@/Entity/payment.entity';
import { Product } from '@/product/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/orderedItems.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderedItem,
      Product,
      Address,
      ContactInfo,
      Payment,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
