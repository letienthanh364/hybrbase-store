export interface ProductQueryParams {
  search?: string;
  category?: string[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  tag?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}
