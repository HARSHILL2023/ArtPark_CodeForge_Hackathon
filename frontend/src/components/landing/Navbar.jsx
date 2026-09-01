import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sun, Moon, Menu, X, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function Navbar({ darkMode, toggleDark, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pipeline', href: '#how-it-works' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'py-3 bg-[#FCFBF8]/95 dark:bg-[#0C0D0F]/95 backdrop-blur-md border-b border-[#DCD9D1] dark:border-[#292D33] shadow-xs'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#1B1B19] dark:text-[#F2F0EA] font-bold text-base tracking-tight"
          aria-label="CodeForge Home"
        >
          <div className="w-7 h-7 rounded-md bg-[#2563EB] dark:bg-[#3B82F6] flex items-center justify-center text-white shadow-xs">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA]">
              CodeForge
            </span>
            <span className="block text-[9px] uppercase tracking-wider font-semibold text-[#85827A] dark:text-[#7E7C77] -mt-0.5">
              Career Intelligence OS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Desktop Navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-xs font-medium text-[#5E5C56] dark:text-[#B4B1A9]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-[#1B1B19] dark:hover:text-[#F2F0EA] transition-colors duration-150 py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Single Auth Action & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleDark}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 rounded-lg border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] hover:text-[#1B1B19] dark:hover:text-white transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-[#60A5FA]" /> : <Moon className="w-3.5 h-3.5 text-[#2563EB]" />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="cf-btn-primary"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                title="Sign Out"
                aria-label="Sign Out"
                className="p-1.5 rounded-lg border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] hover:text-[#D96565] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="cf-btn-primary"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-1.5 rounded-lg border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#1B1B19] dark:text-[#F2F0EA] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-[#FCFBF8] dark:bg-[#0C0D0F] border-b border-[#DCD9D1] dark:border-[#292D33] px-6 py-5 overflow-hidden"
          >
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA] hover:text-[#2563EB] dark:hover:text-[#3B82F6] py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-[#DCD9D1] dark:border-[#292D33]">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cf-btn-primary w-full justify-center"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Go to Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="cf-btn-secondary w-full justify-center text-[#D96565]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                  className="cf-btn-primary w-full justify-center"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
