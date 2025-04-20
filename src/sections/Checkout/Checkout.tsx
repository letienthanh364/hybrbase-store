"use client";

import React from "react";

import CheckoutAddress from "./_children/CheckoutAddress";
import CheckoutShipping from "./_children/CheckoutShipping";
import CheckoutPayment from "./_children/CheckoutPayment";
import useCheckoutStore from "./_stores/useCheckout.store";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@/providers/authProvider";
import HandledImage from "@/components/HandledImage";
import CartServices from "@/services/cart.service";
import Checkout_CartSummary from "./_children/Checkout_CartSummary";
import CheckoutHeader from "./_children/CheckoutHeader";

const CheckoutLayout = () => {
  const { currentSection, goToNextSection, goToPreviousSection } =
    useCheckoutStore();

  const { cartData } = CartServices.useGetCartData();
  const cartItems = cartData?.items || [];

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal; // Shipping will be calculated at next step

  // Function to render the appropriate component based on current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case "address":
        return (
          <CheckoutAddress
            onContinue={goToNextSection}
            onBack={goToPreviousSection}
          />
        );
      case "shipping":
        return (
          <CheckoutShipping
            onContinue={goToNextSection}
            onBack={goToPreviousSection}
          />
        );
      case "payment":
        return (
          <CheckoutPayment
            onContinue={goToNextSection}
            onBack={goToPreviousSection}
          />
        );
      default:
        return (
          <CheckoutAddress
            onContinue={goToNextSection}
            onBack={goToPreviousSection}
          />
        );
    }
  };

  return (
    <div className="container py-8 ">
      <CheckoutHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
        {/* Main content area */}
        {renderCurrentSection()}

        {/* Cart summary sidebar */}
        <Checkout_CartSummary />
      </div>
    </div>
  );
};

export default CheckoutLayout;
