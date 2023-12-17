import { ProductImage } from '@/Entity/productImage.entity';
import { CartItem } from '@/cart/entities/cartItem.entity';
import { Category } from '@/category/entities/category.entity';
import { SubCategory } from '@/category/entities/subCategory.entity';
import { OrderedItem } from '@/order/entities/orderedItems.entity';
import { Review } from '@/review/entities/review.entity';
import { User } from '@/user/entity/user.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  ratings: number;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    eager: true,
  })
  @JoinColumn({ name: 'sub_category_id' })
  sub_category: SubCategory;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  @Check(`"discount" <= 1 AND "discount" >= 0`)
  discount: number;

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: ['remove'],
    eager: true,
  })
  image_urls: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cart_items: CartItem[];

  @OneToMany(() => OrderedItem, (ordItm) => ordItm.product)
  ordered_items: OrderedItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'added_by_id' })
  added_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
