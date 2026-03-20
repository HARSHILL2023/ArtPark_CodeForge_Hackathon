import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="problem">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> The Problem
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Traditional Onboarding Leaves Talent Behind
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
          The global skill mismatch is costing careers and companies &mdash; and static job descriptions don't fix it.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { v: '70%', d: 'of new hires feel undertrained within their first 90 days' },
          { v: '3×', d: 'longer time-to-productivity when skill gaps aren\'t identified early' },
          { v: '$240B', d: 'lost annually from skill mismatches and early employee attrition' }
        ].map((stat, i) => (
          <motion.div key={i} variants={item} whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-br from-rose-400 to-amber-500 bg-clip-text text-transparent" style={{ fontFamily: "'Syne', sans-serif" }}>
              {stat.v}
            </div>
            <p className="text-slate-400 font-medium">
              {stat.d}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
