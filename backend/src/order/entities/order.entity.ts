import { Payment } from 'src/Entity/payment.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../Entity/address.entity';
import { OrderedItem } from './orderedItems.entity';

export enum StatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
  status: StatusEnum;

  @Column({ default: 0 })
  total_items: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  items_price: number;

  @Column('decimal', { precision: 4, scale: 2, default: 60 })
  shipping_price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total_price: number;

  @Column('text', { nullable: true })
  comment: string;

  @OneToOne(() => Address, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'shipping_info_id' })
  shipping_info: Address;

  @OneToOne(() => Payment, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'payment_info_id' })
  payment_info: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderedItem, (ordItem) => ordItem.order, {
    eager: true,
  })
  ordered_items: OrderedItem[];

  @Column({ nullable: true })
  probable_delivery_date: Date;

  @Column({ nullable: true })
  delivered_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
