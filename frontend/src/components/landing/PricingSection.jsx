import React from 'react';
import { motion } from 'framer-motion';

export default function PricingSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="pricing">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> Pricing
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Simple, Transparent Access
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <motion.div variants={item} whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-10 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 flex flex-col group">
          <h3 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Free</h3>
          <div className="text-5xl font-black mb-8 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>$0</div>
          <ul className="space-y-4 mb-10 flex-grow">
            {['Full Skill Gap Analysis (1 resume)', 'Career Simulator (1 role)', 'Basic Roadmap', 'Job Readiness Score'].map((p, i) => (
              <li key={i} className="text-slate-400 text-sm pb-4 border-b border-white/10 last:border-0">{p}</li>
            ))}
          </ul>
          <button className="w-full py-3 px-6 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
            Get Started Free
          </button>
        </motion.div>

        <motion.div variants={item} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-violet-500/50 flex flex-col relative transform lg:scale-105 shadow-[0_0_40px_rgba(139,92,246,0.15)] group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-3xl"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
            MOST POPULAR
          </div>
          <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent" style={{ fontFamily: "'Syne', sans-serif" }}>Pro</h3>
          <div className="text-5xl font-black mb-8 text-white flex items-end" style={{ fontFamily: "'Syne', sans-serif" }}>
            $12 <span className="text-base font-medium text-slate-400 mb-2">/month</span>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {['Unlimited Resume Analysis', 'All Career Simulator Roles', 'Full AI Roadmap (React Flow graph)', 'Engineering Simulation Studio (unlimited sessions)', 'PDF Resume Export', 'Priority AI (Gemini + GPT)'].map((p, i) => (
              <li key={i} className="text-slate-300 text-sm pb-4 border-b border-white/10 last:border-0">{p}</li>
            ))}
          </ul>
          <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all pulse-glow-btn">
            Start Pro Trial
          </button>
        </motion.div>

        <motion.div variants={item} whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-10 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 flex flex-col group">
          <h3 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Enterprise</h3>
          <div className="text-5xl font-black mb-8 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Custom</div>
          <ul className="space-y-4 mb-10 flex-grow">
            {['Everything in Pro', 'Team/cohort management', 'Bulk resume analysis', 'Custom role definitions', 'Analytics dashboard', 'API access', 'Dedicated support'].map((p, i) => (
              <li key={i} className="text-slate-400 text-sm pb-4 border-b border-white/10 last:border-0">{p}</li>
            ))}
          </ul>
          <button className="w-full py-3 px-6 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
            Contact Us
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
