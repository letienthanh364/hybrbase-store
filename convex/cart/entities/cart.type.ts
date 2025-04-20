import { Id } from "../../_generated/dataModel";

export interface CartItem {
  productId: Id<"products">;
  name: string;
  avatar: string;
  colorCode: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  _id: Id<"carts">;
  userId: string;
  items: CartItem[];
  updatedAt: number;
}

export interface AddToCartInput {
  productId: Id<"products">;
  name: string;
  color: string;
  colorCode: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateCartItemInput {
  productId: Id<"products">;
  color: string;
  size: string;
  quantity: number;
}

export interface RemoveFromCartInput {
  productId: Id<"products">;
  color: string;
  size: string;
}
