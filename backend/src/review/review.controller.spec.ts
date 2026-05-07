import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TTokenPayload } from '@/auth/types/type';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;

  const mockReviewService = {
    create: jest.fn(),
    findAll: jest.fn(),
    updateReview: jest.fn(),
    deleteReviewService: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideProvider(ReviewService)
      .useValue(mockReviewService)
      .compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /products/:productId/reviews', () => {
    it('should create a new review', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const reviewDto = { rating: 5, comment: 'Great product!' };

      mockReviewService.create.mockResolvedValue({ success: true });

      const result = await controller.create(reviewDto, 1, mockPayload);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Review posted successfully');
      expect(mockReviewService.create).toHaveBeenCalledWith(reviewDto, 1, mockPayload);
    });
  });

  describe('GET /products/:productId/reviews', () => {
    it('should return all reviews for a product', async () => {
      const mockReviews = [
        { id: 1, rating: 5, comment: 'Great!', reviewer: { name: 'User 1' } },
        { id: 2, rating: 4, comment: 'Good', reviewer: { name: 'User 2' } },
      ];

      mockReviewService.findAll.mockResolvedValue(mockReviews);

      const result = await controller.findAll(1);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Reviews fetched successfully');
      expect(result.data).toEqual(mockReviews);
      expect(mockReviewService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('PATCH /reviews/:id', () => {
    it('should update a review', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      const updateDto = { rating: 4, comment: 'Updated comment' };

      mockReviewService.updateReview.mockResolvedValue({ success: true });

      const result = await controller.updateReview(1, updateDto, mockPayload);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Review updated successfully');
      expect(mockReviewService.updateReview).toHaveBeenCalledWith(1, updateDto, 1);
    });
  });

  describe('DELETE /reviews/:id', () => {
    it('should delete a review', async () => {
      const mockPayload: TTokenPayload = {
        userId: 1,
        email: 'test@test.com',
        role: 'user',
        tokenVersion: 0,
      };

      mockReviewService.deleteReviewService.mockResolvedValue({ success: true });

      const result = await controller.deleteReview(1, mockPayload);

      expect(result).toBeUndefined();
      expect(mockReviewService.deleteReviewService).toHaveBeenCalledWith(1, 1);
    });
  });
});