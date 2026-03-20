import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-32 relative text-center overflow-hidden">
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 bg-indigo-500/20 blur-[150px] rounded-full -z-10 w-[800px] h-[800px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></motion.div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Ready to Close Your Skill Gap?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join job seekers, students, and teams already using the AI-Adaptive Onboarding Engine to bridge the gap between where they are and where they want to be.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/upload" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-bold transition-all pulse-glow-btn flex items-center justify-center gap-2 group">
            🚀 Start Free Analysis &rarr;
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/50 rounded-xl text-white font-bold transition-all flex items-center justify-center">
            View Live Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
