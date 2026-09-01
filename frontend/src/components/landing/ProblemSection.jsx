import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-6" id="problem">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>The Industry Dilemma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA] mb-2.5">
          Traditional Career Preparation Leaves Critical Gaps
        </h2>
        <p className="text-xs sm:text-sm text-[#5E5C56] dark:text-[#B4B1A9] max-w-lg mx-auto">
          Static resumes and generic course lists fail to capture exact prerequisite dependencies or quantify candidate readiness.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {[
          { v: '70%', d: 'of new technical hires experience prerequisite blockers in their first 90 days.' },
          { v: '3×', d: 'longer time-to-hire when candidate skill gaps lack structured remedial roadmaps.' },
          { v: '$240B', d: 'lost annually across enterprise tech teams due to misaligned role competencies.' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={item}
            className="p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] text-left space-y-2.5"
          >
            <div className="text-3xl sm:text-4xl font-bold text-[#B88916] dark:text-[#D4A72C] font-mono">
              {stat.v}
            </div>
            <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
              {stat.d}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
