import { ReviewerResponseDto } from '@/user/dto/userResponse.dto';

export type TReviewData = {
  id: number;
  comment: string;
  rating: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  reviewer: ReviewerResponseDto;
};
