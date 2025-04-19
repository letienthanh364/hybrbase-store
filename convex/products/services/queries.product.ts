// convex/products.ts
import { query } from "../../_generated/server";
import { v } from "convex/values";
import { Id } from "../../_generated/dataModel";
import { ProductQueryParams } from "../entities/product.query.type";
import { docToProduct } from "../entities/product.type";
import { ProductListResponse } from "../entities/productList.type";

export const getProducts = query({
  args: {
    search: v.optional(v.string()),
    category: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    color: v.optional(v.string()),
    size: v.optional(v.string()),
    tag: v.optional(v.string()),
    sortBy: v.optional(v.string()),
    limit: v.optional(v.number()),
    page: v.optional(v.number()),
  },
  handler: async (
    ctx,
    args: ProductQueryParams
  ): Promise<ProductListResponse> => {
    const allProducts = await ctx.db.query("products").collect();

    let filteredProducts = allProducts;

    //! apply filter
    if (args.search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(args.search!.toLowerCase())
      );
    }

    if (args.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === args.category
      );
    }

    if (args.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= args.minPrice!
      );
    }

    if (args.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= args.maxPrice!
      );
    }

    if (args.color) {
      filteredProducts = filteredProducts.filter((product) =>
        product.subLists.some((subList) => subList.color.code === args.color)
      );
    }

    if (args.size) {
      filteredProducts = filteredProducts.filter((product) =>
        product.subLists.some((subList) =>
          subList.sizeList.some(
            (sizeItem) => sizeItem.size === args.size && sizeItem.inStore > 0
          )
        )
      );
    }

    if (args.tag) {
      filteredProducts = filteredProducts.filter(
        (product) => product.tag === args.tag
      );
    }

    //! apply sort
    if (args.sortBy) {
      if (args.sortBy === "popular") {
        filteredProducts.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
      } else if (args.sortBy === "price_asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (args.sortBy === "price_desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        filteredProducts.sort((a, b) => b._creationTime - a._creationTime);
      }
    } else {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    const limit = args.limit || 6;
    const page = args.page || 1;
    const skip = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    return {
      data: paginatedProducts.map(docToProduct),
      total: filteredProducts.length,
      limit,
      page,
    };
  },
});

//! Product detail
export const getProductDetail = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id as Id<"products">);

    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return docToProduct(product);
  },
});
