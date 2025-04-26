import React, { useState } from "react";

const OrderDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    deliveryMethodId: 1,
  });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basketId = "dummy-basket-id"; // until received from omda
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

    try {
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
      setOrder(data[0]);
    } catch (err) {
      console.error(err);
      setError("An error occurred while placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 max-w-md mx-auto">
      {order ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-600">Order Confirmed</h2>
          <p><strong>Email:</strong> {order.buyerEmail}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Delivery Method:</strong> {order.deliveryMethod} (${order.deliveryMethodCost})</p>
          <p><strong>Shipping Address:</strong> {order.shippingToAddress.city}, {order.shippingToAddress.street}</p>

          <h3 className="mt-4 font-bold">Items:</h3>
          <ul className="list-disc ml-6">
            {order.orderItems.map((item) => (
              <li key={item.id}>
                {item.productItemOrder.productName} × {item.quantity} - ${item.price}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-bold text-lg">Total: ${order.total}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          {["firstName", "lastName", "phone", "country", "city", "street"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          ))}

          <select
            name="deliveryMethodId"
            value={formData.deliveryMethodId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="1">Express Delivery</option>
            <option value="2">Standard Delivery</option>
          </select>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
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
