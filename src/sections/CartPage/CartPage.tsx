"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartServices from "@/services/cart.service";
import AppPath from "@/constants/path.const";

export default function CartPage() {
  const { cartData } = CartServices.useGetCartData();

  const cartItems = cartData?.items || [];

  const [couponCode, setCouponCode] = useState<string>("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal; // Shipping will be calculated at next step

  const [shippingOptionsOpen, setShippingOptionsOpen] =
    useState<boolean>(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState<boolean>(true);

  // ! remove prodct
  const { removeItemFromCart } = CartServices.useRemoveItemFromCart();

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your cart</h1>

      {cartItems.length > 0 ? (
        <>
          <p className="mb-6 font-semibold">
            Not ready to checkout?{" "}
            <Link
              href="/shop"
              className="text-black font-semibold hover:text-blue-600"
            >
              Continue Shopping
            </Link>
          </p>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-3/5">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className=" border-b border-gray-600 py-4 grid grid-cols-4"
                >
                  <div className="min-h-full aspect-square bg-gray-300 flex-shrink-0 relative">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      sizes="96"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex col-span-3 justify-between flex-grow items-start">
                    <div className="ml-4 ">
                      <p className="text-xl font-bold">{item.name}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xl font-bold mt-2">
                        ${item.unitPrice}
                      </p>
                    </div>
                    <div className="h-full flex items-end">
                      <button
                        onClick={() => removeItemFromCart(item)}
                        className="text-sm text-gray-600 hover:text-black underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-2/5">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code here"
                  className="w-full p-3 border border-gray-300 rounded"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>

              <div className=" pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="text-gray-600">
                    Calculated at the next step
                  </span>
                </div>

                <div className="flex justify-between font-bold mt-4 pt-4 border-t border-black">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Link
                href={AppPath.checkout}
                className="w-full flex justify-center mt-6 bg-black text-white py-4  font-medium hover:bg-gray-800 transition-colors"
              >
                Continue to checkout
              </Link>
            </div>
          </div>

          {/* Order Information Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Order Information</h2>

            <div className="border-t border-gray-200">
              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => setReturnPolicyOpen(!returnPolicyOpen)}
                  className="flex justify-between w-full text-left"
                >
                  <span className="font-medium">Return Policy</span>
                  <span>{returnPolicyOpen ? "−" : "+"}</span>
                </button>

                {returnPolicyOpen && (
                  <div className="mt-2 text-gray-600">
                    <p>
                      This is our example return policy which is everything you
                      need to know about our returns.
                    </p>
                  </div>
                )}
              </div>

              <div className="py-4 border-b border-gray-200">
                <button
                  onClick={() => setShippingOptionsOpen(!shippingOptionsOpen)}
                  className="flex justify-between w-full text-left"
                >
                  <span className="font-medium">Shipping Options</span>
                  <span>{shippingOptionsOpen ? "−" : "+"}</span>
                </button>

                {shippingOptionsOpen && (
                  <div className="mt-2 text-gray-600">
                    <p>Shipping options will be calculated at checkout.</p>
                  </div>
                )}
              </div>

              <div className="py-4 border-b border-gray-200">
                <button className="flex justify-between w-full text-left">
                  <span className="font-medium">Shipping Options</span>
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link
            href="/shop"
            className="bg-black text-white px-6 py-3 inline-block"
          >
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}
