import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/Entity/productImage.entity';
import { CategoryService } from 'src/category/category.service';
import { deleteImage } from 'src/utils/uploadImage';
import { IsNull, Not, Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto, user, category, images) {
    const product = this.productRepository.create({
      ...createProductDto,
      added_by: { id: user.userId },
      category,
    });

    const savedProduct = await this.productRepository.save(product);

    let savedProductImages;
    if (images.length > 0) {
      const ImagesPayload = images.map((image) => {
        if (image.success) {
          return {
            product: savedProduct,
            url: image.url,
            public_id: image.public_id,
          };
        }
      });

      const savedImages = this.imageRepository.create(ImagesPayload);
      savedProductImages = await this.imageRepository.save(savedImages);
    } else {
      savedProductImages = [];
    }

    return {
      product: {
        ...product,
        images: savedProductImages,
      },
    };
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

  async softRemove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException({
        success: false,
        message: 'Product not found',
      });
    }
    const softRemovedProduct = await this.productRepository.softRemove(product);
    return softRemovedProduct;
  }

  async getSoftRemovedProducts() {
    const softRemovedProducts = await this.productRepository.find({
      withDeleted: true,
      where: { deleted_at: Not(IsNull()) },
    });
    return softRemovedProducts;
  }

  async restore(id: number) {
    const restoredProduct = await this.productRepository.restore(id);
    return restoredProduct;
  }

  async hardDelete(id: number) {
    const images = await this.imageRepository.find({
      where: { product: { id: id } },
    });

    if (images && images.length > 0) {
      images.forEach(async (image) => {
        await deleteImage(image.public_id);
        await this.imageRepository.remove(image);
      });
    }

    const product = await this.productRepository.findOne({
      withDeleted: true,
      where: { id },
    });
    if (!product) {
      throw new NotFoundException({
        success: false,
        message: 'Product not found',
      });
    }

    try {
      await this.productRepository.remove(product);
      return true;
    } catch (err) {
      return false;
    }
  }
}
