import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    deliveryMethodId: "",
  });

  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDeliveryMethods = async () => {
    try {
      const res = await fetch("http://waseet.runasp.net/api/Order/deliveryMethods");
      const data = await res.json();
      setDeliveryMethods(data);

      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          deliveryMethodId: data[0].id,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch delivery methods", err);
    }
  };

  const fetchBasketId = async () => {
    try {
      const res = await fetch("http://waseet.runasp.net/api/Cart/basket/id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch basket");
      }
      const data = await res.text();
      setBasketId(data);
    } catch (err) {
      console.error("Failed to fetch basket id", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!basketId) {
      setError("Basket not loaded. Please try again later.");
      setLoading(false);
      return;
    }

    if (!formData.deliveryMethodId || parseInt(formData.deliveryMethodId) <= 0) {
      setError("Please select a valid delivery method.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Update delivery method in basket
      await fetch(
        `http://waseet.runasp.net/api/Cart/basket/delivery-method?deliveryMethodId=${formData.deliveryMethodId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 2: Send order
      const payload = {
        basketId,
        deliveryMethodId: parseInt(formData.deliveryMethodId),
        shippingToAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          street: formData.street,
        },
      };

      // console.log("🚀 Payload being sent to server:", payload);
      console.log("🚀 Payload being sent to server:", JSON.stringify(payload, null, 2));


      const res = await fetch("http://waseet.runasp.net/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchDeliveryMethods();
      fetchBasketId();
    }
  }, [token]);

  return (
    <div className="pt-24 px-4 max-w-md mx-auto">
      {order ? (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4 text-green-600">
            Order Placed Successfully!
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Shipping Information
          </h2>

          {["firstName", "lastName", "phone", "country", "city", "street"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            />
          ))}

          <select
            required
            name="deliveryMethodId"
            value={formData.deliveryMethodId}
            onChange={handleChange}
            className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
          >
            {deliveryMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.shortName} (${method.cost})
              </option>
            ))}
          </select>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || !basketId}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark w-full"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      )}
    </div>
  );
};

export default OrderDetails;
