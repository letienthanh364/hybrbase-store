import { Id } from "../../_generated/dataModel";

// Define Order interfaces
export interface OrderDoc extends Omit<Order, "id"> {
  _id: Id<"orders">;
  _creationTime: number;
}

export interface Order {
  id: Id<"orders">;
  subtotal: number;
  total: number;
  addressModel: AddressModel;
  shippingModel: ShippingModel;
  products: OrderProduct[];
  paymentStatus: PaymentStatus;
  userId: Id<"users">;
  orderDate: number; // timestamp
}

export interface AddressModel {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  zipcode: string;
  note?: string;
}

export interface ShippingModel {
  type: ShippingType;
  price: number;
}

export enum ShippingType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export interface OrderProduct {
  productId: Id<"products">;
  name: string;
  unitPrice: number;
  quantity: number;
  size: string;
  color: string;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}
