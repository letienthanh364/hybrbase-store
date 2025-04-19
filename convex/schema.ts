// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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
  }),
});
