"use client";

import React, { useEffect } from "react";

import CheckoutAddress from "./_children/CheckoutAddress";
import CheckoutShipping from "./_children/CheckoutShipping";
import CheckoutPayment from "./_children/CheckoutPayment";
import useCheckoutStore from "./_stores/useCheckout.store";
import Checkout_CartSummary from "./_children/Checkout_CartSummary";
import CheckoutHeader from "./_children/CheckoutHeader";

const CheckoutLayout = () => {
  const { currentSection, goToNextSection, setSection, goToPreviousSection } =
    useCheckoutStore();

  useEffect(() => {
    setSection("address");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        return <CheckoutShipping />;
      case "payment":
        return <CheckoutPayment />;
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
