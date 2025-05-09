import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import StatCardSp from "../../serviceProvider/commenSp/StatCardSp";
import { Package, Clock, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) throw new Error("No token found.");

        const res = await fetch("http://waseet.runasp.net/api/order/admin-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Admin Orders" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATISTICS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCardSp
            name="Total Orders"
            icon={Package}
            value={orders.length}
            color="#6366F1"
          />
          <StatCardSp
            name="Unique Customers"
            icon={Truck}
            value={[...new Set(orders.map((o) => o.buyerEmail))].length}
            color="#10B981"
          />
          <StatCardSp
            name="Total Amount"
            icon={Clock}
            value={`$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`}
            color="#EF4444"
          />
        </motion.div>

        {/* TABLE */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-zinc-300 mt-4">Loading...</p>
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
                  <th className="px-6 py-3 text-left">Buyer</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Created At</th>
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
                    <td className="px-6 py-4">{order.buyerEmail}</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">{order.status || "Pending"}</td>
                    <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/orders/details/${order.id}`)}
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

export default OrdersAdmin;
