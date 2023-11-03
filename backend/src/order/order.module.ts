import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/Entity/address.entity';
import { ContactInfo } from 'src/Entity/contactInfo.entity';
import { Payment } from 'src/Entity/payment.entity';
import { Product } from 'src/product/entities/product.entity';
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
