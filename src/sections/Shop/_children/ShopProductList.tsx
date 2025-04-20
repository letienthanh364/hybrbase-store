import React, { useState, useEffect, useCallback, useRef } from "react";
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

  // Use refs to track state between renders
  const isFirstLoadAfterFilterChange = useRef(true);
  const previousPageProductsLength = useRef(0);

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
    isFirstLoadAfterFilterChange.current = true;
  }, [selectedCategories, selectedColors]);

  // Safely merge products without causing infinite loops
  const safelyMergeProducts = useCallback(
    (
      currentProducts: Product[],
      newProducts: Product[],
      isFirstPage: boolean
    ) => {
      // If it's the first page, simply return the new products
      if (isFirstPage) {
        return [...newProducts];
      }

      // For subsequent pages, merge without duplicates
      const existingIds = new Set(currentProducts.map((p) => p.id));
      const uniqueNewProducts = newProducts.filter(
        (p) => !existingIds.has(p.id)
      );
      return [...currentProducts, ...uniqueNewProducts];
    },
    []
  );

  // ! Update all products only when pageProducts changes and has content
  useEffect(() => {
    //? Skip if pageProducts is empty or undefined
    if (!pageProducts || pageProducts.length === 0) {
      return;
    }

    //? Skip if pageProducts length hasn't changed (prevents unnecessary re-renders)
    if (
      pageProducts.length === previousPageProductsLength.current &&
      !isFirstLoadAfterFilterChange.current
    ) {
      return;
    }

    // Update our reference for the next comparison
    previousPageProductsLength.current = pageProducts.length;

    // Update allProducts safely
    setAllProducts((current) =>
      safelyMergeProducts(
        current,
        pageProducts,
        isFirstLoadAfterFilterChange.current
      )
    );

    // Reset first load flag after it's been used
    if (isFirstLoadAfterFilterChange.current) {
      isFirstLoadAfterFilterChange.current = false;
    }
  }, [pageProducts, safelyMergeProducts]);

  // Check if there are more products to load
  const hasMore = allProducts.length < total;

  // ! Function to load more products
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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
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
