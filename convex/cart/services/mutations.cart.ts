import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const addToCart = mutation({
  args: {
    userId: v.string(),
    item: v.object({
      productId: v.id("products"),
      name: v.string(),
      color: v.string(),
      colorCode: v.string(),
      size: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
    }),
  },
  handler: async (ctx, args): Promise<string> => {
    const { userId, item } = args;

    // Get existing cart or create new one
    const existingCart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingCart) {
      // Check if item with same product, color and size exists
      const existingItemIndex = existingCart.items.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...existingCart.items];
        updatedItems[existingItemIndex].quantity += item.quantity;

        await ctx.db.patch(existingCart._id, {
          items: updatedItems,
          updatedAt: Date.now(),
        });
      } else {
        // Add new item to cart
        await ctx.db.patch(existingCart._id, {
          items: [...existingCart.items, item],
          updatedAt: Date.now(),
        });
      }

      return existingCart._id;
    } else {
      // Create new cart
      const cartId = await ctx.db.insert("carts", {
        userId,
        items: [item],
        updatedAt: Date.now(),
      });

      return cartId;
    }
  },
});

export const updateCartItem = mutation({
  args: {
    userId: v.string(),
    item: v.object({
      productId: v.id("products"),
      color: v.string(),
      size: v.string(),
      quantity: v.number(),
    }),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const { userId, item } = args;

    const existingCart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!existingCart) {
      return false;
    }

    const itemIndex = existingCart.items.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.color === item.color &&
        cartItem.size === item.size
    );

    if (itemIndex === -1) {
      return false;
    }

    const updatedItems = [...existingCart.items];
    updatedItems[itemIndex].quantity = item.quantity;

    await ctx.db.patch(existingCart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    return true;
  },
});

export const removeFromCart = mutation({
  args: {
    userId: v.string(),
    item: v.object({
      productId: v.id("products"),
      color: v.string(),
      size: v.string(),
    }),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const { userId, item } = args;

    const existingCart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!existingCart) {
      return false;
    }

    const updatedItems = existingCart.items.filter(
      (cartItem) =>
        !(
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
        )
    );

    await ctx.db.patch(existingCart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    return true;
  },
});

export const clearCart = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const { userId } = args;

    const existingCart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingCart) {
      await ctx.db.patch(existingCart._id, {
        items: [],
        updatedAt: Date.now(),
      });
      return true;
    }

    return false;
  },
});
