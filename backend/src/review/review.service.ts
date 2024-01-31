import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '@/product/product.service';
import { ReviewerResponseDto } from '@/user/dto/userResponse.dto';
import { DeepPartial, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { TReviewData } from './types/type';

@Injectable()
export class ReviewService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    productId: number,
    user: { userId: number },
  ) {
    const existedProduct = await this.productService.findOneById(productId);

    if (!existedProduct) {
      throw new BadRequestException({
        success: false,
        message: 'Product not exist to review',
      });
    }

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
    let response: TReviewData[] = [];
    for (let review of reviews) {
      response.push({
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        createdAt: review.created_at,
        updatedAt: review.created_at,
        productId: review.product.id,
        reviewer: new ReviewerResponseDto(review.reviewer),
      });
    }
    return response;
  }

  async updateReview(
    reviewId: number,
    { comment, rating }: UpdateReviewDto,
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

    if (comment) {
      review.comment = comment;
    }
    if (rating) {
      review.rating = rating;
    }

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
