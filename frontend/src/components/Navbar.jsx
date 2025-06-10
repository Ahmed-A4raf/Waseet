import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cart from "../pages/shop/Cart";
import { syncCartWithServer } from "../redux/features/cart/cartSlice";
import { clearCart } from "../redux/features/cart/cartSlice";
import adminImg from "../assets/admin.png";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      dispatch(clearCart());
      sessionStorage.removeItem("chat_messages");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      if (!token) return;

      try {
        const res = await fetch("http://waseet.runasp.net/api/Cart/basket", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch cart");
          return;
        }

        const data = await res.json();
        dispatch(syncCartWithServer(data));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const adminDropdown = () => [
    { label: "Dashboard", path: "/admin", icon: "ri-dashboard-line" },
  ];

  const serviceProviderDropdown = () => [
    { label: "Dashboard", path: "/dashboard", icon: "ri-dashboard-line" },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: "ri-user-settings-line",
    },
  ];

  const customerDropdown = () => [
    { label: "Profile", path: "/profileCustomer", icon: "ri-user-line" },
    {
      label: "My Orders",
      path: "/orderCustomer",
      icon: "ri-shopping-bag-line",
    },
  ];

  const dropDownMenus =
    user?.role === "admin"
      ? adminDropdown()
      : user?.role === "serviceProvider"
      ? serviceProviderDropdown()
      : customerDropdown();

  return (
    <header className="fixed-nav-bar w-nav z-50 fixed w-full bg-white/95 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:bg-zinc-800/95 dark:border-zinc-700/30">
      <nav className="max-w-screen-2xl mx-auto flex px-4 justify-between items-center">
        {/* nav links */}
        <ul className="nav__links">
          <li>
            <NavLink
              to="/"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                isActive ? "text-primary transition-all duration-300" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                isActive ? "text-primary transition-all duration-300" : ""
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={handleCloseMenu}
              className={({ isActive }) =>
                isActive ? "text-primary transition-all duration-300" : ""
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo hidden md:block sm:block">
          <Link to="/" className="dark:text-zinc-50">
            Waseet <span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <Link to="/search">
            <i className="ri-search-line"></i>
          </Link>
          <button onClick={handleToggleCart} className="hover:text-primary">
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
              {products.length}
            </sup>
          </button>
          <span ref={dropdownRef} className="relative">
            <span
              onClick={handleDropdownToggle}
              className="cursor-pointer hover:text-primary"
            >
              {user ? (
                <>
                  <img
                    src={
                      user?.role === "admin"
                        ? adminImg
                        : user?.profileImage || avatarImg
                    }
                    alt="profile"
                    className="size-6 rounded-full cursor-pointer"
                  />

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-100/20 bg-white/95 backdrop-blur-sm shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:bg-zinc-800/95 dark:border-zinc-700/30 overflow-hidden transform origin-top-right animate-dropdown">
                      <div className="p-2">
                        <ul className="font-medium">
                          {dropDownMenus.map((menu, index) => (
                            <li key={index} className="mb-1">
                              <Link
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-zinc-700/50 dark:text-zinc-50 transition-all duration-200 group"
                                to={menu.path}
                              >
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                                  <i
                                    className={`${menu.icon} text-primary text-lg`}
                                  ></i>
                                </span>
                                <div>
                                  <span className="font-medium text-lg">
                                    {menu.label}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-zinc-50 transition-all duration-200 group"
                            >
                              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100/80 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/40 transition-colors">
                                <i className="ri-logout-box-line text-red-600 dark:text-red-400 text-lg"></i>
                              </span>
                              <div>
                                <span className="font-medium text-red-600 dark:text-red-400">
                                  Logout
                                </span>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <i className="ri-user-line bg-primary-light py-1 px-6 rounded-full hover:bg-gray-100 dark:bg-zinc-900 text-primary dark:text-primary"></i>
                </Link>
              )}
            </span>
          </span>

          <label className="relative inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-200 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-zinc-900">
            <input
              className="peer sr-only"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-200 ring-[4px] ring-inset ring-white transition-all peer-checked:start-6 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>
        </div>

        {/* menu button */}
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden ml-7 text-xl">
          <button
            onClick={handleToggle}
            className={`focus:outline-none text-primary ${
              isOpen ? "ri-close-line" : "ri-menu-line"
            }`}
          ></button>
        </div>
      </nav>

      <Cart
        products={products}
        isOpen={isCartOpen}
        onClose={handleToggleCart}
      />

      {/* mobile menu */}
      {isOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col p-4 space-y-3 w-full bg-primary-light dark:bg-zinc-900 dark:border-white">
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link
                to="/"
                onClick={handleCloseMenu}
                className="dark:text-zinc-50"
              >
                Home
              </Link>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link
                to="/shop"
                onClick={handleCloseMenu}
                className="dark:text-zinc-50"
              >
                Shop
              </Link>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link
                to="/contact"
                onClick={handleCloseMenu}
                className="dark:text-zinc-50"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
