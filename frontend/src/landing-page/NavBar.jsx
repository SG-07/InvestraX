import React, { useState } from "react";
import { Link } from "react-scroll";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

const navItems = [
  { name: "Home", to: "home" },
  { name: "Signup", to: "signup" },
  { name: "About", to: "about" },
  { name: "Products", to: "products" },
  { name: "Pricing", to: "pricings" },
  { name: "Contact", to: "contact", isPrimary: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/media/images/InvestraX_logo.svg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-2xl font-bold text-blue-900 cursor-pointer"
            >
              InvestraX
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                offset={-70}
                duration={500}
                className={`text-sm font-medium transition ${
                  item.isPrimary
                    ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-black"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-blue-600 text-white rounded-md"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden bg-white px-4 pt-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium px-3 py-2 rounded ${
                item.isPrimary
                  ? "bg-blue-600 text-white hover:bg-black"
                  : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Transition>
    </nav>
  );
}
