import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding] duration-500 border-b border-editorial ${
          scrolled ? "bg-white/98 dark:bg-[#050505]/98 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
             <span className="font-serif font-bold text-2xl tracking-tighter text-black dark:text-white group-hover:text-accent transition-colors duration-300">OCV.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <span
                      className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                        isActive(item.path)
                          ? "text-accent"
                          : "text-gray-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-500 hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1.5 focus:outline-none z-50 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white dark:bg-[#050505] z-40 flex flex-col justify-center items-center transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col space-y-8 items-center text-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <span
                  className={`text-4xl font-serif transition-colors duration-300 ${
                    isActive(item.path)
                      ? "text-accent"
                      : "text-black dark:text-white hover:text-accent"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
          
          <li className="pt-8">
            <button
              onClick={toggleTheme}
              className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              <span className="text-sm uppercase tracking-widest">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
