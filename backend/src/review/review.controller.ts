import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/user/decorator/user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('products/:productId/reviews')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('productId', ParseIntPipe) productId: number,
    @User() user,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
