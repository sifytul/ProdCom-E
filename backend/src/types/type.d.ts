import { ProductImage } from '@/Entity/productImage.entity';
import { UserType } from '@/user/entity/user.entity';

export type TError = {
  field: string;
  message: string;
};

export type TFindAllUserQuery = {
  page: number;
  limit: number;
  sort_by: string;
  sort_type: 'ASC' | 'DESC';
};
