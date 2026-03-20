import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  const floatVariants = (duration, delay = 0) => ({
    animate: {
      y: [0, -18, 0],
      rotate: [-1, 1, -1],
      transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' }
    }
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background blobs */}
      <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.05, 0.97, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/15 blur-[80px] rounded-full -z-10" />
      <motion.div animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.05, 0.97, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-violet-600/15 blur-[80px] rounded-full -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-20"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8">
          ⚡ CodeForge Hackathon &middot; Next-Gen AI Engine
        </motion.div>

        {/* Floating Chips */}
        <motion.div variants={floatVariants(5)} animate="animate" className="hidden lg:block absolute top-[20%] left-[10%] px-4 py-2 rounded-full border border-indigo-500/50 bg-slate-900/60 backdrop-blur-md text-xs font-bold shadow-lg whitespace-nowrap">
          ✦ Skill Match: 94%
        </motion.div>
        <motion.div variants={floatVariants(4, 1)} animate="animate" className="hidden lg:block absolute top-[30%] right-[10%] px-4 py-2 rounded-full border border-emerald-500/50 bg-slate-900/60 backdrop-blur-md text-xs font-bold shadow-lg whitespace-nowrap">
          🧬 DNA Analyzed
        </motion.div>
        <motion.div variants={floatVariants(6, 0.5)} animate="animate" className="hidden lg:block absolute bottom-[25%] left-[15%] px-4 py-2 rounded-full border border-amber-500/50 bg-slate-900/60 backdrop-blur-md text-xs font-bold shadow-lg whitespace-nowrap">
          🚀 Roadmap Ready
        </motion.div>
        <motion.div variants={floatVariants(4.5, 2)} animate="animate" className="hidden lg:block absolute bottom-[35%] right-[12%] px-4 py-2 rounded-full border border-rose-500/50 bg-slate-900/60 backdrop-blur-md text-xs font-bold shadow-lg whitespace-nowrap">
          ⚡ AI Active &middot; Gemini
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Intelligent Onboarding.<br />
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Accelerated Careers.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload your resume and job description to get a personalized skill gap analysis, AI-generated learning roadmap, and technical interview simulation &mdash; powered by Gemini, GPT, and Groq.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/upload" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-bold transition-all pulse-glow-btn flex items-center justify-center gap-2 group">
            🚀 Start Free Analysis &rarr;
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/50 rounded-xl text-white font-bold transition-all flex items-center justify-center">
            View Live Demo
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { v: 'Multi-AI', l: 'Gemini · GPT · Groq', d: 3 },
            { v: '5 min', l: 'Full Gap Report', d: 4 },
            { v: 'Instant', l: 'Roadmap + Interview', d: 3.5 },
            { v: '100%', l: 'Free to Try', d: 4.2 }
          ].map((stat, i) => (
            <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: stat.d, repeat: Infinity, ease: 'easeInOut' }} className="px-6 py-4 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 flex-1 min-w-[150px]">
              <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.v}</div>
              <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
