import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, ChevronDown, Bell, BookOpen, Rocket, Award } from 'lucide-react';

import logo from "../../assets/logo/logo.png"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchInputRef = useRef(null);

  const navItems = [
    { 
      label: "Home", 
      href: "/",
      isActive: true 
    },
    {
      label: "Courses",
      href: "/courses",
      hasDropdown: true,
      dropdownItems: [
        { label: "Web Development", icon: <BookOpen className="w-4 h-4" />, description: "Full-stack web development courses" },
        { label: "Data Science", icon: <Award className="w-4 h-4" />, description: "Data analysis and machine learning" },
        { label: "Design", icon: <Rocket className="w-4 h-4" />, description: "UI/UX and graphic design" }
      ]
    },
    { label: "Workshops", href: "/workshops" },
    { label: "Internship", href: "/internship" },
    { label: "About Us", href: "/AboutUs" },
    { label: "Contact Us", href: "/contactus" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg shadow-black/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center space-x-2 group"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-200" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              SKILLONX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 group hover:bg-gray-100 ${
                    item.isActive ? 'text-blue-600' : isScrolled ? "text-black":"text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 w-64 mt-2 p-2 bg-white rounded-xl shadow-xl border border-gray-100 transform transition-all duration-200">
                    {item.dropdownItems.map((dropItem, idx) => (
                      <Link
                        key={idx}
                        to="#"
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="text-blue-600">{dropItem.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">{dropItem.label}</div>
                          <div className="text-sm text-gray-500">{dropItem.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link
              to="/sign-in"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity duration-200"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Sign in</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-100">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses, workshops, and more..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/api/placeholder/40/40" alt="Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  SKILLONX
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="px-4 py-3 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 border-t">
              <Link
                to="/sign-in"
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
