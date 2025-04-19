import { v } from "convex/values";
import { query } from "../../_generated/server";
import { Cart } from "../entities/cart.type";

export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, args): Promise<Cart | null> => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    return cart;
  },
});
