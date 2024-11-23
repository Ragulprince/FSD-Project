import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Logo component
const Logo = () => (
  <Link to="/" className="flex items-center">
  <svg
    className="w-10 h-10 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
  </Link>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-gray-800">OrderMaster</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="text-gray-600 hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#cta" className="text-gray-600 hover:text-blue-600">
                  Get Started
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white shadow-md">
            <ul className="space-y-2 py-2 px-4">
              <li>
                <a href="#features" className="block text-gray-600 hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="block text-gray-600 hover:text-blue-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#cta" className="block text-gray-600 hover:text-blue-600">
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
