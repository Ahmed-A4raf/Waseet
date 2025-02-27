import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../pages/shop/Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed-nav-bar w-nav shadow-sm z-50 fixed w-full  bg-[#fffffff9]">
      
      <nav className="max-w-screen-2xl mx-auto flex px-4 justify-between items-center">
        {/* nav links */}
        <ul className="nav__links">
          <li className="link">
            <span  className={`text-white ${activeSection === "home" ? "text-primary" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <Link to="/">Home</Link>
            </span>
          </li>
          <li className="link">
            <span  className={`text-white ${activeSection === "home" ? "text-primary" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <Link to="/shop">Shop</Link>
            </span>
          </li>
          <li className="link">
            <span  className={`text-white ${activeSection === "home" ? "text-primary" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleCloseMenu();
              }}
            >
              <Link to="/contact">Contact</Link>
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
            <button
            onClick={handleToggleCart}
            className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              <i className="ri-user-line"></i>
            </Link>
          </span>
        </div>

        {/* menu button */} 
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden ml-7 text-xl">
          <button
            onClick={handleToggle}
            className={`focus:outline-none  text-primary ${
              isOpen ? "ri-close-line" : "ri-menu-line"
            }`}
          >
           
          </button>
        </div>
      </nav>
      
      {
        isCartOpen && <Cart products={products} isOpen={isCartOpen} onClose={handleToggleCart} />
      }
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