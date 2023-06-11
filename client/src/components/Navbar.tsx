"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyboardArrowDown, ShoppingCart, AccountCircle, Search } from '@mui/icons-material';

const categories = [
  { name: 'Category 1', image: '/banner3.webp' },
  { name: 'Category 2', image: '/banner3.webp' },
  { name: 'Category 3', image: '/banner3.webp' },
  { name: 'Category 4', image: '/banner3.webp' },
];

const Navbar: React.FC = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleOrders = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo and Name */}
          <div className="flex-shrink-0 flex items-center">
            <img className="block h-8 w-auto" src="shopwise.png" alt="Company Logo" />
            <span className="ml-2 text-dark-green font-bold text-lg">ShopWise</span>
          </div>

          {/* Main Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-dark-green hover:text-gray-900 focus:outline-none focus:text-gray-900"
                onClick={toggleCategory}
              >
                <span className="hidden sm:inline">Categories</span>
                <KeyboardArrowDown fontSize="large" />
              </button>
              {/* Category Dropdown Content */}
              {isCategoryOpen && (
                <motion.div
                  className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {categories.map((category, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <img
                          className="inline-block h-6 w-6 rounded-full mr-2"
                          src={category.image}
                          alt={category.name}
                        />
                        {category.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="py-1 pl-10 pr-4 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-dark-green sm:text-sm border-gray-300"
                placeholder="Search"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-dark-green" />
              </div>
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-dark-green hover:text-gray-900 focus:outline-none focus:text-gray-900"
                onClick={toggleOrders}
              >
                <span className="hidden sm:inline">Account</span>
                <AccountCircle fontSize="large" />
              </button>
              {/* Account Dropdown Content */}
              {isOrdersOpen && (
                <motion.div
                  className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsOrdersOpen(false)}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Account Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Account Item 2
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              type="button"
              className="flex items-center text-dark-green hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <span className="hidden sm:inline">Cart</span>
              <ShoppingCart fontSize="large" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-green hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-green focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Category Accordion */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-dark-green hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleCategory}
              >
                <span>Categories</span>
                <KeyboardArrowDown fontSize="large" />
              </button>
              {/* Category Accordion Content */}
              {isCategoryOpen && (
                <motion.div
                  className="pl-4 py-1"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <img
                        className="inline-block h-6 w-6 rounded-full mr-2"
                        src={category.image}
                        alt={category.name}
                      />
                      {category.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="block w-full py-2 pl-8 pr-4 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-dark-green sm:text-sm border-gray-300"
                placeholder="Search"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-dark-green" />
              </div>
            </div>

            {/* Account Accordion */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-dark-green hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleOrders}
              >
                <span>Account</span>
                <KeyboardArrowDown fontSize="large" />
              </button>
              {/* Account Accordion Content */}
              {isOrdersOpen && (
                <motion.div
                  className="pl-4 py-1"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsOrdersOpen(false)}
                >
                  <a
                    href="#"
                    className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Account Item 1
                  </a>
                  <a
                    href="#"
                    className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Account Item 2
                  </a>
                </motion.div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-dark-green hover:bg-gray-100 hover:text-gray-900"
            >
              <span>Cart</span>
              <ShoppingCart fontSize="large" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
