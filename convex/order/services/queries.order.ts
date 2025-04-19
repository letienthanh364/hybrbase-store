import { v } from "convex/values";
import { query } from "../../_generated/server";

// Get all orders for the current user
export const getMyOrders = query({
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error("Unauthorized: User must be logged in to view orders");
    }

    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("userId"), userId.tokenIdentifier))
      .order("desc")
      .collect();

    return orders;
  },
});

// Get a specific order by ID
export const getOrderById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
      throw new Error("Unauthorized: User must be logged in to view orders");
    }

    const order = await ctx.db.get(args.orderId);

    // Verify the order belongs to the current user
    if (!order || order.userId !== userId.tokenIdentifier) {
      throw new Error("Not found or unauthorized");
    }

    return order;
  },
});
