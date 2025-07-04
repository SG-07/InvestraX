import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-scroll";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Signup", to: "signup" },
    { name: "About", to: "about" },
    { name: "Products", to: "products" },
    { name: "Pricing", to: "pricings" },
    { name: "Contact", to: "contact", isPrimary: true },
  ];

  return (
    <div>
      <nav className="shadow-sm top-0 fixed w-full z-50 bg-white">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center justify-between w-full px-6 md:px-20">
              {/* Logo + Brand Name */}
              <div className="flex items-center gap-3">
                <img
                  src="/media/images/InvestraX_logo.svg"
                  alt="InvestraX Logo"
                  className="h-15 w-auto object-contain hover:opacity-80 transition duration-300"
                />
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  className="text-2xl font-bold cursor-pointer text-blue-900"
                >
                  InvestraX
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                      item.isPrimary
                        ? "bg-blue-600 text-white hover:bg-black"
                        : "text-black hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <Bars3Icon className="h-6 w-6" />

                  ) : (
                    <XMarkIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div ref={ref} className="md:hidden" id="mobile-menu">
              <div className="bg-white px-4 pt-4 pb-4 space-y-2 sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className={`block cursor-pointer px-3 py-2 rounded-md text-base font-medium ${
                      item.isPrimary
                        ? "bg-blue-600 text-white hover:bg-black"
                        : "text-black hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
