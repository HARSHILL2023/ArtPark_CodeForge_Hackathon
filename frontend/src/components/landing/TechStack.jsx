import React from 'react';
import { motion } from 'framer-motion';

export default function TechStack() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  const stack = [
    {
      title: 'Frontend Architecture',
      chips: ['React 19', 'Vite 6', 'Tailwind CSS v4', 'Framer Motion', 'React Flow', 'Lucide Icons', '@react-pdf/renderer']
    },
    {
      title: 'Backend & Data Services',
      chips: ['Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Passport.js', 'JWT Auth', 'pdf-parse']
    },
    {
      title: 'AI Pipeline & LLM Fallback',
      chips: ['Google Gemini', 'OpenAI GPT-4o', 'Groq (Llama-3.3)', 'Vector Cosine Matcher', 'Kahn Topological Engine']
    },
    {
      title: 'Infrastructure & Security',
      chips: ['Vercel Production', 'Demo Sandbox Isolation', 'Role-based Permissions', 'REST API', 'Graphite Theme System']
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6" id="tech-stack">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Engineering Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA]">
          Built on a Production-Grade Full-Stack Engine
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {stack.map((group, i) => (
          <motion.div
            key={i}
            variants={item}
            className="p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] space-y-3"
          >
            <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.chips.map((chip, j) => (
                <span key={j} className="px-2.5 py-1 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] text-[#1B1B19] dark:text-[#F2F0EA] text-xs font-mono">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-xl border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] overflow-hidden">
        <div className="flex flex-col divide-y divide-[#DCD9D1] dark:divide-[#292D33]">
          {[
            { title: 'Deterministic Fallback Pipeline', desc: 'Google Gemini primary → OpenAI secondary → Groq high-speed fallback ensuring 100% platform availability.' },
            { title: 'Explainable AI Decision Audit', desc: 'Every recommended milestone and pruned prerequisite exposes vector similarity scores and dependency logic.' },
            { title: 'Isolated Sandbox Access', desc: 'Judge Demo sandbox tokens operate with zero persistence leaks while regular sessions authenticate with JWT.' }
          ].map((arch, i) => (
            <div key={i} className="flex items-start gap-3.5 p-4 sm:p-5">
              <div className="mt-1 w-2 h-2 flex-shrink-0 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]"></div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-0.5">{arch.title}</h4>
                <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">{arch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
