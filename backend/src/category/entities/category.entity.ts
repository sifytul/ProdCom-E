import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_public_id: string;

  @Column({ nullable: true })
  image_url: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  sub_categories: SubCategory[];

  @OneToMany(() => Product, (prod) => prod.category)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
