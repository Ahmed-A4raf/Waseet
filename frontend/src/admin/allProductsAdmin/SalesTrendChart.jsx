import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";

const salesData = [
	{ month: "Jan", sales: 4000 },
	{ month: "Feb", sales: 3000 },
	{ month: "Mar", sales: 5000 },
	{ month: "Apr", sales: 4500 },
	{ month: "May", sales: 6000 },
	{ month: "Jun", sales: 5500 },
];

const SalesTrendChart = () => {
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
			className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-medium mb-4'>Sales Trend</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke={isDark ? "#444" : "#999"} />
						<XAxis dataKey='month' stroke={isDark ? "#e5e7eb" : "#111"} />
						<YAxis stroke={isDark ? "#e5e7eb" : "#111"} />
						<Tooltip
							contentStyle={{
								backgroundColor: isDark ? "#18181b" : "#f7f8fc",
								borderColor: "#ddd",
							}}
							itemStyle={{ color: isDark ? "#fff" : "#111" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='sales' stroke='#e97415' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesTrendChart;
