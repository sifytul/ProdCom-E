import { Category } from 'src/Entity/category/category.entity';
import { ProductImage } from 'src/Entity/productImage.entity';
import { CartItem } from 'src/cart/entities/cartItem.entity';
import { OrderedItem } from 'src/order/entities/orderedItems.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Check,
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

  @Column('decimal', { precision: 3, scale: 1 })
  ratings: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  @Check(`"discount" <= 1 AND "discount" >= 0`)
  discount: number;

  @Column()
  stock: number;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  image_urls: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { cascade: true })
  cart_items: CartItem[];

  @OneToMany(() => OrderedItem, (ordItm) => ordItm.product, { cascade: true })
  ordered_items: OrderedItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  added_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
