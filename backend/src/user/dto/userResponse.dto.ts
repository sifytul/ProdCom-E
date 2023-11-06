import { Exclude, Expose } from 'class-transformer';

export class ReviewerResponseDto {
  id: number;
  name: string;

  @Exclude()
  email: string;

  @Exclude()
  avatar_public_id: string;

  @Expose({ name: 'avatarUrl' })
  avatar_url: string;

  @Exclude()
  role: string;
  @Exclude()
  token_version: number;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ReviewerResponseDto>) {
    Object.assign(this, partial);
  }
}
