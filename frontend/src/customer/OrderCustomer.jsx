import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        if (!token) throw new Error("No token found in localStorage");

        const res = await fetch(`http://waseet.runasp.net/api/order/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <div className="pt-24 text-center text-lg dark:text-zinc-100">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="pt-24 text-center text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );
  if (!order)
    return (
      <div className="pt-24 text-center text-gray-700 dark:text-zinc-100">
        <span className="text-primary">No</span> order found.
      </div>
    );

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-zinc-50">
        Order #{order.id}
      </h2>

      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 space-y-4">
        <div className="text-gray-700 dark:text-zinc-200">
          <strong className="dark:text-zinc-100">Status:</strong>{" "}
          {order.status}
        </div>
        <div className="text-gray-700 dark:text-zinc-200">
          <strong className="dark:text-zinc-100">Order Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleString()}
        </div>
        <div className="text-gray-700 dark:text-zinc-200">
          <strong className="dark:text-zinc-100">Delivery Method:</strong>{" "}
          {order.deliveryMethod} ({order.deliveryMethodCost}$)
        </div>
        <div className="text-gray-700 dark:text-zinc-200">
          <strong className="dark:text-zinc-100">Total:</strong> $
          {order.total.toFixed(2)}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-zinc-50">
            Shipping Address
          </h3>
          <p className="text-gray-700 dark:text-zinc-300">
            {order.shippingToAddress.firstName}{" "}
            {order.shippingToAddress.lastName}
            <br />
            {order.shippingToAddress.street}
            <br />
            {order.shippingToAddress.city},{" "}
            {order.shippingToAddress.country}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-zinc-50">
            Order Items
          </h3>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full table-auto text-sm text-gray-700 dark:text-zinc-200">
              <thead className="bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-zinc-100">
                <tr>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-center">Qty</th>
                  <th className="px-6 py-3 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={`http://waseet.runasp.net${item.productItemOrder.pictureUrl}`}
                        alt={item.productItemOrder.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.productItemOrder.productName}</span>
                    </td>
                    <td className="border px-6 py-4 text-center dark:border-zinc-700">
                      {item.quantity}
                    </td>
                    <td className="border px-6 py-4 text-center dark:border-zinc-700">
                      ${item.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pt-6 text-right">
        <button
          onClick={() => navigate("/orderCustomer")}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition-colors duration-200 dark:bg-primary dark:hover:bg-primary-dark dark:text-zinc-100"
        >
          Back to my All Orders
        </button>
      </div>
    </div>
  );
};

export default OrderCustomer;
