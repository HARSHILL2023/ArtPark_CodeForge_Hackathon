import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#07080f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-xl font-black text-white flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          🧠 CodeForge <span className="text-xs text-slate-500 font-sans tracking-widest font-bold uppercase">&middot; AI Onboarding Engine</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-500">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
        
        <div className="text-xs text-slate-600 font-bold">
          Built with ⚡ React + AI &middot; &copy; 2026 CodeForge
        </div>
      </div>
    </footer>
  );
}
