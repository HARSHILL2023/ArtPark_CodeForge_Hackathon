import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#0C0D0F]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
        <div className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#B88916] dark:bg-[#D4A72C] flex items-center justify-center text-white dark:text-[#0C0D0F] font-bold text-[10px]">
            CF
          </div>
          <span>CodeForge</span>
          <span className="text-[10px] text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider font-mono">:: v2.4.0</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-[11px] font-semibold">
          <a href="#features" className="hover:text-[#1B1B19] dark:hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#1B1B19] dark:hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#1B1B19] dark:hover:text-white transition-colors">Pricing</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1B19] dark:hover:text-white transition-colors">GitHub</a>
        </div>
        
        <div className="text-[10px] text-[#85827A] dark:text-[#7E7C77] font-mono">
          &copy; {new Date().getFullYear()} CodeForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
