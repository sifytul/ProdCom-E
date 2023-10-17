import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Entity/category/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findCategoryByName(category_name: string) {
    const category = await this.categoryRepository.findOne({
      where: { category_name },
    });
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async create({
    category_name,
    description,
  }: {
    category_name: string;
    description?: string;
  }) {
    const category = this.categoryRepository.create({
      category_name: category_name.toLowerCase(),
      description,
    });
    return this.categoryRepository.save(category);
  }

  async update(id: number, { category_name, description }: any) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      return null;
    }

    if (category_name === category.category_name && !description) {
      throw new ConflictException({
        success: false,
        message: 'No data to update',
      });
    }

    category.category_name = category_name.toLowerCase();
    category.description = description;
    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      return null;
    }
    return this.categoryRepository.remove(category);
  }
}