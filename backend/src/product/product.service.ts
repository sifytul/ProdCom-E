import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto, user, category) {
    const product = this.productRepository.create({
      ...createProductDto,
      added_by: user,
      category,
    });

    return this.productRepository.save(product);
  }

  async findAll(query) {
    const { category, page, limit, sort_by, sort_type } = query;

    const products = await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      where: { category: { category_name: category } },
      order: { [sort_by]: sort_type },
    });

    return products;
  }

  async findOneById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException({
        success: false,
        message: 'Product not found',
      });
    }

    const categoryExist = await this.categoryService.findCategoryByName(
      updateProductDto.category,
    );
    if (!categoryExist) {
      throw new BadRequestException({
        success: false,
        message: 'Category not found',
      });
    }

    if (updateProductDto.category !== product.category.category_name) {
      product.category = categoryExist;
    }

    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.stock = updateProductDto.stock;
    product.discount = updateProductDto.discount;

    console.log('Product: ', product);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
