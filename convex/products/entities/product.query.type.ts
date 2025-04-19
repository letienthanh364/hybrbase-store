export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  tag?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}
