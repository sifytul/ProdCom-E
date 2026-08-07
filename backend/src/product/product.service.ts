import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@/category/category.service';
import { deleteImage } from '@/utils/uploadImage';
import {
  DeepPartial,
  FindOperator,
  ILike,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { TTokenPayload } from '@/auth/types/type';
import { TFindAllProductQuery, TUploadedImage } from './types/type';
import { Category } from '@/category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductImage } from './entities/productImage.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(
    createProductDto: Omit<CreateProductDto, 'category'>,
    user: TTokenPayload,
    category: Category,
    images: TUploadedImage[],
  ) {
    const product = this.productRepository.create({
      ...createProductDto,
      added_by: { id: user.userId },
      category,
    });

    const savedProduct = await this.productRepository.save(product);

    let savedProductImages: ProductImage[] = [];
    if (images.length > 0) {
      const ImagesPayload = images.map((image: TUploadedImage) => {
        if (image.success) {
          return {
            product: savedProduct,
            url: image.url,
            public_id: image.public_id,
          };
        }
        return null;
      });

      const savedImages = this.imageRepository.create(
        ImagesPayload as DeepPartial<ProductImage>[],
      );
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

  async findAll(query: TFindAllProductQuery) {
    let { category, page, limit, sort_by, sort_type, searchTerm } = query;

    // Validate sort_by against allowed fields to prevent SQL injection
    const validSortFields = [
      'id',
      'name',
      'price',
      'discount',
      'stock',
      'created_at',
    ];
    if (sort_by && !validSortFields.includes(sort_by)) {
      sort_by = 'created_at'; // Default fallback
    }

    type TWhere = {
      category: { category_name: string };
      deleted_at: FindOperator<any>;
      name?: FindOperator<string>;
    };

    const where: TWhere = {
      category: { category_name: category },
      deleted_at: IsNull(),
    };

    if (searchTerm) {
      where['name'] = ILike(`%${searchTerm}%`);
    }

    const products = await this.productRepository.find({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { [sort_by]: sort_type?.toUpperCase() || 'DESC' },
    });

    return products;
  }

  async findAllForAdmin({
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortType = 'DESC',
    searchTerm,
    stockStatus,
  }: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: 'ASC' | 'DESC';
    searchTerm?: string;
    stockStatus?: 'in_stock' | 'out_of_stock' | 'all';
  }) {
    const whereCondition: any = {
      deleted_at: IsNull(),
    };

    if (searchTerm) {
      whereCondition.name = ILike(`%${searchTerm}%`);
    }

    if (stockStatus === 'in_stock') {
      whereCondition.stock = Not(0);
    } else if (stockStatus === 'out_of_stock') {
      whereCondition.stock = 0;
    }

    const [products, total] = await this.productRepository.findAndCount({
      where: whereCondition,
      take: limit,
      skip: (page - 1) * limit,
      order: { [sortBy]: sortType.toUpperCase() },
      relations: ['category', 'sub_category', 'added_by'],
    });

    return {
      success: true,
      data: products,
      total,
      page,
      limit,
    };
  }

  async findOneById(id: number) {
    const cacheKey = `ecom:product:${id}`;

    const cachedProduct = await this.cacheManager.get<Product>(cacheKey);

    if (cachedProduct) {
      console.log(`Cache hit for product ID ${id}`);
      return cachedProduct;
    }

    const product = await this.productRepository.findOne({
      where: { id },
    });

    await this.cacheManager.set(cacheKey, product, 300); // Cache for 5 minutes

    return product;
  }

  async update(
    id: number,
    { category, name, description, price, stock, discount }: UpdateProductDto,
  ) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException({
        success: false,
        message: 'Product not found',
      });
    }

    const categoryExist = await this.categoryService.findCategoryByName(
      category as string,
    );
    if (!categoryExist) {
      throw new BadRequestException({
        success: false,
        message: 'Category not found',
      });
    }

    if (category !== product.category.category_name) {
      product.category = categoryExist;
    }

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }

    if (stock) {
      product.stock = stock;
    }

    if (discount) {
      product.discount = discount;
    }
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
      await Promise.all(
        images.map(async (image) => {
          await deleteImage(image.public_id);
          await this.imageRepository.remove(image);
        }),
      );
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
