import React from "react";
import HeaderSp from "../commenSp/HeaderSp";

import { motion } from "framer-motion";
import StatCardSp from "../commenSp/StatCardSp";

import { Zap, ShoppingBag, Plus } from "lucide-react";
import SalesOverviewChart from "../overviewSp/SalesOverviewChart";

const OverviewSp = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Service Provider Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
            <StatCardSp  name='Total Payments' icon={Zap} value='$12,345' color='#6366F1'/>
            <StatCardSp  name='Total Reviews' icon={Plus} value='0' color='#EC4899'/>
            <StatCardSp  name='Total Purchases' icon={ShoppingBag} value='12' color='#10B981'/>
        </motion.div>

        {/* CHARTS */}
          <SalesOverviewChart />
          
      </main>
    </div>
  );
};

export default OverviewSp;
