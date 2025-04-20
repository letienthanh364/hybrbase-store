import React, { useState } from "react";
import { toast } from "sonner";
import useCheckoutStore from "../_stores/useCheckout.store";
import HandledImage from "@/components/HandledImage";
import classNames from "classnames";
import { useCheckoutStore_Address } from "../_stores/useCheckout_Address.store";
import OrderServices from "@/services/order.service";
import CartServices from "@/services/cart.service";

export default function CheckoutPayment() {
  const { addressData } = useCheckoutStore_Address();
  const { goToNextSection, goToPreviousSection, selectedShipping } =
    useCheckoutStore();

  const { cartData } = CartServices.useGetCartData();
  const cartItems = cartData?.items || [];
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = selectedShipping ? subtotal + selectedShipping.price : subtotal;

  // Payment method selection state
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "apple"
  >("card");

  // Card details state
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // ! Handle back button click
  const handleBack = () => {
    goToPreviousSection();
  };

  // ! Handle payment submission
  const { createOrder } = OrderServices.useCreateOrder();
  const handleSubmitPayment = async () => {
    // Simple validation
    if (paymentMethod === "card") {
      if (!cardholderName.trim()) {
        toast.error("Please enter cardholder name");
        return;
      }
      if (!cardNumber.trim()) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!month || !year || !cvc) {
        toast.error("Please complete all card details");
        return;
      }
    }

    if (!selectedShipping) {
      toast.error("Please select a shipping method");
      return;
    }

    // Process payment
    try {
      // Call the createOrder function
      const orderId = await createOrder({
        cartItems,
        selectedShipping,
        addressData,
        subtotal,
        total,
      });

      toast.success(`Order created with ID: ${orderId}`);
      goToNextSection();
    } catch (error) {
      // Error is already handled in createOrder function
      console.error("Payment submission failed:", error);
      toast.error("Failed to create order, please try again!");
    }
  };

  // ! Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    return {
      value: monthNum.toString().padStart(2, "0"),
      label: monthNum.toString().padStart(2, "0"),
    };
  });

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const yearNum = currentYear + i;
    return {
      value: yearNum.toString(),
      label: yearNum.toString(),
    };
  });

  return (
    <div className="w-full">
      {/* Payment Methods */}
      <div className="flex mb-6 gap-2 overflow-hidden">
        <button
          className={classNames(
            `flex-1 opacity-70 py-3 px-4 flex justify-center border-blue-600 border items-center`,
            {
              "opacity-100": paymentMethod === "paypal",
            }
          )}
          onClick={() => setPaymentMethod("paypal")}
        >
          <HandledImage
            src="/images/PayPal.png"
            alt="Paypal"
            className=""
            width={60}
            height={16}
          />
          {/* <span className="text-blue-600 font-semibold">
            <span className="font-bold">Pay</span>Pal
          </span> */}
        </button>

        <button
          className={classNames(
            `flex-1 py-3 px-4 bg-gray-700 text-white border flex justify-center items-center `,
            {
              "bg-gray-900": paymentMethod === "apple",
            }
          )}
          onClick={() => setPaymentMethod("apple")}
        >
          <span className="font-semibold">
            <span className="font-normal">Apple</span>Pay
          </span>
        </button>
      </div>

      {/* Payment Details Title */}
      <h2 className="text-lg font-medium mb-4">Payment Details</h2>

      {/* Card Details Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full p-3 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-3 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
          value={cardNumber}
          onChange={(e) => {
            // Allow only numbers and limit length
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 16) setCardNumber(value);
          }}
        />

        <div className="flex gap-2">
          <div className="w-1/3">
            <select
              className="w-full p-3 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 appearance-none"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="" disabled>
                Month
              </option>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/3">
            <select
              className="w-full p-3 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 appearance-none"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled>
                Year
              </option>
              {yearOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/3">
            <input
              type="text"
              placeholder="CVC"
              className="w-full p-3 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={cvc}
              onChange={(e) => {
                // Allow only numbers and limit length
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 4) setCvc(value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="save-card"
            className="flex items-center text-sm text-gray-700 cursor-pointer"
          >
            <span>Save card data for future payments</span>
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="save-card"
              className="sr-only peer"
              checked={saveCard}
              onChange={() => setSaveCard(!saveCard)}
            />
            <label
              htmlFor="save-card"
              className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-black w-10 transition-colors"
            ></label>
            <span
              className="absolute cursor-pointer left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"
              onClick={() => setSaveCard(!saveCard)}
            ></span>
          </div>
        </div>

        <div className="">
          <button
            className="w-full bg-black text-white py-3 px-4 rounded transition-colors hover:bg-gray-800"
            onClick={handleSubmitPayment}
          >
            Pay with card
          </button>

          <button
            onClick={handleBack}
            className="w-full text-gray-600 mt-2 py-2 hover:text-gray-800 transition-colors"
          >
            Back to shipping
          </button>
        </div>
      </div>
    </div>
  );
}
