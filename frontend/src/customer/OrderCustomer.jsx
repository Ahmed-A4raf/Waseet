import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

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
      <div className="pt-24 flex justify-center items-center min-h-[60vh]">
        <Loading size="large" />
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
      <motion.h2
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl font-bold mb-6 text-gray-800 dark:text-zinc-50"
      >
        Order #{order.id}
      </motion.h2>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Order Summary Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-900">
            <p className="text-sm text-gray-500 dark:text-zinc-400">Status</p>
            <p className="text-lg font-semibold text-primary">
              {order.status}
            </p>
          </div>

          {/* Order Date */}
          <div className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-900">
            <p className="text-sm text-gray-500 dark:text-zinc-400">Order Date</p>
            <p className="text-lg font-semibold dark:text-white">
              {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>

          {/* Delivery Method */}
          <div className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-900">
            <p className="text-sm text-gray-500 dark:text-zinc-400">Delivery Method</p>
            <p className="text-lg font-semibold dark:text-white">
              {order.deliveryMethod} (${order.deliveryMethodCost})
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
              {order.deliveryMethodDescription}
            </p>
          </div>

          {/* Total */}
          <div className="p-4 border border-gray-200 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-900">
            <p className="text-sm text-gray-500 dark:text-zinc-400">Total</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-zinc-50">
            Shipping Address
          </h3>
          <p className="text-gray-700 dark:text-zinc-300 leading-relaxed">
            {order.shippingToAddress.firstName} {order.shippingToAddress.lastName}
            <br />
            {order.shippingToAddress.street}
            <br />
            {order.shippingToAddress.city}, {order.shippingToAddress.country}
          </p>
        </div>

        {/* Order Items */}
        <div>
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
      </motion.div>

      {/* Back button */}
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
