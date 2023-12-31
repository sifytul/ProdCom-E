import { Address } from '@/Entity/address.entity';
import { CartItem } from '@/cart/entities/cartItem.entity';
import { Order } from '@/order/entities/order.entity';
import { Review } from '@/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatar_public_id: string;

  @Column({
    default: 'https://i.ibb.co/F87MppG/man-character-665280-46967.jpg',
  })
  avatar_url: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  role: UserType;

  @Column({ default: 0 })
  token_version: number;

  @OneToMany(() => Address, (address) => address.user)
  address: Address;

  // @Column({ nullable: true })
  // resetPasswordToken: string;

  // @Column({ nullable: true })
  // resetPasswordExpire: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
