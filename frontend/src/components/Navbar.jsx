import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed-nav-bar w-nav shadow-sm z-50">
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
            <button className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                0
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
        <div className="block md:hidden ml-7 text-xl">
          <button
            onClick={handleToggle}
            className={`focus:outline-none  text-primary ${
              isOpen ? "ri-close-line" : "ri-menu-line"
            }`}
          >
           
          </button>
        </div>
      </nav>

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
