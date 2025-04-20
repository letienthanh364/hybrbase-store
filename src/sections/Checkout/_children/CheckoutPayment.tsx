import React from "react";

interface CheckoutPaymentProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function CheckoutPayment({}: CheckoutPaymentProps) {
  return <div className="">CheckoutPayment</div>;
}
