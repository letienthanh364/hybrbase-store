import { Product } from "./product.type";

export interface ProductListResponse {
  data: Product[];
  total: number;
  limit: number;
  page: number;
}
