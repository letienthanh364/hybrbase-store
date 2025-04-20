import { Id } from "../../_generated/dataModel";

// review.type.ts
export interface ReviewModel {
  id: Id<"reviews">;
  productId: Id<"products">;
  rating: number;
  title: string;
  content: string;
  author: string;
  date: string;
  helpful: {
    yes: number;
    no: number;
  };
}
