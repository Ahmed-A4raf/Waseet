import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const DetailsAllOrders = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = "http://waseet.runasp.net";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const response = await fetch(
          "http://waseet.runasp.net/api/order/admin-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch orders.");

        const data = await response.json();
        const matchedOrder = data.find((order) => order.id === parseInt(orderId));

        setOrder(matchedOrder);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Order Details" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-zinc-300">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : order ? (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-50">
              Order #{orderId}
            </h2>

            <div className="text-gray-700 dark:text-zinc-200 space-y-1">
              <h3 className="font-semibold text-lg">Customer Info</h3>
              <p><strong>Email:</strong> {order.buyerEmail}</p>
              <p><strong>Phone:</strong> {order.shippingToAddress?.phone}</p>
            </div>

            <div className="text-gray-700 dark:text-zinc-200 space-y-1">
              <h3 className="font-semibold text-lg">Shipping Address</h3>
              <p>
                {order.shippingToAddress?.firstName} {order.shippingToAddress?.lastName},<br />
                {order.shippingToAddress?.street}, {order.shippingToAddress?.city}, {order.shippingToAddress?.country}
              </p>
            </div>

            <div className="text-gray-700 dark:text-zinc-200 space-y-1">
              <p><strong>Delivery Method:</strong> {order.deliveryMethod} (${order.deliveryMethodCost.toFixed(2)})</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-zinc-50">Order Items</h3>
              <ul className="space-y-4">
                {order.orderItems?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-700 pb-4"
                  >
                    <img
                      src={`${imageBaseUrl}${item.productItemOrder.pictureUrl}`}
                      alt={item.productItemOrder.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="text-gray-700 dark:text-zinc-200">
                      <p className="font-semibold">{item.productItemOrder.productName}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/dashboard/orders")}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded transition"
              >
                Back to Orders
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-white rounded transition"
              >
                Print Invoice
              </button>
            </div>
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 dark:text-zinc-300"><span className="text-primary">No</span> order found.</p>
        )}
      </main>
    </div>
  );
};

export default DetailsAllOrders;
