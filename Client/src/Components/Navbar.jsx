import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Heart, Search } from "lucide-react";
import User from "../assets/User.svg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  const handleProfile = () => {
    if (setShowProfile) setShowProfile(true);
    setIsOpen(false);
  };

  const handleBooking = () => {
    console.log("Navigate to booking");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Mobile searching for:", mobileSearchQuery);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (showMobileSearch) {
      setMobileSearchQuery("");
    }
  };

  const NavLinkComponent = ({ to, children, onClick }) => (
    <a
      href={to}
      onClick={onClick}
      className="hover:text-orange-500 transition-colors"
    >
      {children}
    </a>
  );

  return (
    <div className="bg-white shadow-xl py-0 px-6 rounded-full flex justify-between items-center mx-auto max-w-7xl mt-4 relative overflow-hidden">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Mumvets Logo" className="h-15 w-auto" />
      </div>

      {/* Desktop Navigation Links - Hidden when search is active */}
      <AnimatePresence>
        {!showSearch && (
          <motion.ul
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex space-x-6 text-gray-800 font-medium mx-auto"
          >
            <NavLinkComponent to="/">Home</NavLinkComponent>
            <NavLinkComponent to="/about">About Us</NavLinkComponent>
            <NavLinkComponent to="/products">Products</NavLinkComponent>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Search Bar - Animated */}
      <AnimatePresence>
        {showSearch && (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center mx-auto overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 border-2 border-orange-500 rounded-full focus:outline-none w-96"
              autoFocus
            />
          </motion.form>
        )}
      </AnimatePresence>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleSearch}
          className="bg-orange-500 text-white p-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors"
        >
          {showSearch ? <X size={20} /> : <Search size={20} />}
        </button>

        {isAuthenticated ? (
          <>
            <button
              className="text-orange-500 p-2 rounded-full font-medium shadow-md hover:bg-orange-100 transition-colors"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={20} />
            </button>
            <button
              className="text-orange-500 p-2 rounded-full font-medium shadow-md hover:bg-orange-100 transition-colors"
              onClick={() => navigate("/favourites")}
            >
              <Heart size={20} />
            </button>
            <button onClick={handleProfile} className="cursor-pointer mr-4">
              <img src={User} alt="" className="w-9" />
            </button>
          </>
        ) : (
          <button
            className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-orange-600"
            onClick={() => navigate("/login")}
          >
            Login/Signup
          </button>
        )}
      </div>

      {/* Mobile Actions */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleMobileSearch}
          className="bg-orange-500 text-white p-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors"
        >
          {showMobileSearch ? <X size={20} /> : <Search size={20} />}
        </button>
        <button onClick={() => setIsOpen(true)} className="text-orange-500">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Search Bar - Animated (appears in navbar center) */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.form
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleMobileSearchSubmit}
            className="md:hidden absolute left-1/2 transform -translate-x-1/2 overflow-hidden"
          >
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border-2 border-orange-500 rounded-full focus:outline-none w-48 sm:w-64"
              autoFocus
            />
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? "0%" : "-100%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 p-4 rounded-b-2xl"
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-800">
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-center space-y-4 p-4 text-gray-800 font-medium">
          {isAuthenticated ? (
            <button onClick={handleProfile} className="hover:text-orange-500">
              Profile
            </button>
          ) : (
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500"
            >
              Log In
            </a>
          )}
          <NavLinkComponent to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLinkComponent>
          <NavLinkComponent to="/about" onClick={() => setIsOpen(false)}>
            About Us
          </NavLinkComponent>
          <NavLinkComponent to="/services" onClick={() => setIsOpen(false)}>
            Products
          </NavLinkComponent>
          <button
            onClick={handleBooking}
            className="text-left hover:text-orange-500"
          >
            Cart
          </button>
          <NavLinkComponent to="/contact-us" onClick={() => setIsOpen(false)}>
            Wishlist
          </NavLinkComponent>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-red-600 w-full"
            >
              Logout
            </button>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;
