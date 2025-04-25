import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

const categoryData = [
  { name: "Handicrafts", value: 4500 },
  { name: "Food", value: 3200 },
  { name: "Clothing", value: 2800 },
  { name: "Electronics", value: 2100 },
  { name: "Automobiles", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
  
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
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4">
        Category Distribution
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#f7f8fc"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#18181b" : "#f7f8fc",
                borderColor: "#ddd",
              }}
              itemStyle={{ color: isDark ? "#fff" : "#111" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
