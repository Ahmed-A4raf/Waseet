import React, { useState, useEffect } from "react";
import {
  BarChart2,
  ShoppingCart,
  Menu,
  Home,
  Users,
  ChartBarStacked,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/admin" },
  {
    name: "Categories",
    icon: ChartBarStacked,
    color: "#6EE7B7",
    href: "/admin/categories",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    color: "#EC4899",
    href: "/admin/AllProducts",
  },
  {
    name: "Users",
    icon: Users,
    color: "#8B5CF6",
    href: "/admin/users",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    color: "#F59E0B",
    href: "/admin/orders",
  },
  { name: "Home", icon: Home, color: "#3d3d3d", href: "/" },
];

const SidebarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  //! Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
      <div className="h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-300 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50">
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
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors mb-2 dark:hover:bg-zinc-800">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
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

        {/* logout button */}
        <button
          onClick={handleLogout}
          className={`group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg
       ${
         !isSidebarOpen || window.innerWidth < 768
           ? "hover:w-11 hover:rounded-full transition-none active:translate-x-0 active:translate-y-0"
           : "hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
       }
     `}
        >
          <div
            className={`flex items-center justify-center w-full transition-all duration-300
       ${
         !isSidebarOpen || window.innerWidth < 768
           ? "group-hover:justify-center group-hover:px-0"
           : "group-hover:justify-start group-hover:px-3"
       }
     `}
          >
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div
            className={`absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300
       ${
         !isSidebarOpen || window.innerWidth < 768
           ? "hidden"
           : "group-hover:translate-x-0 group-hover:opacity-100"
       }
     `}
          >
            Logout
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default SidebarAdmin;
