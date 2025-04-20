// components/Review.tsx
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-xl">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

// Star component for ratings

interface ReviewProps {
  productId: string;
}
export default function ProductReview({ productId }: ReviewProps) {
  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    undefined
  );

  // Fetch reviews with optional rating filter
  const reviews =
    useQuery(api.review.getReviews, {
      productId,
      rating: selectedRating,
    }) || [];

  // Fetch review summary
  const reviewSummary = useQuery(api.review.getReviewSummary, {
    productId,
  });

  return (
    <div className="container w-full  py-8">
      <p className="text-3xl font-bold mb-8">Reviews</p>
      <div className="grid w-full grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-8">
        {/* Star Rating Summary */}
        <div className="col-span-1">
          <div className="flex flex-col items-start gap-8 mb-12">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <StarRating rating={5} />
                <span className="text-3xl ml-2">
                  {reviewSummary?.total
                    ? `${reviewSummary.total} ${reviewSummary.total === 1 ? "review" : "reviews"}`
                    : "Loading..."}
                </span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <button
                    onClick={() =>
                      setSelectedRating(
                        selectedRating === stars ? undefined : stars
                      )
                    }
                    className={`flex items-center w-20 ${selectedRating === stars ? "font-bold" : ""}`}
                  >
                    <span>{stars} stars</span>
                  </button>
                  <div className="w-full bg-gray-200 h-2 mx-2 flex-1">
                    <div
                      className="bg-gray-600 h-2"
                      style={{
                        width: reviewSummary?.total
                          ? `${(reviewSummary[stars as 1 | 2 | 3 | 4 | 5] / reviewSummary.total) * 100}%`
                          : "0%",
                      }}
                    ></div>
                  </div>
                  <span className="w-8 text-right">
                    (
                    {reviewSummary
                      ? reviewSummary[stars as 1 | 2 | 3 | 4 | 5]
                      : 0}
                    )
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="col-span-1 lg:col-span-5 overflow-hidden">
          <div className="space-y-8">
            {reviews?.map((review) => (
              <div key={review._id} className="border-t pt-6">
                <div className="flex justify-between items-center mb-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{review.title}</h3>
                  <span className="font-medium">{review.author}</span>
                </div>

                <p className="text-gray-800 mb-4">{review.content}</p>

                <div className="flex items-center text-sm">
                  <span className="mr-2">Was this review helpful?</span>
                  <button className="hover:underline">
                    Yes ({review.helpful.yes})
                  </button>
                  <span className="mx-1">No ({review.helpful.no})</span>
                  <span className="mx-2">|</span>
                  <button className="hover:underline text-gray-600">
                    Flag as inappropriate
                  </button>
                </div>
              </div>
            ))}

            {reviews && reviews.length === 0 && (
              <div className="text-center py-8">
                <p>
                  No reviews found for this product
                  {selectedRating ? ` with ${selectedRating} stars` : ""}.
                </p>
                {selectedRating && (
                  <button
                    onClick={() => setSelectedRating(undefined)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
