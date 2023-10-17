import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAllCategories() {
    const allCategories = await this.categoryService.findAll();
    return {
      success: true,
      categories: allCategories,
    };
  }

  @Roles(Role.ADMIN)
  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const category = await this.categoryService.create(body);
    return {
      success: true,
      category,
    };
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    if (!body.category_name && !body.description) {
      return {
        success: false,
        message: 'No data to update',
      };
    }
    const updatedCategory = await this.categoryService.update(id, body);
    return {
      success: true,
      category: updatedCategory,
    };
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
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
      category: deletedCategory,
    };
  }
}
