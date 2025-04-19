import React from "react";
import { Product } from "../../../convex/products/entities/product.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { generateNameId } from "@/utils/common.util";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const defaultProduct = product.subLists[0].sizeList[0];
  const router = useRouter();

  const onClickProduct = () => {
    router.push(
      `/product/${generateNameId({ name: product.name, id: product.id })}`
    );
  };

  return (
    <button
      onClick={onClickProduct}
      className="flex flex-col gap-2 hover:bg-gray-200"
    >
      <div className="aspect-square bg-gray-300 w-full relative">
        <Image
          src={product.avatar || ""}
          alt={product.name}
          fill
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className="flex w-full items-center justify-between text-black  px-3">
        <p className="font-bold ">{product.name}</p>
        <p className="font-medium ">{defaultProduct.size}</p>
      </div>
      <p className="font-medium px-3">${product.price}</p>
    </button>
  );
}
