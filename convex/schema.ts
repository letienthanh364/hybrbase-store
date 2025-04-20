import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ! Users table
  users: defineTable({
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
    authToken: v.optional(v.string()), // Store token directly on user
    tokenExpiry: v.optional(v.number()), // Token expiration timestamp
    createdAt: v.number(),
    lastLogin: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_token", ["authToken"]), // Index for token lookup

  // ! Carts table
  carts: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        avatar: v.string(),
        colorCode: v.string(),
        size: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
      })
    ),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  // ! Orders table
  orders: defineTable({
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
      type: v.string(), // "STANDARD", "EXPRESS", or "OVERNIGHT"
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
    paymentStatus: v.string(), // "PENDING", "PAID", "FAILED", or "REFUNDED"
    userId: v.string(),
    orderDate: v.number(), // timestamp
  }).index("by_user", ["userId"]),

  // ! Products table
  products: defineTable({
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
    popularity: v.number(),
    subLists: v.array(
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
    ),
  }).index("by_category", ["category"]),

  // ! Review table
  reviews: defineTable({
    productId: v.string(),
    rating: v.number(),
    title: v.string(),
    content: v.string(),
    author: v.string(),
    date: v.string(),
    helpful: v.object({
      yes: v.number(),
      no: v.number(),
    }),
  }).index("by_product", ["productId"]),
});
