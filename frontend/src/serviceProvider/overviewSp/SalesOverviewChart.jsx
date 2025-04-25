import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
];

const SalesOverviewChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Sales Overview</h2>

        <select
          className=" bg-primary-light rounded-md px-3 py-1 focus:outline-none focus:ring-1 
          focus:ring-gray-300 dark:bg-zinc-800 dark:text-zinc-50
          "
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={monthlySalesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#444" : "#999"}
            />
            <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#111"} />
            <YAxis stroke={isDark ? "#e5e7eb" : "#111"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#18181b" : "#f7f8fc",
                borderColor: "#ddd",
              }}
              itemStyle={{ color: isDark ? "#fff" : "#111" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#e97415"
              fill="#fd7e14"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default SalesOverviewChart;
