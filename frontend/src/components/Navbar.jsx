import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cart from "../pages/shop/Cart";

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
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
    { label: "Dashboard", path: "/admin" },
    { label: "Payments", path: "/admin/payments" },
  ];

  const serviceProviderDropdown = () => [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
  ];

  const customerDropdown = () => [{ label: "Profile", path: "/profileCustomer" }];

  const dropDownMenus =
    user?.role === "admin"
      ? adminDropdown()
      : user?.role === "serviceProvider"
      ? serviceProviderDropdown()
      : customerDropdown();

  return (
    <header className="fixed-nav-bar w-nav shadow-sm z-50 fixed w-full bg-[#fffffff9]">
      <nav className="max-w-screen-2xl mx-auto flex px-4 justify-between items-center">
        {/* nav links */}
        <ul className="nav__links">
          <li>
            <NavLink to="/" onClick={handleCloseMenu} className={({ isActive }) => (isActive ? "text-primary transition-all duration-300" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={handleCloseMenu} className={({ isActive }) => (isActive ? "text-primary transition-all duration-300" : "")}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={handleCloseMenu} className={({ isActive }) => (isActive ? "text-primary transition-all duration-300" : "")}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">Waseet <span>.</span></Link>
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
            <span onClick={handleDropdownToggle} className="cursor-pointer hover:text-primary">
              {user ? (
                <>
                  <img src={user?.profileImage || avatarImg} alt="profile" className="size-6 rounded-full cursor-pointer" />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 p-4 w-48 border border-gray-200 bg-white rounded-lg shadow-lg z-50">
                      <ul className="font-medium space-y-4 p-2">
                        {dropDownMenus.map((menu, index) => (
                          <li key={index}>
                            <Link onClick={() => setIsDropdownOpen(false)} className="dropdown-items" to={menu.path}>
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link onClick={handleLogout} className="dropdown-items">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <i className="ri-user-line bg-primary-light py-1 px-6 rounded-full hover:bg-gray-100"></i>
                </Link>
              )}
            </span>
          </span>
        </div>

        {/* menu button */}
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden ml-7 text-xl">
          <button onClick={handleToggle} className={`focus:outline-none text-primary ${isOpen ? "ri-close-line" : "ri-menu-line"}`}></button>
        </div>
      </nav>

      {isCartOpen && <Cart products={products} isOpen={isCartOpen} onClose={handleToggleCart} />}

      {/* mobile menu */}
      {isOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col p-4 space-y-3 w-full bg-primary-light">
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link to="/" onClick={handleCloseMenu}>Home</Link>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link to="/shop" onClick={handleCloseMenu}>Shop</Link>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <Link to="/contact" onClick={handleCloseMenu}>Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
