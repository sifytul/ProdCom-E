import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { ReviewerResponseDto } from 'src/user/dto/userResponse.dto';
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

  async findAll(productId: number) {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
    });
    let response = [];
    for (let review of reviews) {
      response.push({
        ...review,
        reviewer: new ReviewerResponseDto(review.reviewer),
      });
    }
    return response;
  }

  async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
    userId: number,
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, reviewer: { id: userId } },
    });

    if (!review) {
      throw new BadRequestException({
        success: false,
        message: 'Bad Request',
      });
    }

    review.comment = updateReviewDto.comment;
    review.rating = updateReviewDto.rating;

    return this.reviewRepository.save(review);
  }

  async deleteReviewService(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, reviewer: { id: userId } },
    });

    if (!review) {
      throw new BadRequestException({
        success: false,
        message: 'Bad Request',
      });
    }

    return this.reviewRepository.remove(review);
  }
}
