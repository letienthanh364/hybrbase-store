import React, { useState, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import ProductItem from "@/components/ProductItem";
import { Product } from "../../../../convex/products/entities/product.type";
import { useShopFilterStore } from "../_stores/useShopFilter.store";

export default function ShopProductList() {
  const { selectedCategories, selectedColors } = useShopFilterStore();

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const limit = 6; // Number of products per page

  // Query for the current page of products
  const result = useQuery(api.product.getProducts, {
    page: page,
    limit: limit,
    category: selectedCategories,
    color: selectedColors,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const { data: pageProducts = [], total = 0 } = result || {};

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
  }, [selectedCategories, selectedColors]);

  // Update accumulated products whenever new page data arrives
  useEffect(() => {
    if (pageProducts && pageProducts.length > 0) {
      // If it's the first page, replace the products
      // Otherwise, append the new products to the existing ones
      setAllProducts((prev) =>
        page === 1 ? pageProducts : [...prev, ...pageProducts]
      );
    } else if (
      page === 1 &&
      Array.isArray(pageProducts) &&
      pageProducts.length === 0
    ) {
      // If it's the first page and there are no products, set all products to empty array
      setAllProducts([]);
    }
  }, [pageProducts, page]);

  // Check if there are more products to load
  const hasMore = allProducts.length < total;

  // Function to load more products
  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Loading state
  if (result === undefined && page === 1) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full text-end">
        Showing {allProducts.length} of {total} products
      </div>

      {allProducts.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProducts.map((pro) => {
            return <ProductItem key={pro.id} product={pro} />;
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center py-12">
          <div className="text-gray-500">
            No products found matching your selected filters.
          </div>
        </div>
      )}

      {/* Load more button - only show if there are more products to load */}
      {hasMore && (
        <div className="w-full flex justify-center mt-6">
          <button
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
            onClick={loadMoreProducts}
          >
            Load more products
          </button>
        </div>
      )}
    </div>
  );
}
