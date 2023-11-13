import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (prod) => prod.cart_items)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Check(`"quantity" > 0`)
  quantity: number;
}
