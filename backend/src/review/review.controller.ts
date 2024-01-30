import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@/auth/decorators/public.decorator';
import { User } from '@/user/decorator/user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';
import { TTokenPayload } from 'types/type';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('products/:productId/reviews')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('productId', ParseIntPipe) productId: number,
    @User() user: TTokenPayload,
  ) {
    await this.reviewService.create(createReviewDto, productId, user);

    return {
      success: true,
      message: 'Review posted successfully',
    };
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('products/:productId/reviews')
  async findAll(@Param('productId', ParseIntPipe) productId: number) {
    const data = await this.reviewService.findAll(productId);
    return {
      success: true,
      message: 'Reviews fetched successfully',
      data,
    };
  }

  @Patch('reviews/:id')
  async updateReview(
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @User() user: TTokenPayload,
  ) {
    const { userId } = user;
    await this.reviewService.updateReview(reviewId, updateReviewDto, userId);
    return {
      success: true,
      message: 'Review updated successfully',
    };
  }

  @HttpCode(204)
  @Delete('reviews/:id')
  async deleteReview(
    @Param('id', ParseIntPipe) reviewId: number,
    @User() user: TTokenPayload,
  ) {
    const { userId } = user;

    await this.reviewService.deleteReviewService(reviewId, userId);
    return;
  }
}
