import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('products')
  async findAllProducts() {
    const allProducts = await this.productService.findAll();
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
