import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
