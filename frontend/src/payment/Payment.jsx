import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../payment/CheckoutForm";

// ✅ ضع مفتاح النشر من Stripe Dashboard هنا
const stripePromise = loadStripe("pk_test_51RFk3eLZYn6WqnTpq6DDHzTASPcudgYCIFU3Xljm1Q8sjTCvBeavPM7nBjMBmLktqD6fHavN4oCqiYggBzLqmrXd00EoBUIYVH"); 

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

  // ⚠️ لا تحاول تحميل Elements إذا لم يكن clientSecret متوفّر
  if (!clientSecret) {
    return (
      <div className="pt-24 text-center text-red-500">
        Payment information is missing.
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-100">
        Complete Your Payment
      </h2>

      {/* Stripe Elements context with clientSecret */}
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default Payment;
