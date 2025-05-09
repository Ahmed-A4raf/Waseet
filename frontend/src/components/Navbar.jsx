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

  const adminDropdown = () => [{ label: "Dashboard", path: "/admin" }];

  const serviceProviderDropdown = () => [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
  ];

  const customerDropdown = () => [
    { label: "Profile", path: "/profileCustomer" },
    { label: "My Orders", path: "/orderCustomer" },
  ];

  const dropDownMenus =
    user?.role === "admin"
      ? adminDropdown()
      : user?.role === "serviceProvider"
      ? serviceProviderDropdown()
      : customerDropdown();

  return (
    <header className="fixed-nav-bar w-nav shadow-sm z-50 fixed w-full bg-[#fffffff9] dark:bg-zinc-800">
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
                    <div className="absolute right-0 mt-3 p-4 w-48 border border-gray-200 bg-white rounded-lg shadow-lg z-50 dark:bg-zinc-800 dark:border-zinc-600">
                      <ul className="font-medium space-y-4 p-2">
                        {dropDownMenus.map((menu, index) => (
                          <li key={index}>
                            <Link
                              onClick={() => setIsDropdownOpen(false)}
                              className="dropdown-items dark:text-zinc-50"
                              to={menu.path}
                            >
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            onClick={handleLogout}
                            className="dropdown-items dark:text-zinc-50"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <i className="ri-user-line bg-primary-light py-1 px-6 rounded-full hover:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:text-primary"></i>
                </Link>
              )}
            </span>
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              value=""
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-12 h-6 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
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
