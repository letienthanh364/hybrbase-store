import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const createOrder = mutation({
  args: {
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
      type: v.union(v.literal("STANDARD"), v.literal("EXPRESS")),
      price: v.number(),
    }),
    products: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        unitPrice: v.number(),
        quantity: v.number(),
        size: v.string(),
        color: v.string(),
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
    // Get the current authenticated user ID
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error(
        "Unauthorized: User must be logged in to create an order"
      );
    }

    // Create the new order
    const orderId = await ctx.db.insert("orders", {
      subtotal: args.subtotal,
      total: args.total,
      addressModel: args.addressModel,
      shippingModel: args.shippingModel,
      products: args.products,
      paymentStatus: args.paymentStatus,
      userId: userId.tokenIdentifier,
      orderDate: Date.now(),
    });

    return orderId;
  },
});
