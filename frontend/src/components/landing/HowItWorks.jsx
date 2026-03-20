import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="how-it-works">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> How It Works
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          From Resume to Roadmap in Under 5 Minutes
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative flex flex-col lg:flex-row gap-8 mb-16 z-10">
        <div className="hidden lg:block absolute top-7 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-violet-500 opacity-30 -z-10"></div>
        {[
          { n: '01', t: 'Upload Resume', d: 'Drag and drop your PDF, TXT, or DOC. The backend parser (pdf-parse) extracts every skill instantly.' },
          { n: '02', t: 'Select Target Role', d: 'Choose from presets (Frontend Dev, Backend Dev, DevOps) or type any custom role.' },
          { n: '03', t: 'AI Gap Analysis', d: 'Multi-provider AI (Gemini → GPT → Groq fallback) analyzes your profile against the role requirements in real-time.' },
          { n: '04', t: 'Get Your Full Plan', d: 'Receive: Skill DNA Profile, AI Learning Roadmap (React Flow graph), Career Readiness Score, and Interview Simulation access.' }
        ].map((step, i) => (
          <motion.div key={i} variants={item} className="flex-1">
            <div className="w-14 h-14 rounded-full bg-[#07080f] border-2 border-indigo-500 flex items-center justify-center font-black text-xl mb-4 shadow-[0_0_15px_rgba(99,102,241,0.3)] shadow-indigo-500/30" style={{ fontFamily: "'Syne', sans-serif" }}>
              {step.n}
            </div>
            <h3 className="text-2xl font-black mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{step.t}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{step.d}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="p-8 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        {[['Resume Upload', 'indigo'], ['PDF Parse Extract', 'emerald'], ['AI Analysis Engine', 'amber'], ['Roadmap Dashboard', 'violet']].map((node, i, arr) => (
          <React.Fragment key={i}>
            <div className={`px-4 py-2 rounded-full border border-${node[1]}-500/30 bg-${node[1]}-500/10 text-${node[1]}-400 font-bold text-xs uppercase tracking-widest whitespace-nowrap`}>
              {node[0]}
            </div>
            {i < arr.length - 1 && <div className="text-slate-600">&rarr;</div>}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
