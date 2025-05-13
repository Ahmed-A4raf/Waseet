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
          name: "Customer Name", // أو خده من localStorage
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // 🟢 استرجع بيانات الشحن
        const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
        const basketId = localStorage.getItem("basketId");
        const token = JSON.parse(localStorage.getItem("user"))?.token;

        const payload = {
          basketId,
          deliveryMethodId: parseInt(shippingInfo.deliveryMethodId),
          shippingToAddress: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            phone: shippingInfo.phone,
            country: shippingInfo.country,
            city: shippingInfo.city,
            street: shippingInfo.street,
          },
        };

        // 🟢 أنشئ الطلب الآن
        const res = await fetch("http://waseet.runasp.net/api/Order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        // 🟢 نظف السلة
        await fetch("http://waseet.runasp.net/api/Cart/basket", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🟢 احذف من localStorage
        localStorage.removeItem("shippingInfo");
        localStorage.removeItem("basketId");

        // 🟢 توجه لصفحة التأكيد
        navigate(`/orderCustomer/${data.id}`);
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
