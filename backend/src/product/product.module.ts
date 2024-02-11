import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@/category/category.service';
import { Category } from '@/category/entities/category.entity';
import { UserModule } from '@/user/user.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductImage } from './entities/productImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductImage]),
    UserModule,
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
