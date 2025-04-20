import React from "react";
import { toast } from "sonner";
import useCheckoutStore, { ShippingOption } from "../_stores/useCheckout.store";

export default function CheckoutShipping() {
  // Get store functions
  const {
    goToNextSection,
    goToPreviousSection,
    setSelectedShipping,
    selectedShipping,
  } = useCheckoutStore();

  // Define shipping options
  const shippingOptions: ShippingOption[] = [
    {
      id: "ups-surepost",
      name: "UPS/USPS Surepost",
      description: "4-7 Business Days",
      daysRange: "4-7 Business Days",
      price: 5.99,
    },
    {
      id: "ups-ground",
      name: "UPS Ground Shipping",
      description: "3-5 Business Days",
      daysRange: "3-5 Business Days",
      price: 8.99,
    },
  ];

  // ! Handle shipping selection
  const handleShippingSelection = (shipping: ShippingOption) => {
    setSelectedShipping(shipping);
    // You could toast a confirmation if desired
    toast.success(`Selected ${shipping.name}`);
  };

  // Handle continue button click
  const handleContinue = () => {
    if (!selectedShipping) {
      toast.error("Please select a shipping method");
      return;
    }

    // In a real app, you would save the selection to your store here
    // store.setSelectedShipping(selectedShipping);

    // Use the store's navigation function
    goToNextSection();
  };

  // Handle back button click
  const handleBack = () => {
    goToPreviousSection();
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-4">Select Shipping Method</h2>

      <div className="space-y-3 mb-6">
        {shippingOptions.map((option) => (
          <button
            key={option.id}
            className={`border p-4 w-full  bg-white transition-colors ${
              selectedShipping?.id === option.id
                ? "border-black ring-1 ring-black"
                : "border-transparent hover:border-black"
            }`}
            onClick={() => handleShippingSelection(option)}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedShipping?.id === option.id}
                onChange={() => handleShippingSelection(option)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-500">{option.daysRange}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20">
        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-3 px-4 hover:bg-gray-800 transition-colors"
        >
          Continue to payment
        </button>

        <button
          onClick={handleBack}
          className="w-full text-gray-600 mt-2 py-2 hover:text-gray-800 transition-colors"
        >
          Back to address
        </button>
      </div>
    </div>
  );
}
