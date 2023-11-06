import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), UserModule],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
