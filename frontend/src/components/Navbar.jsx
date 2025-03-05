import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Cart from "../pages/shop/Cart";

import avatarImg from "../assets/avatar.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  const disptach = useDispatch();
  const {user} = useSelector((state) => state.auth);
  console.log(user)




  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  //! dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handelDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //! admin dropdown
  const adminDropdown = () => [
    { lable: "Dashboard", path: "/dashboard/admin" },
    { lable: "Manage Items", path: "/dashboard/manage-products" },
    { lable: "All Orders", path: "/dashboard/manage-orders" },
    { lable: "Add New", path: "/dashboard/add-new" },
  ];
  //! user dropdown
  const userDropdown = () => [
    { lable: "Dashboard", path: "/dashboard" },
    { lable: "Profile", path: "/dashboard/profile" },
    { lable: "Payments", path: "/dashboard/payments" },
    { lable: "Orders", path: "/dashboard/orders" },
  ];
  //! user role (Future work)
  //* const dropDownMenus = user?.role ==='admin'? [...adminDropdown] : [...userDropdown]

  //! Logout (Future work)
   const handelLogout = async () => {}

  return (
    <header className="fixed-nav-bar w-nav shadow-sm z-50 fixed w-full  bg-[#fffffff9]">
      <nav className="max-w-screen-2xl mx-auto flex px-4 justify-between items-center">
        {/* nav links */}
        <ul className="nav__links">
          <li>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary transition-all duration-300" : ""
                }
              >
                Home
              </NavLink>
            </span>
          </li>
          <li>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "text-primary transition-all duration-300" : ""
                }
              >
                Shop
              </NavLink>
            </span>
          </li>
          <li>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-primary transition-all duration-300" : ""
                }
              >
                Contact
              </NavLink>
            </span>
          </li>
        </ul>

        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            Waseet <span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleToggleCart} className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {
              user && user ? (<>
              <img src={user?.profileImage || avatarImg} alt="profileImage" className="size-6 rounded-full cursor-pointer"/>
              </>) : (<Link to="/login">
                <i className="ri-user-line"></i>
              </Link>)
            }
            
          </span>
          <span
            onClick={handelDropdownToggle}
            className="cursor-pointer hover:text-primary"
          >
            <i className="ri-expand-up-down-fill"></i>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 p-4 w-48 border border-gray-200  bg-white rounded-lg shadow-lg z-50">
                <ul className="font-medium space-y-4 p-2">
                  {userDropdown().map((menu, index) => (
                    <li key={index}>
                      <Link
                        onClick={() => setIsDropdownOpen(false)}
                        className="dropdown-items"
                        to={menu.path}
                      >
                        {menu.lable}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link onClick={handelLogout} className="dropdown-items">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>

        {/* menu button */}
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden ml-7 text-xl">
          <button
            onClick={handleToggle}
            className={`focus:outline-none  text-primary ${
              isOpen ? "ri-close-line" : "ri-menu-line"
            }`}
          ></button>
        </div>
      </nav>

      {isCartOpen && (
        <Cart
          products={products}
          isOpen={isCartOpen}
          onClose={handleToggleCart}
        />
      )}
      {/* mobile menu */}
      {isOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col p-4 space-y-3 w-full bg-primary-light">
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu();
                }}
              >
                <Link to="/">Home</Link>
              </span>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu();
                }}
              >
                <Link to="/shop">Shop</Link>
              </span>
            </li>
            <li className="link w-full p-2 mx-auto rounded-md cursor-pointer hover:translate-x-1 transition-all duration-75">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu();
                }}
              >
                <Link to="/contact">Contact</Link>
              </span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
