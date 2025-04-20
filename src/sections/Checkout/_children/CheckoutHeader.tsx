import React from "react";
import useCheckoutStore from "../_stores/useCheckout.store";
import classNames from "classnames";

export default function CheckoutHeader() {
  const { currentSection } = useCheckoutStore();

  const steps = [
    { id: "address", label: "Address" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = currentSection === step.id;
          // const isPast =
          //   steps.findIndex((s) => s.id === currentSection) > index;

          return (
            <React.Fragment key={step.id}>
              {/* Step label */}
              <p
                className={classNames("", {
                  "font-medium": !isActive,
                  "font-semibold": isActive,
                })}
              >
                {step.label}
              </p>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="w-24 h-px bg-gray-300 mx-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
