import { v } from "convex/values";
import { query } from "../../_generated/server";
import { Cart } from "../entities/cart.type";

export const getCart = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args): Promise<Cart | null> => {
    // Skip the query if userId is undefined
    if (!args.userId) {
      return null;
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId as string))
      .first();

    return cart;
  },
});

export const getCartLength = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args): Promise<number> => {
    // Skip the query if userId is undefined
    if (!args.userId) {
      return 0;
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId as string))
      .first();

    if (!cart) {
      return 0;
    }

    // Return the total number of items in the cart
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
});
