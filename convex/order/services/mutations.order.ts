import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const createOrder = mutation({
  args: {
    userId: v.string(),
    subtotal: v.number(),
    total: v.number(),
    addressModel: v.object({
      firstName: v.string(),
      lastName: v.string(),
      address: v.string(),
      apartment: v.optional(v.string()),
      city: v.string(),
      country: v.string(),
      zipcode: v.string(),
      note: v.optional(v.string()),
    }),
    shippingModel: v.object({
      type: v.string(),
      price: v.number(),
    }),
    products: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        unitPrice: v.number(),
        quantity: v.number(),
        size: v.string(),
        colorCode: v.string(),
      })
    ),
    paymentStatus: v.union(
      v.literal("PENDING"),
      v.literal("PAID"),
      v.literal("FAILED"),
      v.literal("REFUNDED")
    ),
  },
  handler: async (ctx, args) => {
    // ! Create the new order using the provided userId
    const orderId = await ctx.db.insert("orders", {
      subtotal: args.subtotal,
      total: args.total,
      addressModel: args.addressModel,
      shippingModel: args.shippingModel,
      products: args.products,
      paymentStatus: args.paymentStatus,
      userId: args.userId,
      orderDate: Date.now(),
    });

    // ! Update product quantities in inventory
    for (const item of args.products) {
      const product = await ctx.db.get(item.productId);
      if (!product) {
        continue; // Skip if product doesn't exist
      }

      // Find the right color and size combination to update
      const updatedSubLists = product.subLists.map((subList) => {
        if (subList.color.code === item.colorCode) {
          // Update the specific size's inventory
          const updatedSizeList = subList.sizeList.map((sizeItem) => {
            if (sizeItem.size === item.size) {
              return {
                ...sizeItem,
                inStore: Math.max(0, sizeItem.inStore - item.quantity),
              };
            }
            return sizeItem;
          });

          return {
            ...subList,
            sizeList: updatedSizeList,
          };
        }
        return subList;
      });

      // Update the product with new inventory levels
      await ctx.db.patch(item.productId, {
        subLists: updatedSubLists,
      });
    }

    // ! Reset the user's cart by finding and replacing with empty items array
    const userCarts = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    if (userCarts.length > 0) {
      // Update the existing cart with empty items
      await ctx.db.patch(userCarts[0]._id, {
        items: [],
        updatedAt: Date.now(),
      });
    }

    return orderId;
  },
});
