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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { deleteImage, uploadImage } from 'src/utils/uploadImage';
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
  @UseInterceptors(FileInterceptor('categoryImage'))
  async createCategory(
    @Body() body: CreateCategoryDto,
    @UploadedFile() categoryImage?: Express.Multer.File,
  ) {
    try {
      let isCategoryExist = await this.categoryService.findCategoryByName(
        body.category_name,
      );

      if (isCategoryExist) {
        throw new ConflictException({
          success: false,
          message: 'Category already exists 🚫',
        });
      }

      let image = null;
      if (categoryImage) {
        const uploadedImgFile = await uploadImage(categoryImage, 'categories');

        if (uploadedImgFile.success) {
          image = uploadedImgFile;
        }
      }
      const category = await this.categoryService.create(body, image);
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
  @UseInterceptors(FileInterceptor('image'))
  @Patch('admin/categories/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
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

    let uploadedImgFile = null;
    if (image) {
      uploadedImgFile = await uploadImage(image, 'categories');
    }
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        body,
        uploadedImgFile,
      );
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

    if (deletedCategory.image_public_id) {
      await deleteImage(deletedCategory.image_public_id);
    }

    return {
      success: true,
      category: `${deletedCategory.category_name} category has been deleted`,
    };
  }
}
