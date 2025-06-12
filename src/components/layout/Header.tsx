import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, ChevronDown } from 'lucide-react';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Semesters', path: '/semesters' },
    { title: 'Faculty', path: '/faculty' },
    { title: 'Announcements', path: '/announcements' },
    { title: 'Resources', path: '/resources' },
    { title: 'Feedback', path: '/feedback' },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-primary">
                UBIT Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary">
              <Bell size={20} />
            </button>
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                <User size={20} className="mr-1" />
                <span className="hidden md:inline">Account</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
