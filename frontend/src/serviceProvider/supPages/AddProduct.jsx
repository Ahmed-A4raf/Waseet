import React from 'react'
import HeaderSp from '../commenSp/HeaderSp'
import { motion } from 'framer-motion'
import StatCardSp from '../commenSp/StatCardSp'
import { Package, TrendingUp, Plus, DollarSign } from 'lucide-react'
import ProductsTableSp from '../addProduct/ProductsTableSp'
import { Link } from 'react-router-dom'

const AddProduct = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <HeaderSp title='Add Product' />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
             {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
            <StatCardSp name='Total Products' icon={Package} value={12} color='#6366F1' />
            <StatCardSp name='Top Selling' icon={TrendingUp} value={8} color='#10B981' />         
            <StatCardSp name='Total Revenue' icon={DollarSign} value={"$130,210"} color='#EF4444' />
        </motion.div>

        {/* Create Product */}
        <motion.div
          className="bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 mb-1 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
            <Link to='/dashboard/addProduct/creat'>
                <div className="px-4 py-5 sm:p-6">
                    <span className="flex items-center text-xl font-medium">
                    <Plus size={20} className="mr-2" />
                    Create Product
                    </span>
                </div>
            </Link>
        </motion.div>

        {/* TABLE OF PRODUCTS */}
        <ProductsTableSp />

        </main>
    </div>
  )
}

export default AddProduct