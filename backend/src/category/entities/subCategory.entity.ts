import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sub_category_name: string;

  @ManyToOne(() => Category, (category) => category.sub_categories, {
    eager: true,
  })
  category: Category;

  @OneToMany(() => Product, (prod) => prod.sub_category)
  products: Product[];

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
