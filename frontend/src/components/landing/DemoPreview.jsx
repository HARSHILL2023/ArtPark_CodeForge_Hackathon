import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DemoPreview() {
  const [activeTab, setActiveTab] = useState('Skill DNA Profile');
  const tabs = ['Skill DNA Profile', 'Job Readiness Dashboard', 'Simulation Studio'];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative" id="demo">
      <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> See It In Action
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          A Glimpse of Your Career Intelligence Dashboard
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full border transition-all text-sm font-bold ${
              activeTab === tab 
                ? 'bg-white/10 text-white border-white/20' 
                : 'bg-transparent text-slate-400 border-white/5 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-[#0f111a] rounded-[24px] border border-white/10 overflow-hidden shadow-2xl relative min-h-[400px] flex items-center justify-center">
        <div className="absolute top-0 w-full h-10 bg-[#0d0f1c] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>

        <div className="p-8 w-full">
          {activeTab === 'Skill DNA Profile' && (
            <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mt-10">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                 <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Skill Distribution</h3>
                 <div className="space-y-4">
                   <div><div className="flex justify-between text-xs mb-1 font-bold text-slate-400"><span>FRONTEND (React, CSS)</span> <span className="text-emerald-400">MASTERED</span></div><div className="w-full bg-white/10 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full w-[80%]"></div></div></div>
                   <div><div className="flex justify-between text-xs mb-1 font-bold text-slate-400"><span>BACKEND (Node)</span> <span className="text-amber-400">EMERGING</span></div><div className="w-full bg-white/10 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full w-[40%]"></div></div></div>
                 </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2 text-indigo-100" style={{ fontFamily: "'Syne', sans-serif" }}>Target Role</h3>
                <div className="text-3xl font-black text-white mb-4">Senior Frontend Developer</div>
                <div className="inline-flex gap-2"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">25% READY</span></div>
              </div>
            </div>
          )}
          
          {activeTab === 'Job Readiness Dashboard' && (
            <div className="text-center mt-10">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Senior Frontend Engineer &mdash; TechCorp Inc.</div>
              <div className="w-32 h-32 rounded-full border-8 border-emerald-500/80 mx-auto flex flex-col items-center justify-center mb-6">
                <div className="text-3xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>67%</div>
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Match Rate</div>
              </div>
              <p className="text-slate-400 max-w-lg mx-auto">ETA to readiness: 9 Weeks. Missing Key Tech: TypeScript Advanced, Webpack, Testing Library.</p>
            </div>
          )}

          {activeTab === 'Simulation Studio' && (
            <div className="text-center mt-10 max-w-2xl mx-auto">
              <div className="inline-flex gap-2 mb-6 text-xs font-bold uppercase tracking-widest text-violet-400 border border-violet-500/30 bg-violet-500/10 px-3 py-1 rounded">STUDIO MATRIX 3.5 &middot; PRODUCTION GRADE</div>
              <h3 className="text-4xl font-black mb-6 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Engineering Simulation</h3>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-[#1a1a2e] text-white rounded-xl text-sm font-bold shadow-lg">Launch Q&A Matrix</button>
                <button className="px-6 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-bold shadow-lg">Start Session</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
