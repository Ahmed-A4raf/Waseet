import React, { useState, useEffect } from "react";
import {
  BarChart2,
  User,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Star,
  Menu,
  Home,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/dashboard" },
  { name: "Profile", icon: User, color: "#6EE7B7", href: "/dashboard/profile" },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/dashboard/products" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/dashboard/orders" },
  { name: "Payments", icon: DollarSign, color: "#10B981", href: "/dashboard/payments" },
  { name: "Reviews", icon: Star, color: "#3B82F6", href: "/dashboard/reviews" },
  { name: "Home", icon: Home, color: "#3d3d3d", href: "/" },
];

const SidebarSp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Close sidebar on smaller screens
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-primary-light transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        {/* sidebar items */}
        <div className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors mb-2">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="ml-4 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarSp;