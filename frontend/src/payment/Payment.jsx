import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../payment/CheckoutForm";

// ✅ Stripe publishable key
const stripePromise = loadStripe("pk_test_51RFk3eLZYn6WqnTpq6DDHzTASPcudgYCIFU3Xljm1Q8sjTCvBeavPM7nBjMBmLktqD6fHavN4oCqiYggBzLqmrXd00EoBUIYVH");

const Payment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const basketId = localStorage.getItem("basketId");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch(`http://waseet.runasp.net/api/Payments/${basketId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!data.clientSecret) throw new Error("Missing clientSecret");

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError("⚠️ Failed to load payment session. Try again.");
        console.error(err);
      }
    };

    if (basketId && token) {
      fetchClientSecret();
    }
  }, [basketId, token]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (error) {
    return (
      <div className="pt-24 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading payment session...
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
