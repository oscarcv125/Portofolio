import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-6">
          <div
            className={`glass-strong rounded-full px-8 py-4 transition-all duration-300 ${
              scrolled ? "glow-effect" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 flex items-center justify-center font-mono font-bold text-white text-xs"
                >
                  OCV
                </motion.div>
                <span className="font-mono font-bold text-xl gradient-text hidden sm:block">
                  Portfolio
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-2">
                <ul className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 text-white"
                              : "dark:text-gray-200 text-gray-800 dark:hover:text-white hover:text-gray-900 hover:bg-white/10"
                          }`}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center dark:text-gray-200 text-gray-700 dark:hover:text-white hover:text-gray-900 transition-colors"
                  aria-label="Toggle theme"
                >
                  <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                </motion.button>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 dark:bg-white bg-gray-700 rounded-full transition-all group-hover:bg-emerald-400"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 dark:bg-white bg-gray-700 rounded-full transition-all group-hover:bg-lime-400"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 dark:bg-white bg-gray-700 rounded-full transition-all group-hover:bg-amber-400"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 glass-strong z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-8 pt-24">
                <ul className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={item.path}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-lg font-mono text-lg transition-all duration-300 ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 text-white"
                              : "dark:text-gray-200 text-gray-800 dark:hover:text-white hover:text-gray-900 hover:bg-white/10"
                          }`}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Menu Footer */}
                <div className="mt-auto space-y-4">
                  {/* Theme Toggle for Mobile */}
                  <motion.button
                    onClick={toggleTheme}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-lg glass flex items-center justify-center gap-3 font-mono dark:text-gray-200 text-gray-700"
                  >
                    <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </motion.button>

                  <div className="h-px bg-gradient-to-r from-transparent dark:via-white/20 via-gray-400 to-transparent" />
                  <p className="text-center text-sm dark:text-gray-400 text-gray-600 font-mono">
                    Made with
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block mx-1 text-amber-400"
                    >
                      ♥
                    </motion.span>
                    by OCV
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
