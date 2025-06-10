import React from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import StatCardSp from "../../serviceProvider/commenSp/StatCardSp";
import { Package, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import CategoryDistributionChart from "../overviewAdmin/CategoryDistributionChart";
import SalesTrendChart from "../allProductsAdmin/SalesTrendChart";
import AllProductsTableAdmin from "../allProductsAdmin/AllProductsTableAdmin";

const AllProductsAdmin = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="All Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATISTICS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCardSp name="Total Products" icon={Package} value={39} color="#6366F1" />
          <StatCardSp name="Top Selling" icon={TrendingUp} value={34} color="#10B981" />
          <StatCardSp name="Total Revenue" icon={DollarSign} value={"$52,210"} color="#EF4444" />
        </motion.div>

        {/* ALL PRODUCTS TABLE */}
        <AllProductsTableAdmin  />
        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8 mt-10">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default AllProductsAdmin;
