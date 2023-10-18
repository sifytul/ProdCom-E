import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CategoryService } from 'src/category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
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
  findOneProductById(@Param('id') id: string) {}

  @Roles(Role.ADMIN)
  @Post('admin/products/new')
  createProduct(@Body() createProductDto: CreateProductDto) {}

  @Roles(Role.ADMIN)
  @Patch('admin/products/:id')
  updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {}

  @Roles(Role.ADMIN)
  @Delete('admin/products/:id')
  deleteProductById(@Param('id') id: string) {}
}
