import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Customer Name", // يمكن تغييره لاحقًا بناءً على بيانات المستخدم
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment succeeded!");
        navigate("/orderCustomer"); // يمكنك تغييره إلى صفحة نجاح مثل /payment-success
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-md dark:bg-zinc-800 dark:border-zinc-600">
        <CardElement />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
