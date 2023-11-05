import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/Entity/category/category.entity';
import { CategoryService } from 'src/category/category.service';
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
