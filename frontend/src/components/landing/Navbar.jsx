import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#0d0f1c]/70 backdrop-blur-3xl border-b border-white/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white font-black text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span>🧠 CodeForge</span>
          <span className="text-[10px] uppercase font-sans font-medium opacity-70 tracking-widest hidden sm:block mt-1">AI Onboarding Engine</span>
        </Link>
        
        <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
          <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
          <li><a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a></li>
          <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={toggleDark} className="p-2 border border-white/10 rounded-full text-white hover:bg-white/5 transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <Link to="/auth" className="hidden sm:block px-4 py-2 border border-white/20 rounded-xl text-sm font-bold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all">
            Sign In
          </Link>
          <Link to="/upload" className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all flex items-center gap-2">
            ✦ Launch App &rarr;
          </Link>
          
          <button className="md:hidden text-white ml-2 text-2xl">☰</button>
        </div>
      </div>
    </nav>
  );
}
