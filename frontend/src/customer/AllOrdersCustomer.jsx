import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const AllOrdersCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://waseet.runasp.net/api/Order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
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
  }, [token]);

  if (loading)
    return (
      <div className="pt-24 text-center text-lg dark:text-zinc-100">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="pt-24 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <motion.h2
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl font-bold mb-4 text-gray-800 dark:text-zinc-50"
      >
        All Customer Orders
      </motion.h2>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-500 dark:text-zinc-300">
         <span className="text-primary">NO</span> orders found yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-zinc-800">
          <table className="min-w-full table-auto text-sm text-gray-700 dark:text-zinc-200">
            <thead className="bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-zinc-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Buyer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Delivery</th>
                <th className="px-6 py-3 text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700"
                  onClick={() => navigate(`/orderCustomer/${order.id}`)}
                >
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {order.id}
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {order.buyerEmail}
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {order.status}
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700 font-semibold">
                    {order.total} $
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {order.deliveryMethod} ({order.deliveryMethodCost} $)
                  </td>
                  <td className="border px-6 py-4 dark:border-zinc-700">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="font-medium">
                          {item.productItemOrder.productName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">
                          Qty: {item.quantity} | Price: {item.price} $
                        </p>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrdersCustomer;
