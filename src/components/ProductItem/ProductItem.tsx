import React from "react";
import { Product } from "../../../convex/products/entities/product.type";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const defaultProduct = product.subLists[0].sizeList[0];

  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square bg-gray-300 w-full relative">
        <Image
          src={product.avatar || ""}
          alt={product.name}
          fill
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className="flex w-full items-center justify-between text-black">
        <p className="font-bold ">{product.name}</p>
        <p className="font-medium ">{defaultProduct.size}</p>
      </div>
      <p className="font-medium">${product.price}</p>
    </div>
  );
}
