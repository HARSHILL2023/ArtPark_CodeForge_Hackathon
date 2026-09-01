import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: 'Live Demo', href: '#demo' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'py-3 bg-[#0B0D10]/90 dark:bg-[#0B0D10]/90 backdrop-blur-md border-b border-[#252A31] shadow-sm'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white font-bold text-base tracking-tight"
          aria-label="CodeForge Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] flex items-center justify-center text-white shadow-xs">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#F5F7FA]">
              CodeForge
            </span>
            <span className="block text-[9px] uppercase tracking-wider font-semibold text-[#A7AFBA] -mt-0.5">
              Career Intelligence OS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Desktop Navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 text-xs font-medium text-[#A7AFBA]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-white transition-colors duration-150 py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleDark}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg border border-[#252A31] bg-[#111418] text-[#A7AFBA] hover:text-white hover:border-[#323842] transition-colors"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Moon className="w-3.5 h-3.5 text-[#6366F1]" />}
          </button>

          <Link
            to="/dashboard?auth=open"
            className="hidden sm:inline-flex px-3.5 py-1.5 border border-[#252A31] hover:border-[#323842] rounded-lg text-xs font-semibold text-[#F5F7FA] bg-[#111418] hover:bg-[#171A1F] transition-colors"
          >
            Sign In
          </Link>

          <Link
            to="/upload"
            className="px-3.5 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] rounded-lg text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 rounded-lg border border-[#252A31] bg-[#111418] text-[#F5F7FA] hover:bg-[#171A1F] transition-colors"
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
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0B0D10] border-b border-[#252A31] px-6 py-6 overflow-hidden"
          >
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-[#F5F7FA] hover:text-[#6366F1] py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-[#252A31] flex flex-col gap-2.5">
              <Link
                to="/dashboard?auth=open"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-[#252A31] rounded-lg text-xs font-semibold text-[#F5F7FA] bg-[#111418]"
              >
                Sign In
              </Link>
              <Link
                to="/upload"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#6366F1] rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              >
                <span>Launch App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
