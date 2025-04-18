import React from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";

import StatCardSp from "../../serviceProvider/commenSp/StatCardSp";
import { Zap, ShoppingBag, Users } from "lucide-react";

import { motion } from "framer-motion";
import SalesOverviewChartAdmin from "../overviewAdmin/SalesOverviewChartAdmin";
import CategoryDistributionChart from "../overviewAdmin/CategoryDistributionChart";

const OverViewAdmin = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Admin Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCardSp
            name="Total Sales"
            icon={Zap}
            value="$12,345"
            color="#6366F1"
          />
          <StatCardSp
            name="New Users"
            icon={Users}
            value="1,234"
            color="#EC4899"
          />
          <StatCardSp
            name="Total Products"
            icon={ShoppingBag}
            value="56"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CHART 1 left */}
          <SalesOverviewChartAdmin />

          {/* CHART 2 right */}
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverViewAdmin;
