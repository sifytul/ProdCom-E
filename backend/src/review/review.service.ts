import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    productId,
    user: { userId: number },
  ) {
    const existedProduct = await this.productService.findOneById(productId);

    if (!existedProduct) {
      throw new BadRequestException({
        success: false,
        message: 'Product not exist to review',
      });
    }
    let payload = {
      ...createReviewDto,
      product: { id: productId },
      user: { id: user.userId },
    };
    console.log(payload);

    const review = this.reviewRepository.create({
      ...createReviewDto,
      product: { id: productId },
      reviewer: { id: user.userId },
    } as DeepPartial<Review>);
    return this.reviewRepository.save(review);
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
