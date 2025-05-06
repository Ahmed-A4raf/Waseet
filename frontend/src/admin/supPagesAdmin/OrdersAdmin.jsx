import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import StatCardSp from "../../serviceProvider/commenSp/StatCardSp";
import { Package, Clock, Truck } from "lucide-react";
import { motion } from "framer-motion";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          throw new Error("No token found. User might not be logged in.");
        }

        const res = await fetch("http://waseet.runasp.net/api/order/admin-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

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
          <StatCardSp name="Total Orders" icon={Package} value={orders.length} color="#6366F1" />
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
          <p className="mt-4">Loading...</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Buyer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.buyerEmail}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.status || "Pending"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersAdmin;
