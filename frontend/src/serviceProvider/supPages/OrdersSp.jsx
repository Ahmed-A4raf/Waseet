import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSp from "../commenSp/HeaderSp";

import { motion } from "framer-motion";

const OrdersSp = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const response = await fetch(
          "http://waseet.runasp.net/api/order/service-provider-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "delivered":
        return "text-green-700 bg-green-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Orders" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-zinc-300">
            Loading orders...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-zinc-400">
            <span className="text-primary">No</span> orders found.
          </p>
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-zinc-800">
            <table className="min-w-full table-auto text-sm text-gray-700 dark:text-zinc-200">
              <thead className="bg-gray-200 dark:bg-zinc-700 dark:text-zinc-100">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Shipping Address</th>
                  <th className="px-6 py-3 text-left">Order Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-zinc-700"
                  >
                    <td className="px-6 py-4 font-medium">#{order.id}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {order.shippingToAddress?.street},{" "}
                      {order.shippingToAddress?.city}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/orders/detailsCustomerOrder/${order.id}`
                          )
                        }
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default OrdersSp;
