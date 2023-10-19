import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/decorator/user.decorator';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('products')
  async findAllProducts(
    @Query('category') category: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort_type', new DefaultValuePipe('desc')) sort_type: string,
    @Query('sort_by', new DefaultValuePipe('created_at')) sort_by: string,
  ) {
    let categoryExist;
    if (category) {
      category = category.toLowerCase();
      categoryExist = await this.categoryService.findCategoryByName(category);
    }
    if (category && !categoryExist) {
      return {
        success: false,
        message: 'Category not found',
      };
    }
    const allProducts = await this.productService.findAll({
      category,
      page,
      limit,
      sort_by,
      sort_type,
    });

    if (!allProducts) {
      return {
        success: false,
        message: 'Category not found',
      };
    }
    return {
      success: true,
      products: allProducts,
    };
  }

  @Public()
  @Get('products/:id')
  async findOneProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new BadRequestException({
        success: false,
        message: 'Product not found',
      });
    }
    return {
      success: true,
      product,
    };
  }

  @Roles(Role.ADMIN)
  @Post('admin/products/new')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @User() user,
  ) {
    console.log('User: ', user);
    const { category, ...dto } = createProductDto;
    const categoryExist =
      await this.categoryService.findCategoryByName(category);

    if (!categoryExist && category !== 'other') {
      throw new BadRequestException({
        success: false,
        message: 'Category not found',
      });
    }
    const existedUser = await this.userService.findOneByEmail(user.email);
    return this.productService.create(dto, existedUser, categoryExist);
  }

  @Roles(Role.ADMIN)
  @Patch('admin/products/:id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    return {
      success: true,
      updatedProduct,
    };
  }

  @Roles(Role.ADMIN)
  @Delete('admin/products/:id')
  async softRemoveProductById(@Param('id', ParseIntPipe) id: number) {
    const softRemovedProduct = await this.productService.softRemove(id);
    return {
      success: true,
      softRemovedProduct,
    };
  }

  @Roles(Role.ADMIN)
  @Get('admin/products/soft-deleted')
  async getSoftRemovedProducts() {
    const softRemovedProducts =
      await this.productService.getSoftRemovedProducts();
    return {
      success: true,
      softRemovedProducts,
    };
  }

  @Roles(Role.ADMIN)
  @Patch('admin/products/:id/restore')
  async restoreSoftRemovedProductById(@Param('id', ParseIntPipe) id: number) {
    const restoredProduct = await this.productService.restore(id);
    if (restoredProduct.affected === 0) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Product could not be restored. Please try again later',
      });
    }

    return {
      success: true,
      message: 'Product restored successfully',
    };
  }
}
