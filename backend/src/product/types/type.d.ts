export type TUploadedImage = {
  success: boolean;
  public_id: string | undefined;
  url: string | undefined;
  error?: string;
};

export type TFindAllProductQuery = {
  category: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_type: 'asc' | 'desc';
  searchTerm: string;
};
