import React from 'react';
import { motion } from 'framer-motion';

export default function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stack = [
    {
      title: 'Frontend',
      color: 'indigo',
      chips: ['⚛️ React 19', '⚡ Vite', '🎨 Tailwind CSS v4', '🎞 Framer Motion', '🔗 React Flow', '🔣 Lucide React', '📄 @react-pdf/renderer']
    },
    {
      title: 'Backend',
      color: 'emerald',
      chips: ['🟢 Node.js', '🚂 Express', '🍃 MongoDB + Mongoose', '🔑 Passport.js', '🛡️ JWT Auth', '🔐 Google OAuth2', '📄 pdf-parse']
    },
    {
      title: 'AI Providers',
      color: 'amber',
      chips: ['✨ Google Gemini', '🤖 OpenAI GPT', '⚡ Groq (Llama / Mixtral)', '🔄 Multi-Provider Fallback', '📊 Skill Extraction Pipeline']
    },
    {
      title: 'Infrastructure',
      color: 'rose',
      chips: ['☁️ Vercel Deploy', '🌿 MongoDB Atlas', '🔒 Role-based JWT', '🔄 REST API', '🌙 Dark Mode (Tailwind v4)']
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="tech-stack">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> Tech Stack
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Built on a Serious Modern Stack
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stack.map((group, i) => (
          <motion.div key={i} variants={item} whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 group">
            <h3 className={`text-2xl font-black mb-6 flex items-center gap-3`} style={{ fontFamily: "'Syne', sans-serif" }}>
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.chips.map((chip, j) => (
                <span key={j} className={`px-3 py-1.5 rounded-lg border border-${group.color}-500/20 bg-white/5 text-${group.color}-400 text-sm font-medium`}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden relative">
        <div className="flex flex-col">
          {[
            { title: 'JWT Authentication', desc: 'Google OAuth2 + token-based session management with Passport.js' },
            { title: 'Multi-AI Orchestration', desc: 'Gemini primary → GPT fallback → Groq fallback for 100% uptime' },
            { title: 'Dark / Light Mode Architecture', desc: 'Full theme toggle via .dark class on <html> root, persisted in localStorage' }
          ].map((arch, i, arr) => (
            <div key={i} className={`flex items-start gap-6 p-6 md:p-8 ${i < arr.length - 1 ? 'border-b border-white/10' : ''}`}>
              <div className="mt-1 w-3 h-3 flex-shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div>
                <h4 className="text-xl font-bold mb-1 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{arch.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{arch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
