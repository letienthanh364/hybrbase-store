import type { Id } from "../../_generated/dataModel";

export type ProductId = Id<"products">;

export interface ProductDoc extends Omit<Product, "id"> {
  _id: Id<"products">;
  _creationTime: number;
}

export interface Product {
  id: Id<"products">;
  name: string;
  description: string;
  price: number;
  avatar: string | null;
  images: (ProductImage | null)[];
  category: string;
  tag: string;
  sizeGuides: ProductSizeGuide[];
  rating: number;
  popularity: number;
  subLists: Product_SubList[];
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductSizeGuide {
  height: number;
  size: string;
}

export interface Product_SubList {
  color: {
    name: string;
    code: string;
  };
  sizeList: Product_SizeModel[];
}

export interface Product_SizeModel {
  size: string;
  inStore: number;
}

export function docToProduct(doc: ProductDoc): Product {
  return {
    ...doc,
    id: doc._id,
  };
}
