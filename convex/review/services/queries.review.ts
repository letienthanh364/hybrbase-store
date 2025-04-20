// convex/reviews.ts
import { v } from "convex/values";
import { query } from "../../_generated/server";

export const getReviews = query({
  args: {
    productId: v.string(),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { productId, rating } = args;

    // Start with query by product ID using the index
    let reviewsQuery = ctx.db
      .query("reviews")
      .withIndex("by_product", (q) => q.eq("productId", productId));

    // If rating is provided, add rating filter
    if (rating !== undefined) {
      reviewsQuery = reviewsQuery.filter((q) =>
        q.eq(q.field("rating"), rating)
      );
    }

    // Return reviews sorted by date (newest first)
    return await reviewsQuery.order("desc").collect();
  },
});

// Get a summary of reviews for a specific product
export const getReviewSummary = query({
  args: {
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    const { productId } = args;

    // Get all reviews for this product
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_product", (q) => q.eq("productId", productId))
      .collect();

    // Count the number of reviews for each rating
    const summary = {
      total: reviews.length,
      5: reviews.filter((review) => review.rating === 5).length,
      4: reviews.filter((review) => review.rating === 4).length,
      3: reviews.filter((review) => review.rating === 3).length,
      2: reviews.filter((review) => review.rating === 2).length,
      1: reviews.filter((review) => review.rating === 1).length,
    };

    return summary;
  },
});

// // Update helpful counts for a review
// export const updateHelpful = query({
//   args: {
//     id: v.id("reviews"),
//     helpful: v.boolean(),
//   },
//   handler: async (ctx, args) => {
//     const { id, helpful } = args;
//     const review = await ctx.db.get(id);

//     if (!review) {
//       throw new Error("Review not found");
//     }

//     if (helpful) {
//       await ctx.db.patch(id, {
//         helpful: {
//           ...review.helpful,
//           yes: review.helpful.yes + 1,
//         },
//       });
//     } else {
//       await ctx.db.patch(id, {
//         helpful: {
//           ...review.helpful,
//           no: review.helpful.no + 1,
//         },
//       });
//     }

//     return await ctx.db.get(id);
//   },
// });
