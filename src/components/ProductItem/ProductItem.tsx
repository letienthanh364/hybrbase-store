import React from "react";
import { Product } from "../../../convex/products/entities/product.type";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  return <div className="">ProductItem</div>;
}
