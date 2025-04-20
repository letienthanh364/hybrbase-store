"use client";

import { getIdFromNameId } from "@/utils/common.util";
import { useMutation, useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { HeartIcon, ShareIcon } from "lucide-react";
import { Product_SizeModel } from "../../../convex/products/entities/product.type";
import Link from "next/link";
import classNames from "classnames";
import HandledImage from "@/components/HandledImage";
import { useAuth } from "@/providers/authProvider";
import AppPath from "@/constants/path.const";
import { toast } from "sonner";
import ProductReview from "../ProductReview";

export default function Product() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const nameId = pathnameArr[pathnameArr.length - 1];
  const productId = getIdFromNameId(nameId);

  const product = useQuery(api.product.getProductDetail, { id: productId });
  const defaultColor = product?.subLists[0];

  // State for quantity
  const [quantity, setQuantity] = useState(1);
  // State for selected size and color
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  useEffect(() => {
    if (defaultColor) {
      setSelectedColor(defaultColor.color.code);
      setSelectedSize(defaultColor.sizeList[0].size);
    }
  }, [defaultColor]);

  // Handler for quantity change
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Size options
  const sizeOptionsMap: { [key: string]: Product_SizeModel[] } = {};

  // Initialize the map for each color
  product?.subLists.forEach((subList) => {
    sizeOptionsMap[subList.color.name] = subList.sizeList;
  });

  const sizeOptions =
    product?.subLists.find((ele) => ele.color.code === selectedColor)
      ?.sizeList || [];

  // Color options with hex values
  const colorOptions = product?.subLists.map((ele) => ele.color) || [];

  const imageUrlList = product?.images.map((ele) => ele?.url) || [];

  // ! handle add to cart
  const addToCartMutation = useMutation(api.cart.addToCart);
  const onAddToCart = async () => {
    if (!isAuthenticated) {
      router.push(AppPath.login);
      return;
    }

    if (!product || !user) return;

    try {
      await addToCartMutation({
        userId: user._id,
        item: {
          productId: product.id,
          name: product.name,
          avatar: product.avatar || "",
          colorCode: selectedColor,
          size: selectedSize,
          quantity: quantity,
          unitPrice: product.price,
        },
      });

      // Optional: Add success notification or feedback here
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Optional: Add error notification or feedback here
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="container px-4 pt-20 pb-10 lg:space-y-10">
      <div className="flex flex-col md:flex-row ">
        {/* Product Images - Left side */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-2">
            {/* Placeholder for product images */}
            <div className="bg-gray-300 h-64 w-full relative">
              <HandledImage
                src={product?.avatar}
                alt={`product avatar`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-64 w-full relative">
                {index < imageUrlList.length ? (
                  <HandledImage
                    src={imageUrlList[index]}
                    alt={`product image ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Product Details - Right side */}
        <div className="w-full md:w-1/2 md:pl-10 pt-8 md:pt-0">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl lg:text-3xl font-bold">{product?.name}</h3>
            <div className="flex gap-3">
              <button className="rounded-full p-1 hover:bg-gray-200">
                <HeartIcon size={32} />
              </button>
              <button className="rounded-full p-1 hover:bg-gray-200">
                <ShareIcon size={32} />
              </button>
            </div>
          </div>

          <div className="w-full flex gap-3 items-center mt-2">
            <p className="text-xl font-semibold ">${product?.price}</p>

            <p className="p-1 border border-black items-center text-xs lg:text-sm">
              or 4 interest-free payments of $25.00. Learn more
            </p>
          </div>

          <p className="mt-4">{product?.description}</p>

          <div className="w-full flex flex-col gap-2">
            {/* Color Selection */}
            <div className="space-y-2">
              <p className="text-lg text-gray-400">Color</p>
              <div className="flex space-x-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.code}
                    className={classNames(
                      "h-10 w-10 rounded-full",
                      selectedColor === color.code
                        ? "ring-2 ring-black ring-offset-1"
                        : "border border-gray-300"
                    )}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color.code)}
                    aria-label={`Select ${color.code} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <p className="text-lg text-gray-400">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size.size}
                    className={`h-10 w-16 border ${
                      selectedSize === size.size
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Size Guide Link */}
          <div className="mt-6">
            <Link href="#" className="underline text-xs lg:text-sm">
              Size & Fit Guide
            </Link>
          </div>

          {/* Model Height Information */}
          <div className="text-gray-500 mt-1 text-xs lg:text-sm">
            <p>Height of model: 189 cm. / 6&apos; 2&quot; Size 41</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-end justify-start mt-4 gap-4">
            <button
              onClick={onAddToCart}
              className="bg-black text-white h-12 px-12 hover:bg-black/80"
            >
              Add to Cart - ${(product?.price || 0) * quantity}
            </button>

            <div>
              <p className="mb-1 text-gray-500">Quantity</p>
              <div className="flex items-center border border-black h-12">
                <button
                  className="px-3 py-1 text-xl text-gray-500"
                  onClick={decrementQuantity}
                >
                  −
                </button>
                <span className="px-3 py-1 ">{quantity}</span>
                <button
                  className="px-3 py-1 text-xl text-gray-500"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="text-gray-500 mt-2 text-xs">
            <p>
              Free standard shipping{" "}
              <span className="underline ml-4">Free Returns</span>
            </p>
          </div>
        </div>
      </div>

      <ProductReview productId={productId} />
    </div>
  );
}
