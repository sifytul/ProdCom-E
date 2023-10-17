import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get('categories')
  async findAllCategories() {
    const allCategories = await this.categoryService.findAll();
    return {
      success: true,
      categories: allCategories,
    };
  }

  @Roles(Role.ADMIN)
  @Post('admin/categories')
  async createCategory(@Body() body: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(body);
      return {
        success: true,
        category,
      };
    } catch (error) {
      let message = error.message.includes('duplicate key')
        ? 'Category already exists 🚫'
        : error.message;
      throw new ConflictException({
        success: false,
        message,
      });
    }
  }

  @Roles(Role.ADMIN)
  @Patch('admin/categories/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    if (!body.category_name && !body.description) {
      throw new BadRequestException({
        success: false,
        message: 'No data to update',
      });
    }
    if (body.category_name == '') {
      throw new BadRequestException({
        success: false,
        message: 'Category name cannot be empty',
      });
    }
    try {
      const updatedCategory = await this.categoryService.update(id, body);
      if (!updatedCategory) {
        throw new BadRequestException({
          success: false,
          message: 'Category not found',
        });
      }

      return {
        success: true,
        category: updatedCategory,
      };
    } catch (error) {
      let message = error.message.includes('duplicate key')
        ? 'Category already exists'
        : error.message;
      throw new ConflictException({
        success: false,
        message,
      });
    }
  }

  @Roles(Role.ADMIN)
  @Delete('admin/categories/:id')
  async deleteCategory(@Param('id') id: number) {
    const deletedCategory = await this.categoryService.remove(id);
    if (!deletedCategory) {
      return {
        success: false,
        message: 'Category not found',
      };
    }
    return {
      success: true,
      category: `${deletedCategory.category_name} category has been deleted`,
    };
  }
}
