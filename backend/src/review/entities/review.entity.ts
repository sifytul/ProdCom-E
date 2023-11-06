import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => Product, (product) => product.reviews, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { cascade: true, eager: true })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
