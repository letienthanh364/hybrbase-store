import HandledImage from "@/components/HandledImage";
import CartServices from "@/services/cart.service";
import React from "react";
import useCheckoutStore from "../_stores/useCheckout.store";

export default function Checkout_CartSummary() {
  const { coupon, setCoupon } = useCheckoutStore();

  const { cartData } = CartServices.useGetCartData();
  const cartItems = cartData?.items || [];

  // ! remove prodct
  const { removeItemFromCart } = CartServices.useRemoveItemFromCart();

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal; // Shipping will be calculated at next step

  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-2xl font-bold mb-6">Your cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.productId}
          className="flex border-b border-gray-200 py-4 items-start"
        >
          <div className="w-24 h-24 bg-gray-300 flex-shrink-0">
            <HandledImage
              src={item.avatar}
              alt={item.name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-600">Size: {item.size}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-xl font-bold mt-2">${item.unitPrice}</p>
          </div>
          <button
            onClick={() => removeItemFromCart(item)}
            className="text-sm text-gray-600 hover:text-black"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter coupon code here"
          className="w-full p-3 border border-gray-300 rounded"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span className="text-gray-600">Calculated at the next step</span>
        </div>

        <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}
