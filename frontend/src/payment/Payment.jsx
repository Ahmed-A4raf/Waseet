// src/pages/Payment.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../payment/CheckoutForm";

const stripePromise = loadStripe("pk_test_..."); // 🔐 ضع مفتاح النشر الخاص بـ Stripe هنا

const Payment = () => {
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return (
      <div className="pt-24 text-center text-red-500">
        No client secret provided.
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-100">
        Complete Your Payment
      </h2>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
