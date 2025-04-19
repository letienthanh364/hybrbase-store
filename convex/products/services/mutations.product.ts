import { v } from "convex/values";
import { Id } from "../../_generated/dataModel";
import { mutation } from "../../_generated/server";
import { docToProduct } from "../entities/product.type";

// API thêm sản phẩm mới
export const addProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    avatar: v.union(v.string(), v.null()),
    images: v.array(
      v.union(
        v.object({
          id: v.string(),
          url: v.string(),
        }),
        v.null()
      )
    ),
    category: v.string(),
    tag: v.string(),
    sizeGuides: v.array(
      v.object({
        height: v.number(),
        size: v.string(),
      })
    ),
    rating: v.number(),
    popularity: v.optional(v.number()),
    subLists: v.optional(
      v.array(
        v.object({
          color: v.object({
            name: v.string(),
            code: v.string(),
          }),
          sizeList: v.array(
            v.object({
              size: v.string(),
              inStore: v.number(),
            })
          ),
        })
      )
    ),
    // Keep these optional fields if still needed
    color: v.optional(v.string()),
    size: v.optional(v.string()),
    inStore: v.optional(v.number()),
    modelHeight: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      name: args.name,
      description: args.description,
      price: args.price,
      avatar: args.avatar,
      images: args.images,
      category: args.category,
      tag: args.tag,
      sizeGuides: args.sizeGuides,
      rating: args.rating,
      popularity: args.popularity || 0,
      subLists: args.subLists || [],
      // Include optional fields if provided
      ...(args.color !== undefined && { color: args.color }),
      ...(args.size !== undefined && { size: args.size }),
      ...(args.inStore !== undefined && { inStore: args.inStore }),
      ...(args.modelHeight !== undefined && { modelHeight: args.modelHeight }),
    });

    const product = await ctx.db.get(productId);
    return docToProduct(product!);
  },
});

// API cập nhật sản phẩm
export const updateProduct = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    avatar: v.optional(v.union(v.string(), v.null())),
    images: v.optional(
      v.array(
        v.union(
          v.object({
            id: v.string(),
            url: v.string(),
          }),
          v.null()
        )
      )
    ),
    category: v.optional(v.string()),
    tag: v.optional(v.string()),
    sizeGuides: v.optional(
      v.array(
        v.object({
          height: v.number(),
          size: v.string(),
        })
      )
    ),
    rating: v.optional(v.number()),
    popularity: v.optional(v.number()),
    subLists: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          // Add other fields as needed
        })
      )
    ),
    // Keep these optional fields if still needed
    color: v.optional(v.string()),
    size: v.optional(v.string()),
    inStore: v.optional(v.number()),
    modelHeight: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;

    const product = await ctx.db.get(id as Id<"products">);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    // Lọc các trường có giá trị undefined
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateFields).filter(([, value]) => value !== undefined)
    );

    await ctx.db.patch(id as Id<"products">, fieldsToUpdate);

    const updatedProduct = await ctx.db.get(id as Id<"products">);
    return docToProduct(updatedProduct!);
  },
});

// API xóa sản phẩm
export const deleteProduct = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id as Id<"products">);

    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    await ctx.db.delete(args.id as Id<"products">);

    return { success: true, id: args.id };
  },
});
