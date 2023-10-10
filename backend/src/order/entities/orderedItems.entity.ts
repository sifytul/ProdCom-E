import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderedItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (prod) => prod.ordered_items)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.ordered_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  quantity: number;

  @Column()
  sub_total: number;
}
